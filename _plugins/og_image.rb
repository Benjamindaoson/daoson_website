# frozen_string_literal: true
#
# og_image.rb
# -----------------------------------------------------------
# 在构建时为每篇 post / note / TIL 生成一张 1200×630 的 SVG OG 卡片，
# 文件写到 _site/assets/og-cards/<slug>.svg，并把 page.image 设成这个路径，
# 这样 jekyll-seo-tag 会自动把它作为 <meta property="og:image"> 输出。
#
# 注意：SVG 在多数平台（Twitter / Telegram / Slack / Discord）OG 卡片支持，
# 但 Facebook / WeChat 等不支持。如需 PNG，build 之后再用 rsvg-convert 转换。
#
# 设计：暗色背景（GitHub Dark #0d1117） + 绿/蓝双色品牌条 + 标题文本（自动换行）
# + 类型徽章（POST / NOTE / TIL） + 站点名

module Jekyll
  class OgImageGenerator
    # OG 卡尺寸
    WIDTH  = 1200
    HEIGHT = 630
    # 标题换行的"权重阈值"：中文字符算 2，英文字符算 1
    # 大字号下大约能容纳 16-18 个中文字符 / 32-36 个英文字符
    LINE_WEIGHT_MAX = 32
    MAX_LINES = 4

    class << self
      def generate(site)
        out_dir = File.join(site.dest, "assets", "og-cards")
        FileUtils.mkdir_p(out_dir)

        docs = []
        docs.concat(site.posts.docs)
        docs.concat(site.collections["notes"]&.docs || [])
        docs.concat(site.collections["til"]&.docs   || [])

        docs.each do |doc|
          slug = File.basename(doc.relative_path, ".*")
          # 如果作者已经显式指定了 image / cover，就跳过自动生成
          next if doc.data["image"] && doc.data["image"] != ""

          type = type_for(doc)
          svg  = render_svg(
            title:      doc.data["title"] || slug,
            type:       type,
            site_title: site.config["title"] || "blog",
            date:       doc.data["date"] || doc.data["updated"],
            lang:       doc.data["lang"] || "zh"
          )

          path = File.join(out_dir, "#{slug}.svg")
          File.write(path, svg)

          # 让 jekyll-seo-tag 把它作为 og:image 输出
          url_path = "/assets/og-cards/#{slug}.svg"
          doc.data["image"] ||= url_path
        end
      end

      private

      def type_for(doc)
        return "NOTE" if doc.respond_to?(:collection) && doc.collection&.label == "notes"
        return "TIL"  if doc.respond_to?(:collection) && doc.collection&.label == "til"
        "POST"
      end

      # 简单的"加权"换行：中文字符权重 2，其它权重 1
      def wrap_title(title)
        lines = []
        current = ""
        current_weight = 0
        title.each_char do |ch|
          w = ch.bytesize > 1 ? 2 : 1
          if current_weight + w > LINE_WEIGHT_MAX
            lines << current
            current = ""
            current_weight = 0
            break if lines.size >= MAX_LINES
          end
          current << ch
          current_weight += w
        end
        lines << current if !current.empty? && lines.size < MAX_LINES
        # 最后一行可能被截断，加省略号
        if title.length > lines.join.length
          lines[-1] = lines[-1].to_s.rstrip + "…"
        end
        lines
      end

      def render_svg(title:, type:, site_title:, date:, lang:)
        title_lines = wrap_title(title.to_s)
        date_str = date ? date.strftime("%Y-%m-%d") : ""

        # 用 escape 防止 XML 注入
        title_lines_safe = title_lines.map { |l| xml_escape(l) }
        site_title_safe  = xml_escape(site_title)
        type_safe        = xml_escape(type)
        date_safe        = xml_escape(date_str)

        # 标题文本：每行 y 间隔 70px，整体居中
        line_height = 70
        total_h     = title_lines_safe.size * line_height
        start_y     = (HEIGHT / 2) - (total_h / 2) + 30
        title_tspans = title_lines_safe.each_with_index.map { |line, i|
          y = start_y + (i * line_height)
          %(<tspan x="80" y="#{y}">#{line}</tspan>)
        }.join("\n")

        type_color = case type
                     when "NOTE" then "#2c8c3e"   # 绿（笔记 = 花园）
                     when "TIL"  then "#b08900"   # 黄（TIL = 灯泡）
                     else             "#1f6feb"   # 蓝（POST = 信号）
                     end

        <<~SVG
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 #{WIDTH} #{HEIGHT}" width="#{WIDTH}" height="#{HEIGHT}">
            <defs>
              <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#0d1117"/>
                <stop offset="1" stop-color="#161b22"/>
              </linearGradient>
            </defs>

            <rect width="#{WIDTH}" height="#{HEIGHT}" fill="url(#bgGrad)"/>

            <!-- 左侧品牌竖条 -->
            <rect x="0" y="0" width="14" height="#{HEIGHT}" fill="#3fb950"/>

            <!-- 顶部类型徽章 -->
            <rect x="80" y="70" width="120" height="36" rx="6" fill="#{type_color}"/>
            <text x="140" y="94" text-anchor="middle"
                  font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
                  font-size="18" font-weight="700" fill="#ffffff" letter-spacing="0.1em">#{type_safe}</text>

            <!-- 标题 -->
            <text font-family="-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Source Han Sans', system-ui, sans-serif"
                  font-size="56" font-weight="700" fill="#c9d1d9">
              #{title_tspans}
            </text>

            <!-- 底部站点信息条 -->
            <line x1="80" y1="#{HEIGHT - 90}" x2="#{WIDTH - 80}" y2="#{HEIGHT - 90}"
                  stroke="#30363d" stroke-width="1"/>

            <text x="80" y="#{HEIGHT - 50}"
                  font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
                  font-size="22" font-weight="600" fill="#3fb950">$ #{site_title_safe}</text>

            #{date_str.empty? ? "" :
              %(<text x="#{WIDTH - 80}" y="#{HEIGHT - 50}" text-anchor="end"
                       font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
                       font-size="20" fill="#8b949e">#{date_safe}</text>)}
          </svg>
        SVG
      end

      def xml_escape(s)
        s.to_s.gsub("&", "&amp;").gsub("<", "&lt;").gsub(">", "&gt;")
               .gsub('"', "&quot;").gsub("'", "&apos;")
      end
    end
  end
end

# 在 site 写完所有页面之后执行 —— 这样我们直接写到 _site/，不会被 jekyll 清掉
Jekyll::Hooks.register :site, :post_write do |site|
  Jekyll::OgImageGenerator.generate(site)
end

# 同时在 pre_render 阶段就把 image 字段设进去（这样 jekyll-seo-tag 能读到）
# 用 .png 路径 —— SVG 由 og_image plugin 生成，PNG 由 deploy.yml 的 rsvg-convert 步骤生成
Jekyll::Hooks.register :site, :pre_render do |site|
  docs = []
  docs.concat(site.posts.docs)
  docs.concat(site.collections["notes"]&.docs || [])
  docs.concat(site.collections["til"]&.docs   || [])
  docs.each do |doc|
    next if doc.data["image"] && doc.data["image"] != ""
    slug = File.basename(doc.relative_path, ".*")
    # 优先用 PNG（兼容性更好）；本地开发若没装 rsvg-convert 则 SVG 也行
    doc.data["image"] = "/assets/og-cards-png/#{slug}.png"
  end
end
