$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Run-Step {
  param(
    [Parameter(Mandatory = $true)]
    [string] $Label,
    [Parameter(Mandatory = $true)]
    [scriptblock] $Command
  )

  Write-Host ""
  Write-Host "==> $Label" -ForegroundColor Cyan
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Label failed with exit code $LASTEXITCODE."
  }
}

Run-Step "JavaScript syntax" {
  node --check assets/js/main.js
}

Run-Step "Content schema" {
  ruby scripts/check_content_schema.rb
}

Run-Step "Jekyll build" {
  bundle exec jekyll build
}

Run-Step "Git whitespace check" {
  git diff --check
}

Run-Step "Git status" {
  git status --short
}

Write-Host ""
Write-Host "All checks passed." -ForegroundColor Green
