# A Website for Nepunah using NextJS + Sanity.IO Starter

The idea here was the need to develop a new solution for Nepunah using some Free-of-charge infrastructure that the end-user could update its content (CMS).
For that I've chosen Sanity.IO and Vercel for the CI/CD.

The Sanity.IO Studio connects to Sanity Content Lake, which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more.

## Table of Contents

- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)
  - [Step 3. Run Next.js locally in development mode](#run-nextjs-locally-in-development-mode)
  - [Step 4. Deploy to production](#deploy-to-production)


## Project Overview

### Important files and folders

| File(s)                                   | Description                                                                           |
| --------------------------------          | ------------------------------------------------------------------------------------- |
| `sanity.config.ts`                        | Config file for Sanity Studio                                                         |
| `sanity.cli.ts`                           | Config file for Sanity CLI                                                            |
| `/components/...`                         | Where we have all our reusable components                                             |
| `/pages/index.tsx`                        | Landing page for `/`.                                                                 |
| `/pages/studio/[[...index]].tsx`          | Where Sanity Studio is mounted                                                        |
| `/pages/terapia/[[...index]].tsx`         | Where Terapias Content is mounted                                                     |
| `/pages/textos-reflexao/[[...index]].tsx` | Where Textos de Reflexão Content is mounted                                           |
| `/pages/api/draft.ts`                     | Serverless route for triggering Draft mode                                            |
| `/sanity/schemas.ts`                      | Where Sanity Studio gets its content types from                                       |
| `/sanity/env.ts`                          | Configuration for the Sanity project and dataset                                      |
| `/sanity/schemas.ts`                      | Where Sanity Studio gets its content types from                                       |
| `/lib/sanity.client.ts`                   | Sanity client configured based on `env.ts`                                            |
| `/lib/sanity.image.ts`                    | Sanity image builder - unused in this template, but is needed to render Sanity images |
| `/components/...`                         | Where we have all our reusable components                                             |
| `tailwind.config.js`                      | Tailwind config. Only applies to files listed under `content`                         |

All pages are wrapped in `pages/*.tsx` and `pages/**/*.tsx`.

### Run Next.js locally in development mode

```bash
npm install && npm run dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your blog should be up and running on [http://localhost:3000][localhost-3000]! You can create and edit content on [http://localhost:3000/studio][localhost-3000-studio].

### Deploy to production

To deploy your changes to production you use `git` and merge your changes to main branch:

```bash
git add .
git commit
git push
```
