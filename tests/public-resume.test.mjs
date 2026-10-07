import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, process.env.SITE_OUTPUT_DIR || '_site')
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')

// The PDFs are deliberately exported from the sanitized web résumé. A stale
// downloadable copy is a real publishing failure, even if Jekyll still builds.
test('public résumé downloads match the current content and rendering sources', async () => {
  const manifest = JSON.parse(await readFile(join(root, 'assets/resume/manifest.json'), 'utf8'))
  assert.equal(manifest.schema_version, 1)
  assert.ok(manifest.sources.length > 0)
  const sources = [...manifest.sources]
  assert.equal(new Set(sources.map(source => source.path)).size, sources.length)
  for (const source of sources) {
    assert.equal(sha256(await readFile(join(root, source.path))), source.sha256,
      `${source.path} changed after PDF export. Rebuild and run scripts/export_resume_pdf.mjs.`)
  }
  // Match the exporter's code-point path ordering; locale ordering varies by OS.
  sources.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0)
  assert.equal(sha256(sources.map(source => `${source.path}\0${source.sha256}\n`).join('')), manifest.source_sha256)
  const publicUrl = new URL(manifest.public_url)
  assert.equal(publicUrl.protocol, 'https:')
  assert.ok(!['localhost', '127.0.0.1', '[::1]'].includes(publicUrl.hostname))
  assert.deepEqual(manifest.pdfs.map(pdf => pdf.language).sort(), ['en', 'zh'])

  const html = await readFile(join(output, 'resume/index.html'), 'utf8')
  for (const pdf of manifest.pdfs) {
    const bytes = await readFile(join(root, pdf.path))
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', `${pdf.path} is not a PDF`)
    assert.equal(sha256(bytes), pdf.sha256, `${pdf.path} differs from its export record`)
    assert.equal(sha256(await readFile(join(output, pdf.path))), pdf.sha256,
      `${pdf.path} did not reach the publishing artifact`)
    assert.ok(html.includes(`${publicUrl.pathname.replace(/resume\/$/, '')}${pdf.path}`),
      `The public page must link to the ${pdf.language} download`)
  }
})
