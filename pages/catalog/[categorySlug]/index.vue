<template>
  <div>
    <Header static-white />
    <Catalog :category-slug="categorySlug" />
    <Contacts />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const categorySlug = route.params.categorySlug as string;

// Преобразуем slug в читаемое название категории
const categoryName = computed(() => {
  const names: { [key: string]: string } = {
    'equipment': 'Оборудование',
    'chemistry': 'Химия',
    'accessories': 'Аксессуары',
    'spa': 'СПА оборудование'
  };
  return names[categorySlug] || categorySlug;
});

useHead({
  title: `${categoryName.value} для бассейнов | AquaDreams`,
  meta: [
    { name: 'description', content: `Каталог ${categoryName.value.toLowerCase()} для бассейнов и терма-зон. Широкий выбор качественных товаров от ведущих производителей.` },
    { name: 'keywords', content: `${categoryName.value.toLowerCase()} для бассейнов, ${categoryName.value.toLowerCase()} для терма-зон, купить ${categoryName.value.toLowerCase()} для бассейна` }
  ]
})
</script>

<style scoped>
div {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 