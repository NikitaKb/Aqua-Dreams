<template>

<main>
  
<PoolsPage />
<PoolTypes class="pool-types-section" />
<Contacts class="margin" />

</main>

</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
.pool-types-section {
  margin-top: 86px;
}
.margin{
  margin-top: 100px;
}
</style>
