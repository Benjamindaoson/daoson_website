import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { access, readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, process.env.SITE_OUTPUT_DIR || '_site')
const config = JSON.parse(execFileSync(process.env.SITE_QA_RUBY || 'ruby', [
  '-e', "require 'yaml'; require 'json'; puts JSON.generate(YAML.safe_load_file(ARGV[0], aliases: true))",
  join(root, '_config.yml')
], { encoding: 'utf8' }))

test('the old knowledge entry keeps a working bridge to the independent notes site', async () => {
  const html = await readFile(join(output, 'knowledge/index.html'), 'utf8')
  const links = [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi)].map(match => match[2])
  assert.ok(links.includes(config.notes_url), 'Legacy visitors need a usable link even without JavaScript')
  assert.match(html, /http-equiv\s*=\s*["']refresh["']|location\.(?:replace|assign)\s*\(|location(?:\.href)?\s*=/i,
    'The old knowledge landing page should redirect visitors to the independent site')
})

test('the publishing artifact excludes knowledge tooling and nonpublic source files', async () => {
  await access(join(output, 'index.html'))
  const excludedPaths = [
    'AGENTS.md', 'CONTENT_SCHEMA.md', 'README.md', 'Gemfile', 'Gemfile.lock', 'pagefind.yml',
    'docs', 'scripts', 'tests', 'openspec', 'node_modules', 'vendor',
    '_drafts', '_daily', '.git', '.bundle', '.jekyll-cache',
    'knowledge/package.json', 'knowledge/package-lock.json', 'knowledge/README.md',
    'knowledge/admin', 'knowledge/scripts', 'knowledge/tests', 'knowledge/templates',
    'knowledge/note', 'knowledge/site'
  ]
  for (const path of excludedPaths) {
    await assert.rejects(access(join(output, path)), { code: 'ENOENT' }, `${path} must not be published`)
  }
})

test('feeds and sitemap do not advertise source code or private content paths', async () => {
  const forbidden = /\/(?:docs|scripts|tests|openspec|_drafts|_daily)\/|\/knowledge\/(?:admin|scripts|tests|templates|note|site)\//i
  const origin = new URL(config.url).origin
  const base = String(config.baseurl || '').replace(/\/$/, '')
  for (const path of ['sitemap.xml', 'feed.xml', 'feed-zh.xml', 'feed-en.xml']) {
    const xml = await readFile(join(output, path), 'utf8')
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>|\bhref=["']([^"']*)["']/gs)]
      .map(match => match[1] || match[2])
    for (const url of urls) {
      const target = new URL(url.replaceAll('&amp;', '&'), `${origin}${base}/`)
      if (target.origin !== origin || !target.pathname.startsWith(`${base}/`)) continue
      assert.doesNotMatch(target.pathname.slice(base.length), forbidden, `${path}: nonpublic path ${url}`)
    }
  }
})
