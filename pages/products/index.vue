<script setup lang="ts">
import { useHead } from '#imports'
import Header from '~/components/Header.vue'; // Import the Header component
import Catalog from '~/components/Catalog.vue';

useHead({
  title: 'Товары для бассейнов и терма-зон | AquaDreams',
  meta: [
    { name: 'description', content: 'Широкий выбор оборудования и аксессуаров для бассейнов и терма-зон. Только качественные товары от проверенных производителей.' },
    { name: 'keywords', content: 'товары для бассейнов, оборудование для бассейнов, аксессуары для бассейнов, товары для терма-зон' }
  ]
})
</script>

<template>

  <main>
    <Header static-white />
  <Catalog />
    <Contacts />
  </main>

</template>


<style scoped></style>
