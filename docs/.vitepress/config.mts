
import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/FrameKore-Engine/',
  title: "FrameKore",
  description: "Engine de Jogos 2D",
  head: [
    ['link', {rel: 'icon', href: '/icon.png'}]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    logo: "/icon.png",
    
    sidebar: [
      {
        text: 'Começando',
        items: [
          { text: 'Introdução', link: '/documentacao/doc-introducao' },
          { text: 'Iniciando', link: '/documentacao/doc-iniciando' }
        ]
      },
      {
        text: 'Elementos do Jogo',
        items: [
          { text: 'Engine', link: '/documentacao/doc-engine' },
          { text: 'GameObjects', link: '/documentacao/doc-gameobjects' }
        ]
      },
      {
        text: 'Referencia da API',
        items: typedocSidebar,
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Fkaique/FrameKore-Engine' }
    ]
  }
})
