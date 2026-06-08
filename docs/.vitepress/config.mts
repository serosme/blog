import { defineConfig } from 'vitepress'
import { generateSidebar } from './generateSidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '博客',
  description: 'A VitePress Site',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: generateSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/serosme/blog' },
    ],

    search: {
      provider: 'local',
    },
  },
})
