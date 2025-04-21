<script setup lang="ts">
import Certificates from '~/components/Certificates.vue';
import Header from '~/components/Header.vue'; // Import the Header component

</script>

<template>

<main>
  <!-- Add the Header component with a prop for static white styling -->
  <AboutUsHero />
  <ExperienceBlock />
  <Company />
  <Certificates />
  <Portfolio />
  <Contacts />
</main>

</template>


<style scoped>

</style>
