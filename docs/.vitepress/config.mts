import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Útulek pro zvířátka",
  description: "Dokumentace k fullstack aplikaci pro správu útulku",
  themeConfig: {
    nav: [
      { text: 'Úvod', link: '/' },
      { text: 'Zvířata', link: '/zvirata' },
      { text: 'Pečovatelé', link: '/pecovatele' },
      { text: 'Finance', link: '/finance' },
      { text: 'Adopce', link: '/adopce' }
    ],

    sidebar: [
      {
        text: 'Dokumentace',
        items: [
          { text: 'Úvod', link: '/' },
          { text: 'Zvířata', link: '/zvirata' },
          { text: 'Pečovatelé', link: '/pecovatele' },
          { text: 'Finance', link: '/finance' },
          { text: 'Adopce', link: '/adopce' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-github-username/your-repo' }
    ]
  }
})
