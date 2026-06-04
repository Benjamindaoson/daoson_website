---
title: "Building a Modern Frontend Project with Vite"
date: 2026-05-20 10:00:00 +0800
tags: [frontend, tools]
description: From zero, step by step, to a clean, fast, maintainable frontend dev environment.
cover: /assets/img/covers/vite.svg
series: "Frontend Engineering"
lang: en
translation_key: vite-modern-frontend
---

This note records how I set up a clean, fast, maintainable frontend
experiment with Vite. It is a practical setup note, not a complete framework
tutorial.

> "Tools should serve thought, not the other way around."

## Why Vite

Vite leans on the browser's native ES Modules support, so dev mode skips
bundling entirely — and startup feels instant. Compared to the traditional
Webpack flow, the wins are:

- Cold start drops from **seconds** to **milliseconds**
- HMR is essentially instant; the bigger your project, the more obvious the gap
- TypeScript, JSX, and CSS preprocessors work out of the box
- Production builds use Rollup, with smaller output than Webpack

The terminal output below shows what `npm run dev` looks like — note the 187ms
startup:

![Vite dev server terminal output](/assets/img/posts/vite-modern-frontend/dev-server.svg)
*Vite dev server · cold start in 187ms*

## Getting started

A single command bootstraps a new project:

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
npm run dev
```

Open `http://localhost:5173` and you'll see the default page.

I am not embedding a video demo here yet. If I record a real project walkthrough,
I will link it from Elsewhere or add it to the article later.

## Common configuration

Here's the `vite.config.ts` I keep around:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

## Closing

Tools change. The shape of the problem doesn't. I hope this saves you a few
of the potholes I've stepped in. Drop me an email if you've found a sharper
approach — I'd love to hear it.

---

*Written in May 2026. Corrections welcome.*
