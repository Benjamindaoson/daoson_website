source "https://rubygems.org"

# 直接用 Jekyll（不用 github-pages gem，因为它不允许自定义 plugin）
# 站点通过 GitHub Actions 构建，详见 .github/workflows/deploy.yml
gem "jekyll", "~> 4.3"

# 站点用到的 Jekyll 官方插件
group :jekyll_plugins do
  gem "jekyll-feed",     "~> 0.17"
  gem "jekyll-seo-tag",  "~> 2.8"
  gem "jekyll-sitemap",  "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
end

# Markdown 引擎（kramdown 已是 jekyll 的依赖，这里固定 GFM 解析器版本）
gem "kramdown-parser-gfm", "~> 1.1"

# Windows / JRuby 兼容
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 2.0"
  gem "tzinfo-data"
end

# wdm 仅用于 Windows 下的文件监听优化，Jekyll build 不需要。
# 新版 Ruby 上 wdm 0.1.1 native extensions 容易安装失败，先禁用以保证构建可复现。
# gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# 本地构建性能（可选）
gem "webrick", "~> 1.8"
