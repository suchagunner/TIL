const {DocManager} = require("./utils");
const path = require('path');
const docManager = new DocManager(path.join(__dirname, '../docs'))

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'such a gunner 👈🏼',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "'Today I Learnt' web made with VuePress; host on Github Page",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */

  head: [
    ['meta', { name: 'theme-color', content: '5f0080' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */

  base: '/TIL/',
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/suchagunner',
      },
      {
        text: 'Blog',
        link: 'https://suchagunner.github.io',
      },
    ],
    sidebar: [
      {
        title: 'Getting Started',
        path: '/docs/',
        collapsable: false,
        children: [
          '/docs/',
            '/docs/why'
        ]
      },
      ...docManager.getSidebarItems()
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ["sitemap", { hostname: "https://suchagunner.github.io/TIL/" }]
  ]
};

// @TODO docs 자동 생성 코드 짜기. nested 고려.