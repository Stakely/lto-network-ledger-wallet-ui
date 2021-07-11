export default {
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  ssr: false,
  target: 'static',
  head: {
    title: 'LTO Network Ledger Wallet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'twitterimage',
        name: 'twitter:image',
        content: 'https://lto.stakely.io/lto-description-image.jpg'
      },
      {
        hid: 'ogimage',
        property: 'og:image',
        content: 'https://lto.stakely.io/lto-description-image.jpg'
      },
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
      lang: 'en'
    }
  },
}
