<template>
  <div>
    <Header static-white />
    <TermoDetailsPage :type="type" />
    <Contacts class="mt-100" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TermoDetailsPage from '~/components/TermoDetailsPage.vue';

const route = useRoute();
const type = route.params.type as string;
</script>

<style scoped>
.mt-100 {
  margin-top: 100px;
}
div {

  display: flex;
  flex-direction: column;
}
</style> 