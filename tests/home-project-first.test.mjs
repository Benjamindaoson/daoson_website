import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('the home page places featured projects first, without an oversized identity hero', async () => {
  const content = await readFile('index.html', 'utf8')
  const container = content.indexOf('<div class="taoson-home">')
  assert.ok(container >= 0)
  const firstSection = content.slice(container).match(/<section class="([^"]+)"/)
  assert.ok(firstSection && firstSection[1].includes('home-work-first'))
  assert.match(content, /<h1 id="selected-work-heading">/)
  assert.match(content, /include selected-work\.html/)
  assert.ok(!content.includes('identity-hero'))
  assert.ok(!content.includes('direction-guide'))
  assert.ok(!content.includes('home-background-hero'))
  assert.ok(content.includes("'/projects/#physical-ai'"))
})
