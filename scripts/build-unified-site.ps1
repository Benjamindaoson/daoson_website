param(
  [string]$BaseUrl = '/daoson_website/'
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$knowledge = Join-Path $root 'knowledge'
$knowledgeDist = Join-Path $knowledge 'site/.vitepress/dist'
$site = Join-Path $root '_site'

Push-Location $knowledge
npm run docs:build
Pop-Location

Push-Location $root
bundle exec jekyll build --baseurl $BaseUrl --destination _site
Pop-Location

$knowledgeTarget = Join-Path $site 'knowledge'
New-Item -ItemType Directory -Force -Path $knowledgeTarget | Out-Null
Copy-Item -Path (Join-Path $knowledgeDist '*') -Destination $knowledgeTarget -Recurse -Force

if (-not (Test-Path (Join-Path $site 'index.html')) -or -not (Test-Path (Join-Path $knowledgeTarget 'index.html'))) {
  throw 'Combined site build did not produce both main and knowledge indexes.'
}
