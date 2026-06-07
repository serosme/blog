import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '博客',
  description: 'A VitePress Site',
  cleanUrls: true,
  vite: {
    plugins: [
      {
        name: 'ubuntu-resolute-deb822',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.originalUrl === '/ubuntu-resolute-deb822') {
              res.setHeader('Content-Type', 'text/plain')
              res.end(`
#!/bin/bash
sudo tee /etc/apt/sources.list.d/ubuntu.sources > /dev/null << 'EOF'
Types: deb
URIs: https://mirrors.ustc.edu.cn/ubuntu
Suites: resolute resolute-updates resolute-backports resolute-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
EOF
              `.trim())
            }
            else {
              next()
            }
          })
        },
      },
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: [
      {
        text: '算法',
        items: [
          { text: '最后一个单词的长度', link: '/algorithm/length-of-last-word/length-of-last-word' },
          { text: '最长公共前缀', link: '/algorithm/longest-common-prefix/longest-common-prefix' },
          { text: '罗马数字转整数', link: '/algorithm/roman-to-integer/roman-to-integer' },
          { text: '合并两个有序数组', link: '/algorithm/merge-sorted-array' },
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
          { text: 'WSL', collapsed: true, items: [
            { text: 'Setup', link: '/guide/wsl/setup' },
            { text: 'Ubuntu', link: '/guide/wsl/ubuntu' },
          ] },
          { text: 'chrony', link: '/guide/linux/chrony' },
          { text: 'MySQL', link: '/guide/mysql/reference' },
          { text: 'Scoop', link: '/guide/scoop' },
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
