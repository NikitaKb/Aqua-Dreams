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
  title: `${categoryName.value} для бассейнов | AD`,
  meta: [
    { name: 'description', content: `Каталог ${categoryName.value.toLowerCase()} для бассейнов и термо. Широкий выбор качественных товаров от ведущих производителей в Ростове-на-Дону.` },
    { name: 'keywords', content: `${categoryName.value.toLowerCase()} для бассейнов, ${categoryName.value.toLowerCase()} для термо, купить ${categoryName.value.toLowerCase()} для бассейна, Ростов-на-Дону` },
    { property: 'og:title', content: `${categoryName.value} для бассейнов | AD` },
    { property: 'og:description', content: `Каталог ${categoryName.value.toLowerCase()} для бассейнов и термо.` },
    { property: 'og:type', content: 'website' }
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