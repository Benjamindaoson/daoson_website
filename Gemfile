source "https://rubygems.org"

# 使用 GitHub Pages 官方 gem（自动锁定与 GitHub Pages 同步的版本）
gem "github-pages", group: :jekyll_plugins

# 已经包含在 github-pages 里的常用插件
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
end

# Windows / JRuby 兼容
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
