<template>
  <section class="product-section" v-if="product">
    <div class="breadcrumbs">
      <router-link to="/">Товары</router-link> &gt;
      <router-link :to="`/catalog/${categorySlug}`">{{ categoryName }}</router-link> &gt;
      {{ product.name }}
    </div>
    <h1 class="product-title">{{ product.name }}</h1>
    <div class="product-main">
      <div class="product-slider">
        <img :src="currentImage" alt="" class="product-main-img" />
        <div v-if="images.length > 1" class="product-slider-controls">
          <button @click="prevImage">‹</button>
          <button @click="nextImage">›</button>
        </div>
        <div class="product-thumbs" v-if="images.length > 1">
          <img v-for="(img, idx) in images" :key="idx" :src="img" :class="['product-thumb', {active: idx === currentImageIndex}]" @click="currentImageIndex = idx" />
        </div>
      </div>
      <div class="product-info">
        <h3>Характеристики</h3>
        <div v-for="spec in product.specifications" :key="spec.id" class="product-spec">
          <b>{{ spec.key }}</b>: {{ spec.value }}
        </div>
        <button class="consult-btn">Бесплатная консультация</button>
      </div>
    </div>
    <div class="product-block">
      <h2>Надежность товара </h2>
      <p>{{ product.reliability_text }}</p>
    </div>
    <div class="product-block">
      <h2>Особые отметки</h2>
      <p>{{ product.special_notes }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductCard',
  data() {
    return {
      product: null,
      categorySlug: this.$route.params.categorySlug,
      productSlug: this.$route.params.productSlug,
      currentImageIndex: 0,
      categoryName: '',
    };
  },
  computed: {
    images() {
      if (!this.product) return [];
      return [
        ...(this.product.images || []).map(img => img.image_url)
      ].filter(Boolean);
    },
    currentImage() {
      return this.images[this.currentImageIndex] || this.images[0] || '';
    }
  },
  methods: {
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    },
    async fetchCategoryName() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/catalog/');
        if (!res.ok) throw new Error('Ошибка загрузки категорий');
        const data = await res.json();
        const found = data.find(cat => cat.slug === this.categorySlug);
        if (found) this.categoryName = found.name;
      } catch (e) {
        this.categoryName = this.categorySlug;
      }
    }
  },
  async mounted() {
    const res = await fetch(`http://127.0.0.1:8000/api/catalog/${this.categorySlug}/${this.productSlug}/`);
    this.product = await res.json();
    if (this.product.category_name) {
      this.categoryName = this.product.category_name;
    } else {
      await this.fetchCategoryName();
    }
  }
};
</script>

<style scoped>
.product-section {
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 16px;
  box-sizing: border-box;
}
.breadcrumbs {
  font-size: 14px;
  color: #888;
  margin-bottom: 18px;
}
.product-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 24px;
}
.product-main {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-bottom: 32px;
}
.product-slider {
  flex: 1 1 60%;
  max-width: 600px;
  min-width: 320px;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.product-main-img {
  width: 100%;
  max-width: 420px;
  max-height: 320px;
  object-fit: contain;
  margin-bottom: 12px;
}
.product-slider-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}
.product-slider-controls button {
  pointer-events: all;
  background: #fff;
  border: 1px solid #23A3FF;
  color: #23A3FF;
  font-size: 22px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  margin: 0 8px;
  transition: background 0.2s, color 0.2s;
}
.product-slider-controls button:hover {
  background: #23A3FF;
  color: #fff;
}
.product-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: center;
}
.product-thumb {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: border 0.2s, opacity 0.2s;
}
.product-thumb.active, .product-thumb:hover {
  border: 1.5px solid #23A3FF;
  opacity: 1;
}
.product-info {
  flex: 1 1 40%;
  min-width: 220px;
  background: #fff;
  border-radius: 4px;
  padding: 24px 18px;
  border: 1px solid #eee;
  margin-left: 0;
}
.product-info h3 {
  font-size: 20px;
  margin-bottom: 16px;
}
.product-spec {
  font-size: 16px;
  margin-bottom: 8px;
}
.consult-btn {
  margin-top: 24px;
  border: 1px solid #23A3FF;
  background: #fff;
  color: #23A3FF;
  border-radius: 100px;
  padding: 10px 0;
  width: 200px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.consult-btn:hover {
  background: #23A3FF;
  color: #fff;
}
.product-block {
  margin-bottom: 32px;
}
.product-block h2 {
  font-size: 22px;
  margin-bottom: 12px;
}
.product-block p {
  font-size: 16px;
  color: #222;
}
@media (max-width: 1440px) {
  .product-section {
    max-width: 1200px;
    padding: 24px 8px;
  }
}
@media (max-width: 1024px) {
  .product-section {
    max-width: 900px;
    padding: 16px 4px;
  }
}
@media (max-width: 768px) {
  .product-section {
    max-width: 100vw;
    padding: 8px 2vw;
  }
}
@media (max-width: 480px) {
  .product-section {
    max-width: 100vw;
    padding: 4px 1vw;
  }
}
@media (max-width: 375px) {
  .product-section {
    max-width: 100vw;
    padding: 2px 0.5vw;
  }
}
@media (max-width: 900px) {
  .product-main {
    flex-direction: column;
    gap: 24px;
  }
  .product-slider, .product-info {
    max-width: 100%;
    width: 100%;
  }
}
@media (max-width: 600px) {
  .product-title {
    font-size: 22px;
    margin-bottom: 12px;
  }
  .product-main-img {
    max-width: 100%;
    max-height: 180px;
  }
  .product-info {
    padding: 12px 4px;
  }
  .product-block h2 {
    font-size: 16px;
  }
  .product-block p {
    font-size: 13px;
  }
}
</style> 