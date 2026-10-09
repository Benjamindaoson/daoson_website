#!/usr/bin/env node
/**
 * Export both public résumés from an already-built Jekyll site.
 *
 * Run after the production Jekyll and Pagefind build:
 *   node scripts/export_resume_pdf.mjs --browser-module /path/to/browser.mjs
 *
 * The optional module exports launchBrowser(options), or Playwright's chromium.
 * RESUME_BROWSER_MODULE is the equivalent environment setting; the default is
 * an installed `playwright` package. RESUME_CHROMIUM_EXECUTABLE_PATH can select
 * an existing browser binary. This script never downloads a browser or builds
 * the site. Relevant content, configuration, CSS, and JS changes require a new
 * build and export so the manifest continues to match the public HTML sources.
 */

import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parseArgs } from 'node:util'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { values } = parseArgs({ options: {
  'site-dir': { type: 'string', default: '_site' },
  'browser-module': { type: 'string' },
  help: { type: 'boolean', short: 'h' }
} })

if (values.help) {
  console.log('Usage: node scripts/export_resume_pdf.mjs [--site-dir _site] [--browser-module MODULE]\nOutputs: assets/resume/benjamin-taoson-resume-{zh,en}.pdf and manifest.json.\nRun again after changing any file listed in the manifest sources.')
  process.exit(0)
}

const sourcePaths = [
  'resume.html',
  '_data/profile.yml',
  '_data/projects.yml',
  '_includes/profile-career.html',
  '_includes/profile-education.html',
  '_config.yml',
  '_layouts/default.html',
  '_includes/head.html',
  '_includes/portfolio-header.html',
  '_includes/portfolio-footer.html',
  '_includes/language-switch.html',
  'assets/css/style.css',
  'assets/css/portfolio-refresh.css',
  'assets/css/taoson-portfolio.css',
  'assets/js/main.js',
  'scripts/export_resume_pdf.mjs'
].sort()

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')
async function readSources() {
  const sources = []
  for (const relativePath of sourcePaths) {
    sources.push({ path: relativePath, sha256: sha256(await fs.readFile(path.join(projectRoot, relativePath))) })
  }
  // The path, NUL, content hash, and LF make the aggregate unambiguous and
  // reproducible in the independent manifest checker without rendering Jekyll.
  return { sources, digest: sha256(sources.map(source => `${source.path}\0${source.sha256}\n`).join('')) }
}

const builtSite = path.resolve(projectRoot, values['site-dir'])
const builtResumePath = path.join(builtSite, 'resume/index.html')
const builtHtml = await fs.readFile(builtResumePath)
const canonicalTag = builtHtml.toString('utf8').match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0]
const canonicalHref = canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1]
assert.ok(canonicalHref, 'The built résumé needs a canonical URL. Run the production Jekyll build first.')
const publicUrl = new URL(canonicalHref.replaceAll('&amp;', '&'))
assert.equal(publicUrl.protocol, 'https:', 'PDF links must use the public HTTPS origin.')
assert.ok(!['localhost', '127.0.0.1', '[::1]'].includes(publicUrl.hostname), 'A local preview URL cannot be exported.')
const publicBase = new URL('../', publicUrl)
const before = await readSources()
const builtTime = (await fs.stat(builtResumePath)).mtimeMs
for (const sourcePath of sourcePaths) {
  const modified = (await fs.stat(path.join(projectRoot, sourcePath))).mtimeMs
  assert.ok(modified <= builtTime + 1000, `The build predates ${sourcePath}; rebuild before exporting.`)
}

let moduleName = values['browser-module'] || process.env.RESUME_BROWSER_MODULE || 'playwright'
if (path.isAbsolute(moduleName) || moduleName.startsWith('.')) moduleName = pathToFileURL(path.resolve(moduleName)).href
const browserModule = await import(moduleName)
const browserOptions = { headless: true }
if (process.env.RESUME_CHROMIUM_EXECUTABLE_PATH) browserOptions.executablePath = process.env.RESUME_CHROMIUM_EXECUTABLE_PATH
const launch = browserModule.launchBrowser
  ? () => browserModule.launchBrowser(browserOptions)
  : () => (browserModule.chromium || browserModule.default?.chromium).launch(browserOptions)

const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'taoson-public-resume-'))
const outputDirectory = path.join(projectRoot, 'assets/resume')
const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff' }
const failedAssets = []
const pageErrors = []
const pdfs = []
let browser

try {
  browser = await launch()
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'reduce' })
  // Serve the built files under the real canonical origin. Chromium therefore
  // writes real public URLs into PDF link annotations, never localhost URLs.
  await context.route('**/*', async route => {
    const requested = new URL(route.request().url())
    if (requested.origin !== publicBase.origin || !requested.pathname.startsWith(publicBase.pathname)) {
      await route.abort()
      return
    }
    try {
      let file = path.resolve(builtSite, decodeURIComponent(requested.pathname.slice(publicBase.pathname.length)))
      assert.ok(file === builtSite || file.startsWith(builtSite + path.sep), 'Invalid built asset path')
      if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html')
      await route.fulfill({ status: 200, contentType: contentTypes[path.extname(file)] || 'application/octet-stream', body: await fs.readFile(file) })
    } catch {
      failedAssets.push(requested.pathname)
      await route.fulfill({ status: 404, body: 'Built asset not found' })
    }
  })
  const page = await context.newPage()
  page.on('pageerror', error => pageErrors.push(error.message))
  await page.goto(publicUrl.href, { waitUntil: 'networkidle' })
  assert.equal(await page.locator('.resume-page').count(), 1, 'The build does not contain the public résumé.')
  await page.evaluate(() => document.fonts.ready)

  for (const language of ['zh', 'en']) {
    await page.emulateMedia({ media: 'screen' })
    await page.locator(`button[data-lang="${language}"]`).click()
    await page.waitForFunction(language => document.documentElement.dataset.uiLang === language, language)
    await page.evaluate(language => {
      document.title = language === 'zh' ? 'Benjamin Taoson · 赖建铭 · 公开简历' : 'Benjamin Taoson · Public résumé'
    }, language)
    await page.emulateMedia({ media: 'print' })
    await page.waitForFunction(() => getComputedStyle(document.documentElement).backgroundColor === 'rgb(255, 255, 255)' && getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)')
    const filename = `benjamin-taoson-resume-${language}.pdf`
    await page.pdf({ path: path.join(temporary, filename), format: 'A4', preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, tagged: true })
    pdfs.push({ language, path: `assets/resume/${filename}`, sha256: sha256(await fs.readFile(path.join(temporary, filename))) })
  }

  assert.deepEqual(failedAssets, [], 'Required built assets were unavailable.')
  assert.deepEqual(pageErrors, [], 'The résumé page raised a browser error.')
  assert.equal((await readSources()).digest, before.digest, 'Sources changed during export; rebuild and retry.')
  const manifest = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    public_url: publicUrl.href,
    paper: 'A4',
    browser: await browser.version(),
    source_sha256: before.digest,
    sources: before.sources,
    built_html_sha256: sha256(builtHtml),
    pdfs
  }
  await fs.mkdir(outputDirectory, { recursive: true })
  for (const pdf of pdfs) await fs.copyFile(path.join(temporary, path.basename(pdf.path)), path.join(projectRoot, pdf.path))
  await fs.writeFile(path.join(outputDirectory, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
  console.log(JSON.stringify({ source_sha256: manifest.source_sha256, pdfs, manifest: 'assets/resume/manifest.json' }, null, 2))
} finally {
  if (browser) await browser.close()
  await fs.rm(temporary, { recursive: true, force: true })
}
