<template>
    <Header static-white />
  <TermoDetailsPage :type="type" />
  <Contacts />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const type = route.params.type as string;
</script> 