export default {
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  target: 'static',
  head: {
    title: 'LTO Network Ledger Wallet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: `LTO Network wallet interface for Ledger devices. Built by the Stakely.io team.` },
      { name: 'og:title', property: 'og:title', content: `LTO Network Ledger Wallet` },
      { name: 'og:url', property: 'og:url', content: 'https://lto.stakely.io' },
      { name: 'og:description', property: 'og:description', content: `LTO Network wallet interface for Ledger devices. Built by the Stakely.io team.` },
      { name: 'twitter:image', content: 'https://lto.stakely.io/lto-description-image.jpg' },
      { name: 'og:image', property: 'og:image', content: 'https://lto.stakely.io/lto-description-image.jpg' },
      { name: 'theme-color', content: '#637bd9' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'vue-json-pretty/lib/styles.css'
  ],
  plugins: [
    '@/plugins/vue-json-pretty'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  pwa: {
    manifest: {
      lang: 'en',
      short_name: "LTO Wallet",
      name: "LTO Network Ledger Wallet",
      icons: [
        {
          src: "/icons/launcher-icon-1x.png",
          type: "image/png",
          sizes: "48x48"
        },
        {
          src: "/icons/launcher-icon-2x.png",
          type: "image/png",
          sizes: "96x96"
        },
        {
          src: "/icons/launcher-icon-4x.png",
          type: "image/png",
          sizes: "192x192"
        },
        {
          src: "/icons/launcher-512.png",
          type: "image/png",
          sizes: "512x512"
        }
      ],
      start_url: "/",
      background_color: "#F1F1F1",
      scope: "/",
      display: "standalone"
    },
  },
}
