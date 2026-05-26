# frozen_string_literal: true
#
# backlinks.rb
# -----------------------------------------------------------
# 扫描所有 notes 和 posts 的原始 Markdown 内容，
# 找出每篇通过 [[xxx]] 引用的目标，构建反向索引：
#
#   site.data.backlinks["esbuild"] = [
#     { "title" => "Vite 为什么这么快", "url" => "/notes/vite-is-fast/", "type" => "note", "context" => "..." },
#     { "title" => "现代前端构建",       "url" => "/posts/2026/05/20/...", "type" => "post", "context" => "..." }
#   ]
#
# 必须在 :site :post_read 阶段运行（早于 :pre_render），
# 这样后续 layout / includes 才能在渲染时通过 site.data.backlinks 拿到数据。

module Jekyll
  module Backlinks
    WIKILINK_RE = /\[\[([^\[\]\|]+?)(?:\|([^\[\]]+?))?\]\]/.freeze

    # 抽取一段引用前后的上下文（用于 backlinks 卡片显示）
    CONTEXT_BEFORE = 30
    CONTEXT_AFTER  = 40

    class << self
      def build(site)
        backlinks = Hash.new { |h, k| h[k] = [] }

        # 收集所有可能被引用的目标的 slug → 元数据
        # （和 wikilinks.rb 重复一次，但 backlinks 要在更早阶段跑，没法复用 wikilink_index）
        source_docs = []
        source_docs.concat(site.collections["notes"]&.docs || [])
        source_docs.concat(site.posts.docs)

        # 给每个源文档遍历 [[]]，反向插入
        source_docs.each do |src|
          src_meta = doc_meta(src)
          # 跳过没有正文的（不应该）
          next unless src.content

          src.content.to_s.scan(WIKILINK_RE) do |match|
            target  = match[0].strip
            # display = match[1]  # backlinks 里我们用源文档的标题，不是 display
            key = target.downcase

            # 从原文里抓一段上下文（可选）
            context = extract_context(src.content, target)

            backlinks[key] << src_meta.merge("context" => context)
          end
        end

        # 去重 + 按时间倒序
        backlinks.each do |k, list|
          list.uniq! { |x| x["url"] }
          list.sort_by! { |x| x["date"] || "" }
          list.reverse!
        end

        site.data["backlinks"] = backlinks
        # 也对外暴露一个总数，方便调试
        site.data["backlinks_total"] = backlinks.values.map(&:size).sum
      end

      private

      def doc_meta(doc)
        type =
          if doc.respond_to?(:collection) && doc.collection&.label == "notes"
            "note"
          else
            "post"
          end
        {
          "title" => doc.data["title"] || File.basename(doc.relative_path, ".*"),
          "url"   => doc.url,
          "type"  => type,
          "date"  => (doc.data["updated"] || doc.data["date"] || "").to_s
        }
      end

      def extract_context(content, target)
        idx = content.index("[[#{target}")
        return nil unless idx
        from = [idx - CONTEXT_BEFORE, 0].max
        to   = [idx + target.length + CONTEXT_AFTER + 4, content.length].min
        snippet = content[from...to].to_s
        # 清掉 markdown / wikilink 标记
        snippet = snippet.gsub(/\[\[([^\]\|]+)(\|([^\]]+))?\]\]/) { ($3 || $1) }
        snippet = snippet.gsub(/[\r\n]+/, " ").strip
        # 截断标记
        snippet = "…#{snippet}" if from > 0
        snippet = "#{snippet}…" if to < content.length
        snippet
      end
    end
  end
end

# 在 site 读完所有文档后立刻构建 backlinks（早于任何 render）
Jekyll::Hooks.register :site, :post_read do |site|
  Jekyll::Backlinks.build(site)
end
