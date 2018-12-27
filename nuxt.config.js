const pkg = require('./package')
// const LRU = require('lru-cache')
// const nuxtPageCache = require('nuxt-page-cache')

module.exports = {
  mode: 'universal',
  // render: {
  //   bundleRenderer: {
  //     cache: new LRU({
  //       max: 1000, // 最大的缓存个数
  //       maxAge: 1000 * 60 * 15 // 缓存15分钟
  //     })
  //   }
  // },
  // serverMiddleware: [
  //   nuxtPageCache.cacheSeconds(1, req => {
  //     console.log(req)
  //     if (req.query && req.query.pageType) {
  //       return req.query.pageType
  //     }
  //     return false
  //   })
  // ],
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    script: [
      {
        src:
          'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js',
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    '~assets/styles/reset.css',
    '~assets/styles/common.css',
    '~assets/styles/border.css',
    'swiper/dist/css/swiper.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/vant',
      ssr: true
    },
    {
      src: '~/plugins/lazy-load',
      ssr: false
    },
    {
      src: '~/plugins/dsbridge',
      ssr: false
    },
    {
      src: '~/plugins/vue-extends',
      ssr: false
    },
    {
      src: '~/plugins/wx',
      ssr: false
    },
    {
      src: '~/plugins/localStorage.js',
      ssr: false
    },
    {
      src: '~/plugins/http.js',
      ssr: true
    },

    { src: '~/plugins/vue-swiper.js', ssr: false },
    { src: '~/plugins/collect.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  router: {
    extendRoutes(routes) {
      routes.forEach(r => {
        if (r.path === '/') {
          r.redirect = '/hall'
        }
      })
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: [
      require('postcss-px2rem')({
        remUnit: 112.5
      })
    ],
    vendor: ['axios']
  }
}
