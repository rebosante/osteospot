// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
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
      link: [
        { rel: 'stylesheet', href: 'css/all.min.css' },
        { rel: 'stylesheet', href: 'css/tooplate-style.css' },
        { rel: 'stylesheet', href: 'css/annachiara-custom.css' },
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-CBE1SBBVC4',
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CBE1SBBVC4');
          `,
          type: 'text/javascript'
        }
      ]
    }
  },
  runtimeConfig: {
    MAILHOST: process.env.MAILHOST,
    MAILPORT: process.env.MAILPORT,
    MAILUSER: process.env.MAILUSER,
    MAILPASSWORD: process.env.MAILPASSWORD,
    CONTACTMAIL: process.env.CONTACTMAIL
  }
  /* mail: {
    smtp: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    },
    from: process.env.MAIL_FROM,
  } */
}

export default config
