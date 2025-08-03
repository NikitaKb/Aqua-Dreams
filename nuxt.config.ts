// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // Оптимизация производительности
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },
  
  // Оптимизация изображений
  modules: [
    '@nuxt/image'
  ],
  
  // Оптимизация CSS
  css: [
    '~/assets/css/main.css'
  ],
  
  // Оптимизация загрузки
  experimental: {
    payloadExtraction: false,
  },
  
  // Оптимизация сборки
  build: {
    transpile: ['swiper'],
  },
  
  // SEO настройки
  app: {
    head: {
      title: 'AD - Бассейны и термо | Строительство бассейнов',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Строительство бассейнов и термо в Ростове-на-Дону. Профессиональное проектирование и монтаж бассейнов любой сложности. Бесплатная консультация.' 
        },
        { 
          name: 'keywords', 
          content: 'бассейны, строительство бассейнов, термо, сауны, бани, Ростов-на-Дону' 
        },
        { property: 'og:title', content: 'AD - Бассейны и термо | Строительство бассейнов' },
        { property: 'og:description', content: 'Строительство бассейнов и термо в Ростове-на-Дону. Профессиональное проектирование и монтаж.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://your-domain.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AD - Бассейны и термо' },
        { name: 'twitter:description', content: 'Строительство бассейнов и термо в Ростове-на-Дону' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  }
})
