import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

test('uses one canonical knowledge-hub entry point', async () => {
  const [sidebar, home] = await Promise.all([
    readFile(resolve('_includes/sidebar.html'), 'utf8'),
    readFile(resolve('index.html'), 'utf8')
  ])

  assert.equal((sidebar.match(/data-nav="knowledge"/g) || []).length, 1)
  assert.ok(sidebar.includes("'/knowledge/' | relative_url"))
  assert.ok(home.includes("'/knowledge/' | relative_url"))
  assert.ok(!sidebar.includes('gitpagewebnote'))
  assert.ok(!home.includes('gitpagewebnote'))
})

test('keeps mobile main content padded beside the navigation toggle', async () => {
  const styles = await readFile(resolve('assets/css/style.css'), 'utf8')
  assert.match(styles, /body\.has-sidebar \.site-main \{\s*padding: 4rem var\(--page-gutter\) 1\.25rem;/)
})
