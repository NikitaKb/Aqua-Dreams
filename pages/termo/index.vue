<template>
<main>
    
<TermoPage />
<TermoTypes />
<Contacts class="margin-top-100" />
</main>
</template>

<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Терма-зоны | AquaDreams',
  meta: [
    { name: 'description', content: 'Создайте свою идеальную терма-зону с AquaDreams. Комплексные услуги по проектированию, строительству и обслуживанию терма-зон для любого бюджета.' }
  ]
})
</script>

<style scoped>
.margin-top-100 {
  margin-top: 100px;
}
</style>