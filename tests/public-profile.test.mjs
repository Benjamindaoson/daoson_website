import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gunzipSync } from 'node:zlib'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, process.env.SITE_OUTPUT_DIR || '_site')
const readYaml = path => JSON.parse(execFileSync(process.env.SITE_QA_RUBY || 'ruby', [
  '-e', "require 'yaml'; require 'json'; require 'date'; puts JSON.generate(YAML.safe_load_file(ARGV[0], permitted_classes: [Date, Time], aliases: true))",
  join(root, path)
], { encoding: 'utf8' }))
const config = readYaml('_config.yml')
const base = String(config.baseurl || '').replace(/\/$/, '')
const origin = new URL(config.url).origin
const retiredUrl = new URL(`${base}/resume/`, origin)

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi'))].map(match =>
    Object.fromEntries([...match[1].matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)]
      .map(([, key, , value]) => [key.toLowerCase(), value.replaceAll('&amp;', '&')])))
}

async function filesBelow(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await filesBelow(path))
    else if (entry.isFile()) files.push(path)
  }
  return files
}

const publishingFiles = filesBelow(output)
const textExtensions = new Set(['.html', '.xml', '.json', '.txt', '.webmanifest', '.svg', '.md'])

// This is a publishing boundary, not a claim that dates never belong on a site.
// Project versions, experiments, and article dates remain useful public evidence.
const employmentClaims = [
  /要务科技|智光电气|三一(?:集团|重工|全球)|\b(?:Yaowu|Zhiguang|SANY)\b/i,
  /工作经历|任职经历|\b(?:work|employment|career)\s+(?:history|experience|timeline)\b/i,
  /8\s*年(?:以上|多)|\b8\s*\+\s*years?\b|\b(?:over|more than)\s+eight\s+years?\b/i,
  /(?:2018[./]08\s*[–—-]\s*2020[./]12|2021[./]01\s*[–—-]\s*2022[./]12|2023[./]01\s*[–—-]\s*至今)/,
  /\b(?:Aug\s+2018\s*[–—-]\s*Dec\s+2020|Jan\s+2021\s*[–—-]\s*Dec\s+2022|Jan\s+2023\s*[–—-]\s*Present)\b/i,
  /"(?:worksFor|alumniOf|hasCredential)"\s*:/i
]

test('the public profile omits career records and retired résumé downloads', async () => {
  const profile = readYaml('_data/profile.yml')
  for (const field of ['experience', 'education', 'certifications']) {
    assert.ok(!Object.hasOwn(profile, field), `${field} must remain outside the public profile model`)
  }
  for (const path of [
    'assets/resume/benjamin-taoson-resume-zh.pdf',
    'assets/resume/benjamin-taoson-resume-en.pdf',
    'assets/resume/manifest.json',
    'scripts/export_resume_pdf.mjs'
  ]) {
    await assert.rejects(access(join(root, path)), { code: 'ENOENT' }, `${path} must not remain a publishing source`)
    await assert.rejects(access(join(output, path)), { code: 'ENOENT' }, `${path} must not remain in the publishing artifact`)
  }
  for (const path of await publishingFiles) {
    assert.doesNotMatch(relative(output, path), /(?:resume|curriculum-vitae|\bcv\b)[^/]*\.pdf$/i,
      'A renamed or stale public résumé PDF must not be published')
  }
})

test('published pages and metadata do not expose employment claims or résumé entrypoints', async () => {
  const files = (await publishingFiles).filter(path => textExtensions.has(extname(path)))
  assert.ok(files.some(path => relative(output, path) === 'index.html'), 'Run a production Jekyll build before testing')
  for (const path of files) {
    const name = relative(output, path)
    const text = await readFile(path, 'utf8')
    for (const claim of employmentClaims) assert.doesNotMatch(text, claim, `${name}: retired career content is still public`)
    assert.doesNotMatch(text, /\/assets\/resume\/|data-print-resume/i, `${name}: a public résumé download or print entrypoint remains`)
    if (extname(path) !== '.html') continue
    for (const link of tags(text, 'a')) {
      if (!link.href || link.href.startsWith('#')) continue
      const url = new URL(link.href, new URL(`${base}/${name}`, origin))
      assert.ok(url.origin !== retiredUrl.origin || url.pathname.replace(/index\.html$/, '') !== retiredUrl.pathname,
        `${name}: the retired résumé must not be advertised as a public entrypoint`)
    }
  }
})

test('the retired résumé address is usable but absent from public discovery', async () => {
  const html = await readFile(join(output, 'resume/index.html'), 'utf8')
  const robots = tags(html, 'meta').filter(tag => tag.name?.toLowerCase() === 'robots')
  assert.ok(robots.length > 0, 'The old résumé address needs an explicit robots policy')
  for (const tag of robots) {
    const directives = tag.content.toLowerCase().split(/[\s,]+/)
    assert.ok(directives.includes('noindex') && directives.includes('nofollow'),
      'The retired address must be marked noindex, nofollow')
  }
  assert.match(html, /\bdata-pagefind-ignore(?:\s|=|>)/, 'The migration page must opt out of site search')
  const links = tags(html, 'a').map(tag => tag.href)
  for (const target of [`${base}/projects/`, `${base}/contact/`]) {
    assert.ok(links.includes(target), `Legacy visitors need a working ${target} link without JavaScript`)
  }
  for (const path of ['sitemap.xml', 'feed.xml', 'feed-zh.xml', 'feed-en.xml']) {
    const xml = await readFile(join(output, path), 'utf8')
    assert.ok(!xml.includes(`${base}/resume/`), `${path}: the retired address must not be promoted`)
  }

  // Pagefind search results are stored in compressed fragments. Inspect those
  // real results so a stale index cannot quietly republish a removed page.
  const fragments = (await publishingFiles).filter(path => extname(path) === '.pf_fragment')
  assert.ok(fragments.length > 0, 'Run Pagefind indexing before testing the publishing boundary')
  let projectResults = 0
  for (const path of fragments) {
    const decoded = gunzipSync(await readFile(path)).toString('utf8').replace(/^pagefind_dcd/, '')
    const fragment = JSON.parse(decoded)
    const resultUrl = new URL(fragment.url, `${origin}${base}/`)
    const resultPath = (base && resultUrl.pathname.startsWith(`${base}/`)
      ? resultUrl.pathname.slice(base.length) : resultUrl.pathname).replace(/index\.html$/, '')
    assert.notEqual(resultPath, '/resume/',
      'Pagefind must not return the retired résumé address')
    for (const claim of employmentClaims) assert.doesNotMatch(decoded, claim, `${relative(output, path)}: stale career content remains searchable`)
    if (resultPath.startsWith('/projects/')) projectResults += 1
  }
  assert.ok(projectResults > 0, 'Project case studies must remain discoverable in the search index')
})
