# frozen_string_literal: true
#
# wikilinks.rb
# -----------------------------------------------------------
# 把 [[note-slug]] 和 [[note-slug|显示文本]] 转换成 Markdown 链接
# 在 kramdown 解析前运行（Jekyll :pre_render hook），
# 这样 Markdown 渲染器看到的就是普通 [text](url) 链接，
# 后续 TOC、kramdown 各种 inline 处理都能正常工作。
#
# 解析规则：
#   [[esbuild]]               → 找名为 esbuild 的笔记，链接显示为 "esbuild"
#   [[esbuild|更快的打包器]]   → 链接显示为 "更快的打包器"
#   [[2026-05-26-mac-workflow]] → 链接到 _posts，对 post slug 也支持
#
# 找不到目标 → 渲染成红色 broken 链接（CSS 类 .wikilink.broken）

module Jekyll
  module Wikilinks
    WIKILINK_RE = /\[\[([^\[\]\|]+?)(?:\|([^\[\]]+?))?\]\]/.freeze

    class << self
      # 在站点 :pre_render 时构建一次 slug → page 的索引，
      # 让所有页面共享
      def build_index(site)
        index = {}

        # 索引 notes：用 basename without ext 作为 slug
        site.collections["notes"]&.docs&.each do |doc|
          slug = File.basename(doc.relative_path, ".*").downcase
          index[slug] = {
            url:   doc.url,
            title: doc.data["title"] || slug,
            type:  "note"
          }
          # 标题本身也允许作为别名（"Vite 为什么这么快" 也能被命中）
          if doc.data["title"]
            t_key = doc.data["title"].downcase.strip
            index[t_key] ||= index[slug]
          end
        end

        # 索引 posts：去掉日期前缀作为 slug
        site.posts.docs.each do |doc|
          fname = File.basename(doc.relative_path, ".*")
          # 2026-05-20-vite-modern-frontend → vite-modern-frontend
          slug = fname.sub(/^\d{4}-\d{2}-\d{2}-/, "").downcase
          index[slug] = {
            url:   doc.url,
            title: doc.data["title"] || slug,
            type:  "post"
          }
          if doc.data["title"]
            t_key = doc.data["title"].downcase.strip
            index[t_key] ||= index[slug]
          end
        end

        site.data["wikilink_index"] = index
        index
      end

      # 替换正文中的 [[]] 语法
      def transform(content, index)
        content.gsub(WIKILINK_RE) do
          target  = Regexp.last_match(1).strip
          display = Regexp.last_match(2)&.strip

          key = target.downcase
          entry = index[key]

          if entry
            text = display || entry[:title]
            # 用 HTML 直接输出，绕过 Markdown（保证 wikilink CSS 类一定生效）
            %(<a href="#{entry[:url]}" class="wikilink wikilink-#{entry[:type]}" data-wikilink="#{target}">#{text}</a>)
          else
            text = display || target
            %(<a href="#" class="wikilink broken" title="还没有这篇笔记：#{target}">#{text}</a>)
          end
        end
      end
    end
  end
end

# ---- Hooks ----

# 在所有页面渲染前，先把索引构建一次
Jekyll::Hooks.register :site, :pre_render do |site|
  Jekyll::Wikilinks.build_index(site)
end

# 在每篇 note / post 转换前，替换 [[]] 为 HTML 链接
[:notes, :posts].each do |coll|
  Jekyll::Hooks.register coll, :pre_render do |doc|
    index = doc.site.data["wikilink_index"]
    next unless index
    doc.content = Jekyll::Wikilinks.transform(doc.content, index)
  end
end
