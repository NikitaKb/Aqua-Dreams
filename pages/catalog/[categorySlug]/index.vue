<template>
  <div>
    <Header static-white />
    <Catalog :category-slug="categorySlug" />
    <Contacts />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const categorySlug = route.params.categorySlug as string;
</script>

<style scoped>
div {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 