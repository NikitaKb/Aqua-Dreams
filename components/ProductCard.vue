<template>
  <section class="product-section" v-if="product">
    <div class="breadcrumbs">
      <router-link to="/products">Товары</router-link> &gt;
      <router-link :to="`/catalog/${categorySlug}`">{{ categoryName }}</router-link> &gt;
      {{ product.name }}
    </div>
    <h2 class="product-title">{{ product.name }}</h2>
    <div class="product-main">
      <div class="product-slider">
        <div class="product-img-container"
          @touchstart="startSwipe"
          @touchmove="moveSwipe"
          @touchend="endSwipe"
          @mousedown="startSwipe"
          @mousemove="moveSwipe"
          @mouseup="endSwipe"
          @mouseleave="endSwipe"
        >
          <img v-if="currentImage" :src="currentImage" :alt="product.name" class="product-main-img" />
        </div>
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
        <button class="consult-btn" @click="showConsultModal = true">Бесплатная консультация</button>
      </div>
    </div>
    <div class="product-block">
      <h3>Надежность товара </h3>
      <p>{{ product.reliability_text }}</p>
    </div>
    <div class="product-block">
      <h3>Особые отметки</h3>
      <p>{{ product.special_notes }}</p>
    </div>
    <ConsultationModal
      :show="showConsultModal"
      :onClose="() => showConsultModal = false"
      :slug="product.slug"
      :name="product.name"
    />
 
  </section>
</template>

<script>
import ConsultationModal from './ConsultationModal.vue';
import { getApiUrl, API_CONFIG } from '~/config/api';

export default {
  name: 'ProductCard',
  components: { ConsultationModal },
  data() {
    return {
      product: null,
      categorySlug: this.$route.params.categorySlug,
      productSlug: this.$route.params.productSlug,
      currentImageIndex: 0,
      categoryName: '',
      showConsultModal: false,
      swipeStartX: 0,
      swipeEndX: 0,
      isSwiping: false
    };
  },
  computed: {
    images() {
      if (!this.product || !this.product.images) return [];
      
      return this.product.images.map(imgObj => {
        const imageUrl = imgObj.image;
        return imageUrl.startsWith('http') ? imageUrl : getApiUrl(imageUrl);
      });
    },
    currentImage() {
      return this.images[this.currentImageIndex] || this.images[0] || '';
    }
  },
  methods: {
    startSwipe(event) {
      if (event.type === 'mousedown') {
        event.preventDefault();
      }
      this.isSwiping = true;
      this.swipeStartX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
      this.swipeEndX = 0;
    },
    moveSwipe(event) {
      if (!this.isSwiping) return;
      this.swipeEndX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    },
    endSwipe() {
      if (!this.isSwiping) return;
      this.isSwiping = false;

      const swipeDistance = this.swipeEndX - this.swipeStartX;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance < 0) {
          this.nextImage();
        } else {
          this.prevImage();
        }
      }

      this.swipeStartX = 0;
      this.swipeEndX = 0;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    },
    async fetchCategoryName() {
      try {
        const res = await fetch(getApiUrl('/api/catalog/'));
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
    const res = await fetch(getApiUrl(`/api/catalog/${this.categorySlug}/${this.productSlug}/`));
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
}
.product-slider {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 60%;
  flex: 1 1 60%;
  background: #fff;
  border: 1px solid #bbb;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  padding: 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  width: 100%;
}
.product-main-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  flex-shrink: 0;
}
.product-img-container {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  flex-shrink: 0;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.product-img-container:active {
  cursor: grabbing;
}
.product-slider-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}
.product-slider-controls button {
  pointer-events: all;
  background: #fff;
  color: #000;
  font-size: 22px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  margin: 0 8px;
  -webkit-transition: background 0.2s, color 0.2s;
  transition: background 0.2s, color 0.2s;
  border: none;
}
.product-slider-controls button:hover {
  background: #fff;
  color: #000;
}
.product-thumbs {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 8px;
  margin-top: 8px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.product-thumb {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border: 1px solid #eee;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  -webkit-transition: border 0.2s, opacity 0.2s;
  transition: border 0.2s, opacity 0.2s;
}
.product-thumb.active, .product-thumb:hover {
  border: 1.5px solid #23A3FF;
  opacity: 1;
}
.product-info {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 40%;
  flex: 1 1 40%;
  background: #fff;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  padding: 24px 18px;
 
  margin-left: 0;
  width: 100%;
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
  width: 260px;
  height: 70px;
  -webkit-border-radius: 15px;
  border-radius: 15px;
  border: 1px solid #23A3FF;
  padding: 35px 94px;
  gap: 10px;
  background: #fff;
  color: #23A3FF;
  font-size: 16px;
  cursor: pointer;
  -webkit-transition: background 0.2s, color 0.2s;
  transition: background 0.2s, color 0.2s;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
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
    max-width: 1160px;
    padding: 24px 8px;
  }
  .product-main-img {
    width: 450px;
    height: 270px;
  }
}
@media (max-width: 1024px) {
  .product-section {
    max-width: 960px;
    padding: 16px 4px;
  }
  .product-main-img {
    width: 400px;
    height: 240px;
  }
}
@media (max-width: 768px) {
  .product-section {
    max-width: 100vw;
    padding: 8px 2vw;
  }
  .product-main-img {
    width: 100%;
    height: auto;
    max-height: 300px;
  }
  .product-slider-controls {
    display: none;
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
    padding: 2px 10px;
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