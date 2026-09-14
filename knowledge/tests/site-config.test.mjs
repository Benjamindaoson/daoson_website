import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

test('site configuration defines the project Pages path and documentation UI', async () => {
  const config = await readFile(resolve('site/.vitepress/config.mts'), 'utf8')

  assert.match(config, /const base = '\/daoson_website\/knowledge\//)
  assert.match(config, /const mainSiteUrl = 'https:\/\/benjamindaoson\.github\.io\/daoson_website\//)
  assert.match(config, /provider:\s*'local'/)
  assert.match(config, /level:\s*\[2, 3\]/)
  assert.match(config, /text:\s*'学习索引'/)
  assert.match(config, /text:\s*'OpenClaw'/)
  assert.match(config, /const sidebar = buildSidebar\(notes\)/)
  assert.match(config, /\n\s*sidebar,\r?\n/)
  assert.match(config, /text:\s*'个人主页'/)
  assert.match(config, /link: `\$\{mainSiteUrl\}about\/`/)
  assert.match(config, /link: `\$\{mainSiteUrl\}projects\/`/)
})

test('every top-level note category link has a generated category route', async () => {
  for (const category of ['python', 'langchain', 'langgraph', 'openclaw', 'ai-coding']) {
    await access(resolve('site', category, 'index.md'))
  }
})
