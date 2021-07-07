export default {
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  ssr: false,
  target: 'static',
  head: {
    titleTemplate: '%s - LTONetworkLedger',
    title: 'LTONetworkLedger',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
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
