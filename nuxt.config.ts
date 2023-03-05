// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
    vite: {
      plugins: [
        VueI18nVitePlugin({
          include: [
            resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
          ]
        })
      ]
    },
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
            titleTemplate: '%s -OsteoSpot by Annachiara',
            meta: [
              // <meta name="description" content="My amazing site">
              { name: 'description', content: 'OsteoSpot by Annachiara' }
            ],
            link: [
                { rel: 'stylesheet', href: 'css/all.min.css' },
                { rel: 'stylesheet', href: 'css/tooplate-style.css' },
                { rel: 'stylesheet', href: 'css/annachiara-custom.css' },
            ]
        }
      },
      /*modules: [
        ['nuxt-mail', {
          message: {
            to: 'asnete@gmail.com',
          },
          smtp: {
            host: 'smtp.dreamhost.com',
            port: 465,
            auth: {
              user: 'info@osteorevolucion.com',
              pass: '4nn4ch14r4_'
            },
          },
        }],
      ]*/
})
