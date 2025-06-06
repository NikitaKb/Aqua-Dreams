<script setup>
import { useHead } from '#imports'
import ProductCard from '~/components/ProductCard.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getApiUrl } from '~/config/api'

const route = useRoute()
const productName = ref('')
const categoryName = ref('')

onMounted(async () => {
  try {
    const response = await fetch(getApiUrl(`/api/catalog/${route.params.categorySlug}/${route.params.productSlug}/`))
    const data = await response.json()
    productName.value = data.name
    categoryName.value = data.category_name || route.params.categorySlug
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
})

useHead({
  title: computed(() => productName.value ? `${productName.value} | AquaDreams` : 'Товар | AquaDreams'),
  meta: [
    { name: 'description', content: computed(() => 
      productName.value 
        ? `Купить ${productName.value} для бассейна или терма-зоны. Высокое качество, гарантия производителя.` 
        : 'Товары для бассейнов и терма-зон от AquaDreams'
    )},
    { name: 'keywords', content: computed(() => 
      productName.value 
        ? `${productName.value}, ${categoryName.value}, товары для бассейнов, купить ${productName.value.toLowerCase()}` 
        : 'товары для бассейнов, терма-зоны'
    )}
  ]
})
</script>

<template>
  <main>
    <Header static-white />
    <ProductCard />
    <Contacts />
  </main>
</template> 