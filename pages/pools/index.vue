<template>

<main>
  
<PoolsPage />
<PoolTypes class="pool-types-section" />
<Contacts class="margin" />

</main>

</template>

<script setup>
import { useHead } from '#imports'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

useHead({
  title: 'Бассейны от AquaDreams - Проектирование и строительство',
  meta: [
    { name: 'description', content: 'Профессиональное проектирование и строительство бассейнов любой сложности. Индивидуальный подход, современные технологии и гарантия качества от AquaDreams.' },
    { name: 'keywords', content: 'бассейны, строительство бассейнов, проектирование бассейнов, частные бассейны, общественные бассейны' }
  ]
})
</script>

<style scoped>
.pool-types-section {
  margin-top: 86px;
}
.margin{
  margin-top: 100px;
}
</style>
