$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$pagefindVersion = "1.5.2"
$cacheDir = Join-Path $root ".tmp-npm-cache"

Write-Host "==> Jekyll build" -ForegroundColor Cyan
bundle exec jekyll build
if ($LASTEXITCODE -ne 0) {
  throw "Jekyll build failed with exit code $LASTEXITCODE."
}

Write-Host ""
Write-Host "==> Pagefind v$pagefindVersion" -ForegroundColor Cyan
npm exec --yes --cache $cacheDir --package "pagefind@$pagefindVersion" -- pagefind --site _site --output-subdir pagefind
if ($LASTEXITCODE -ne 0) {
  throw "Pagefind failed with exit code $LASTEXITCODE."
}

$requiredFiles = @(
  "_site/pagefind/pagefind-ui.js",
  "_site/pagefind/pagefind-ui.css"
)

foreach ($file in $requiredFiles) {
  if (-not (Test-Path $file)) {
    throw "Missing Pagefind output: $file"
  }
}

Write-Host ""
Write-Host "Pagefind index generated." -ForegroundColor Green
