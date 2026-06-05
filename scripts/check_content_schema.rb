#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"
require "date"
require "pathname"

ROOT = Pathname.new(__dir__).parent

errors = []

def load_yaml(path)
  YAML.safe_load_file(path, permitted_classes: [Date, Time], aliases: true)
rescue StandardError => e
  raise "#{path}: #{e.message}"
end

def front_matter(path)
  text = File.read(path, encoding: "UTF-8")
  match = text.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  return {} unless match

  YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true) || {}
rescue StandardError => e
  raise "#{path}: #{e.message}"
end

projects_path = ROOT.join("_data", "projects.yml")
projects = load_yaml(projects_path)
unless projects.is_a?(Array)
  errors << "_data/projects.yml must be a YAML array."
else
  allowed_statuses = %w[active prototype learning archived]
  allowed_visibility = %w[public private writing]
  required_project_fields = %w[name_zh name_en description_zh description_en status category year]
  paired_fields = %w[hypothesis problem next public_boundary]

  projects.each_with_index do |project, index|
    label = project["name_en"] || project["name_zh"] || "project ##{index + 1}"
    required_project_fields.each do |field|
      errors << "#{label}: missing #{field}." if project[field].nil? || project[field].to_s.strip.empty?
    end

    unless allowed_statuses.include?(project["status"].to_s)
      errors << "#{label}: status must be one of #{allowed_statuses.join(', ')}."
    end

    visibility = project["visibility"]
    if visibility && !allowed_visibility.include?(visibility.to_s)
      errors << "#{label}: visibility must be one of #{allowed_visibility.join(', ')}."
    end

    paired_fields.each do |base|
      zh = project["#{base}_zh"]
      en = project["#{base}_en"]
      errors << "#{label}: #{base}_zh and #{base}_en should be maintained together." if !!zh != !!en
    end
  end
end

elsewhere_path = ROOT.join("_data", "elsewhere.yml")
elsewhere = load_yaml(elsewhere_path)
unless elsewhere.is_a?(Array)
  errors << "_data/elsewhere.yml must be a YAML array. Use [] when empty."
else
  allowed_types = %w[article video short thread newsletter]
  allowed_languages = %w[zh en]
  required_elsewhere_fields = %w[title platform date type summary url language]

  elsewhere.each_with_index do |item, index|
    label = item["title"] || "elsewhere item ##{index + 1}"
    required_elsewhere_fields.each do |field|
      errors << "#{label}: missing #{field}." if item[field].nil? || item[field].to_s.strip.empty?
    end
    errors << "#{label}: type must be one of #{allowed_types.join(', ')}." unless allowed_types.include?(item["type"].to_s)
    errors << "#{label}: language must be zh or en." unless allowed_languages.include?(item["language"].to_s)
  end
end

content_rules = {
  "_posts" => %w[title date description lang],
  "_notes" => %w[title date description lang],
  "_til" => %w[title date lang]
}

content_rules.each do |dir, required_fields|
  Dir.glob(ROOT.join(dir, "*.md")).sort.each do |path|
    meta = front_matter(path)
    rel = Pathname.new(path).relative_path_from(ROOT).to_s

    required_fields.each do |field|
      errors << "#{rel}: missing #{field}." if meta[field].nil? || meta[field].to_s.strip.empty?
    end

    lang = meta["lang"]
    errors << "#{rel}: lang must be zh or en." if lang && !%w[zh en].include?(lang.to_s)
  end
end

ui_files = %w[
  index.html
  about.md
  projects.html
  now.md
  _includes/sidebar.html
]

english_ui_terms = [
  "Featured Writing",
  "Latest Updates",
  "Current Focus",
  "Current Build",
  "Digital Garden",
  "Contact / Follow",
  "View Now",
  "Read writing",
  "View Labs",
  "Email"
]

ui_files.each do |rel|
  path = ROOT.join(rel)
  next unless path.file?

  text = File.read(path, encoding: "UTF-8")
  text.scan(/<span class="i18n i18n-zh">(.*?)<\/span>/m).flatten.each do |zh_text|
    english_ui_terms.each do |term|
      errors << "#{rel}: Chinese UI span contains English UI label '#{term}'." if zh_text.include?(term)
    end
  end

  text.scan(/<span class="i18n i18n-en">(.*?)<\/span>/m).flatten.each do |en_text|
    errors << "#{rel}: English UI span contains Chinese text." if en_text.match?(/[\p{Han}]/)
  end
end

if errors.empty?
  puts "OK: content schema checks passed."
else
  warn "Content schema checks failed:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end
