<script setup lang="ts">
import { useHead } from '#imports'
import Certificates from '~/components/Certificates.vue';
import Header from '~/components/Header.vue'; // Import the Header component

useHead({
  title: 'О компании AquaDreams - Наш опыт и достижения',
  meta: [
    { name: 'description', content: 'Узнайте больше о компании AquaDreams - лидере в области проектирования и строительства бассейнов и терма-зон. Наш опыт, сертификаты и реализованные проекты.' },
    { name: 'keywords', content: 'о компании AquaDreams, опыт строительства бассейнов, сертификаты, реализованные проекты' }
  ]
})
</script>

<template>

  <main>
    <Header static-white />
    <AboutUsHero class="section-spacing about-hero-padding first-section-spacing" />
    <ExperienceBlock class="section-spacing" />
    <Company class="section-spacing" />
    <Certificates class="section-spacing" />
    <Portfolio class="section-spacing" />
    <Contacts class="section-spacing" />

    
  </main>

</template>


<style scoped>
.section-spacing {
  margin-bottom: 90px;
}
@media (max-width: 1440px) {
  .section-spacing { margin-bottom: 80px; }
}
@media (max-width: 1024px) {
  .section-spacing { margin-bottom: 70px; }
}
@media (max-width: 768px) {
  .section-spacing { margin-bottom: 60px; }
}
@media (max-width: 430px) {
  .section-spacing { margin-bottom: 55px; }
}
@media (max-width: 375px) {
  .section-spacing { margin-bottom: 55px; }
}
.about-hero-padding {
  padding-left: 10px;
  padding-right: 10px;
}
.first-section-spacing {
  margin-top: 90px;
}
@media (max-width: 1440px) {
  .first-section-spacing { margin-top: 80px; }
}
@media (max-width: 1024px) {
  .first-section-spacing { margin-top: 70px; }
}
@media (max-width: 768px) {
  .first-section-spacing { margin-top: 60px; }
}
@media (max-width: 430px) {
  .first-section-spacing { margin-top: 55px; }
}
@media (max-width: 375px) {
  .first-section-spacing { margin-top: 55px; }
}
</style>
