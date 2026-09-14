import assert from 'node:assert/strict'
import test from 'node:test'
import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

test('embeds the knowledge project at the canonical Pages base path', async () => {
  await access(resolve(root, 'knowledge/package.json'))
  const config = await readFile(resolve(root, 'knowledge/site/.vitepress/config.mts'), 'utf8')
  assert.match(config, /const base = '\/daoson_website\/knowledge\/'/)
})

test('defines one combined static-site build that publishes the knowledge artifact', async () => {
  const script = await readFile(resolve(root, 'scripts/build-unified-site.ps1'), 'utf8')
  assert.match(script, /npm run docs:build/)
  assert.match(script, /bundle exec jekyll build/)
  assert.match(script, /Join-Path \$site 'knowledge'/)
})
