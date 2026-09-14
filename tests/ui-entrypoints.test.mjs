import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
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

test('keeps the evidence-first hero visually anchored and route-safe', async () => {
  const [home, styles] = await Promise.all([
    readFile(resolve('index.html'), 'utf8'),
    readFile(resolve('assets/css/portfolio-refresh.css'), 'utf8')
  ])

  await access(resolve('assets/img/research-terrain.png'))
  assert.match(home, /class="home-hero__visual"/)
  assert.match(home, /'\/projects\/' \| relative_url/)
  assert.match(home, /'\/knowledge\/' \| relative_url/)
  assert.match(home, /招聘与技术合作/)
  assert.match(home, /AI 学习与培训/)
  assert.match(home, /学术与机构合作/)
  assert.match(styles, /--accent: #155eef;/)
  assert.match(styles, /--bg: #f8f7f3;/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
})

test('uses the portfolio visual language in the knowledge hub', async () => {
  const [config, styles] = await Promise.all([
    readFile(resolve('knowledge/site/.vitepress/config.mts'), 'utf8'),
    readFile(resolve('knowledge/site/.vitepress/theme/custom.css'), 'utf8')
  ])

  assert.match(config, /appearance: false/)
  assert.match(styles, /--vp-c-brand-1: #155eef;/)
  assert.match(styles, /--vp-c-bg: #f8f7f3;/)
})
