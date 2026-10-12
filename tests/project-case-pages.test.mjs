import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const siteOutput = resolve(process.env.SITE_OUTPUT_DIR || '_site')
const ruby = process.env.SITE_QA_RUBY || 'ruby'
const yamlToJson = "require 'yaml'; require 'json'; require 'date'; puts JSON.generate(YAML.safe_load_file(ARGV[0], permitted_classes:[Date,Time], aliases:true))"
const projects = JSON.parse(execFileSync(ruby, ['-e',yamlToJson,'_data/projects.yml'], {encoding:'utf8'}))
const details = JSON.parse(execFileSync(ruby, ['-e',yamlToJson,'_data/case_details.yml'], {encoding:'utf8'}))
const showcase = JSON.parse(await readFile('_data/case_showcase.json','utf8'))
const cases = projects.filter(project => project.case_url && showcase[project.id])

test('the eight case studies open HTML first and expose their QR and experiment boundary',async () => {
  assert.equal(cases.length, 8)
  for (const project of cases) {
    const slug = project.case_url.split('/').filter(Boolean).join('/')
    const html = await readFile(join(siteOutput,slug,'index.html'),'utf8')
    assert.match(html,/class="post case-paper"/)
    assert.ok(html.indexOf('class="case-paper-metric-grid"') < html.indexOf('id="case-deep-dive"'),project.id+' must show metrics before long-form')
    assert.match(html,/class="case-share-content"/)
    const area = html.slice(html.indexOf('class="case-share-content"'),html.indexOf('class="case-share-details"'))
    assert.match(area,/data-case-share-qr/,project.id+' QR should be visible')
    assert.match(area,/data-case-share-download/,project.id+' download should be visible')
    assert.match(html,/data-case-share-copy/)
    assert.ok(html.includes('assets/qr/projects/'+project.id+'-zh.png'),project.id+' QR path')
    for (const anchor of ['case-snapshot','case-architecture','case-challenges','case-validation','case-deep-dive']) {
      assert.ok(html.includes('id="'+anchor+'"'),project.id+': missing '+anchor)
      assert.ok(html.includes('href="#'+anchor+'"'),project.id+': missing jump '+anchor)
    }
    assert.ok(details[project.id]?.evidence_url,project.id+' lacks an evidence source')
    for (const lang of ['zh','en']) await access(join(siteOutput,'assets/qr/projects',project.id+'-'+lang+'.png'))
    const data=showcase[project.id]
    assert.equal(data.steps.length,5)
    assert.equal(data.highlights.length,3)
    assert.equal(data.metrics.length,3)
    for (const metric of data.metrics) {
      for (const field of ['value_zh','value_en','label_zh','label_en','note_zh','note_en']) {
        assert.ok(metric[field],project.id+' lacks '+field)
      }
    }
  }
})

test('the project catalog identifies hosted case studies separately from GitHub-only links',async () => {
  const html = await readFile(join(siteOutput,'projects/index.html'),'utf8')
  assert.ok(html.includes('站内完整案例'))
  assert.ok(html.includes('GitHub 仓库'))
  for (const project of projects.filter(p=>p.featured&&p.case_url)) {
    assert.ok(html.includes('href="/daoson_website'+project.case_url+'"'),project.id+' must link to its hosted case')
  }
})
