import { defineConfig, s } from 'velite'

import { SUPPORTED_LANGS, CATEGORIES } from './constants/config'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    authors: {
      name: 'Author',
      pattern: 'authors/*.yml',
      schema: s.object({
        id: s.string(),
        name: s.string(),
        avatar: s.string(),
        bio: s.string(),
        email: s.string().email().optional(),
        website: s.string().url().optional(),
        social: s.object({
          twitter: s.string().optional(),
          linkedin: s.string().optional(),
          github: s.string().optional(),
        }).optional(),
        credentials: s.object({
          title: s.string().optional(),
          company: s.string().optional(),
          experience: s.string().optional(),
          education: s.array(s.string()).optional(),
          certifications: s.array(s.string()).optional(),
          achievements: s.array(s.string()).optional(),
        }).optional(),
        expertise: s.array(s.string()),
        location: s.string().optional(),
        joinDate: s.isodate().optional(),
      })
    },
    posts: {
      name: 'Post',
      pattern: 'blog/**/*.mdx',
      schema: s.object({
        title: s.string(),
        slug: s.slug('blog'),
        date: s.isodate(),
        lang: s.enum(SUPPORTED_LANGS as unknown as [string, ...string[]]),
        category: s.enum(CATEGORIES as unknown as [string, ...string[]]),
        author: s.string(),
        description: s.string(),
        content: s.mdx()
      })
    }
  }
})