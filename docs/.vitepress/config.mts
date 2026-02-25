import { defineConfig } from 'vitepress'

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

    sidebar: [
      {
        text: '日常',
        items: [
          { text: '最新', link: '/daily/latest' },
        ],
      },
      {
        text: '算法',
        collapsed: true,
        items: [
          { text: '目录', link: '/algorithm/toc' },
          { text: '合并两个有序数组', link: '/algorithm/merge-sorted-array' },
          { text: '罗马数字转整数', link: '/algorithm/roman-to-integer/roman-to-integer' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/serosme/blog' },
    ],

    search: {
      provider: 'local',
    },
  },
})
