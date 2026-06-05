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
        text: '算法',
        items: [
          { text: '合并两个有序数组', link: '/algorithm/merge-sorted-array' },
          { text: '罗马数字转整数', link: '/algorithm/roman-to-integer/roman-to-integer' },
          { text: '最长公共前缀', link: '/algorithm/longest-common-prefix/longest-common-prefix' },
          { text: '最后一个单词的长度', link: '/algorithm/length-of-last-word/length-of-last-word' },
        ],
      },
      {
        text: '指南',
        items: [
          { text: 'Docker', items: [
            { text: 'Docker Reference', link: '/guide/docker/reference' },
            { text: 'Docker Setup', link: '/guide/docker/setup' },
          ] },
          { text: 'Git', items: [
            { text: 'Git Command', link: '/guide/git/command' },
            { text: 'Git Setup', link: '/guide/git/setup' },
          ] },
          { text: 'chrony', link: '/guide/linux/chrony' },
          { text: 'MySQL', link: '/guide/mysql/reference' },
          { text: 'Scoop', link: '/guide/scoop/' },
          { text: 'Vue Router', link: '/guide/vuejs/router' },
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
