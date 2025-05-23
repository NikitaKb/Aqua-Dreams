<template>
  <div>
    <Header static-white />
    <TermoDetailsPage :type="type" />
    <Contacts />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TermoDetailsPage from '~/components/TermoDetailsPage.vue';

const route = useRoute();
const type = route.params.type as string;
</script>

<style scoped>
div {

  display: flex;
  flex-direction: column;
}
</style> 