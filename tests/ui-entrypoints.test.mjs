import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { access, readFile, stat } from 'node:fs/promises'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

// These checks use the real Jekyll output. Run them after the production build
// and Pagefind indexing, as the deployment workflow does.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, process.env.SITE_OUTPUT_DIR || '_site')
const yamlToJson = "require 'yaml'; require 'json'; require 'date'; puts JSON.generate(YAML.safe_load_file(ARGV[0], permitted_classes: [Date, Time], aliases: true))"
const readYaml = path => JSON.parse(execFileSync(process.env.SITE_QA_RUBY || 'ruby', [
  '-e', yamlToJson, join(root, path)
], { encoding: 'utf8' }))

const config = readYaml('_config.yml')
const projects = readYaml('_data/projects.yml')
const featured = projects.filter(project => project.featured === true)
  .sort((a, b) => a.featured_order - b.featured_order)
const homeFeatured = projects.filter(project => project.home_featured === true)
  .sort((a, b) => a.home_order - b.home_order)
const base = String(config.baseurl || '').replace(/\/$/, '')
const origin = new URL(config.url).origin
const notesUrl = new URL(config.notes_url)
const publicPages = ['index.html', 'projects/index.html', 'about/index.html', 'contact/index.html', 'resume/index.html']
const pageUrl = page => new URL(`${base}/${page.replace(/index\.html$/, '')}`, origin)
const built = page => readFile(join(output, page), 'utf8')

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi'))].map(match =>
    Object.fromEntries([...match[1].matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)]
      .map(([, key, , value]) => [key.toLowerCase(), value.replaceAll('&amp;', '&')])))
}

function localTarget(href, currentPage) {
  const url = new URL(href, pageUrl(currentPage))
  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) return null
  // The notes site is a separate project on the same GitHub Pages origin.
  if (url.origin === notesUrl.origin && url.pathname.startsWith(notesUrl.pathname)) return null
  assert.ok(!base || url.pathname === base || url.pathname.startsWith(`${base}/`),
    `${currentPage}: ${href} bypasses the configured Pages baseurl`)
  let path = decodeURIComponent(url.pathname.slice(base.length)).replace(/^\/+/, '')
  if (!path || path.endsWith('/')) path += 'index.html'
  return { path, hash: decodeURIComponent(url.hash.slice(1)) }
}

async function featuredPages() {
  const cards = tags(await built('projects/index.html'), 'a').filter(tag => tag['data-project-id'])
  return cards.map(card => {
    assert.ok(card.href, `Featured project ${card['data-project-id']} needs a case-study link`)
    const target = localTarget(card.href, 'index.html')
    assert.ok(target, `Featured project ${card['data-project-id']} must open a local case study`)
    return target.path
  })
}

test('home selections and the project index link to real case studies across both AI directions', async () => {
  assert.equal(homeFeatured.length, 3, 'The home page should keep a concise selection of three case studies')
  assert.deepEqual(new Set(homeFeatured.map(project => project.domain)), new Set(['digital', 'physical']),
    'The home selection should represent both Digital AI and Physical AI')
  const ids = featured.map(project => project.id)
  assert.ok(ids.every(id => typeof id === 'string' && id.length > 0), 'Featured projects need stable IDs')
  assert.equal(new Set(ids).size, ids.length, 'Featured project IDs must be unique')

  const include = await readFile(join(root, '_includes/selected-work.html'), 'utf8')
  assert.match(include, /site\.data\.projects/, 'The home selection must use the project data source')
  for (const page of ['index.html', 'projects/index.html']) {
    const html = await built(page)
    const cards = tags(html, 'a').filter(tag => tag['data-project-id'])
    const expected = page === 'index.html' ? homeFeatured.map(project => project.id) : ids
    assert.deepEqual(cards.map(card => card['data-project-id']), expected, `${page}: case studies drifted from project data`)
    for (const card of cards) assert.ok(localTarget(card.href, page), `${page}: the card must open its case study`)
  }
  for (const path of await featuredPages()) await access(join(output, path))
})

test('public navigation reaches projects, about, contact, and the independent notes site', async () => {
  assert.equal(notesUrl.href, 'https://benjamindaoson.github.io/gitpagewebnote/')
  for (const page of publicPages) {
    const links = tags(await built(page), 'a').map(tag => tag.href).filter(Boolean)
    for (const target of [`${base}/projects/`, `${base}/about/`, `${base}/contact/`, notesUrl.href]) {
      assert.ok(links.includes(target), `${page}: missing navigation to ${target}`)
    }
    assert.ok(!links.includes(`${base}/resume/`), `${page}: the retired résumé must not remain a navigation entry`)
    assert.ok(!links.includes(`${base}/knowledge/`), `${page}: primary navigation must use the independent notes site`)
  }
  const contactLinks = tags(await built('contact/index.html'), 'a')
  assert.ok(contactLinks.some(tag => tag.href?.split('?')[0] === `mailto:${config.email}`),
    'The contact page must provide the configured email address')
})

test('bilingual portfolio pages expose both language controls and translated content', async () => {
  for (const page of [...publicPages, ...await featuredPages()]) {
    const html = await built(page)
    assert.equal(tags(html, 'html')[0]?.['data-bilingual'], 'true', `${page}: bilingual page metadata is missing`)
    const controls = tags(html, 'button').filter(tag => tag['data-lang'])
    for (const lang of ['zh', 'en']) {
      const button = controls.find(tag => tag['data-lang'] === lang)
      assert.ok(button, `${page}: missing ${lang} language control`)
      assert.ok(['true', 'false'].includes(button['aria-pressed']), `${page}: language control must expose its state`)
      assert.match(html, new RegExp(`class=["'][^"']*\\bi18n-${lang}\\b`), `${page}: missing ${lang} content`)
    }
    const selected = new Set(controls.filter(tag => tag['aria-pressed'] === 'true').map(tag => tag['data-lang']))
    assert.deepEqual([...selected], [tags(html, 'html')[0]['data-ui-lang'] || config.default_language],
      `${page}: language controls must agree with the initial UI language`)
  }
})

test('rendered portfolio links, anchors, and assets resolve under the Pages baseurl', async () => {
  for (const page of [...publicPages, ...await featuredPages()]) {
    const html = await built(page)
    for (const tag of tags(html, '(?:a|link|script|img)')) {
      const href = tag.href || tag.src
      if (!href) continue
      assert.notEqual(href.trim(), '#', `${page}: remove placeholder links`)
      const target = localTarget(href, page)
      if (!target) continue
      let file = join(output, target.path)
      let info
      try { info = await stat(file) } catch { assert.fail(`${page}: ${href} does not exist in the build`) }
      if (info.isDirectory()) {
        file = join(file, 'index.html')
        await access(file)
      }
      if (target.hash && extname(file) === '.html') {
        const targetHtml = await readFile(file, 'utf8')
        const ids = tags(targetHtml, '[a-z][\\w:-]*').map(tag => tag.id).filter(Boolean)
        assert.ok(ids.includes(target.hash), `${page}: ${href} points to a missing section`)
      }
    }
  }
})

test('published search includes the Pagefind runtime and UI assets', async () => {
  for (const path of ['pagefind/pagefind.js', 'pagefind/pagefind-ui.js', 'pagefind/pagefind-ui.css']) {
    await access(join(output, path))
  }
})
