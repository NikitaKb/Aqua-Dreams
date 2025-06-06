<template>
    <Header static-white />
  <PoolDetailsPage :type="type" />
  <Contacts class="mt-100" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const type = route.params.type as string;
</script> 
<style>
.mt-100 {
  margin-top: 100px;
}
</style>