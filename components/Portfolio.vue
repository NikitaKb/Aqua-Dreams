<template>
  <section class="portfolio-section">
    <h2 class="portfolio-title">Портфолио проектов</h2>
    <div class="portfolio-grid">
      <div
        v-for="category in categories"
        :key="category.id"
        class="portfolio-item"
        @click="openCategory(category)"
      >
        <img :src="category.image" :alt="category.name" />
        <div class="overlay">{{ category.name }}</div>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>{{ selectedCategory?.name }}</h3>
        <div class="modal-projects">
          <div v-if="loadingCategoryImages">Загрузка...</div>
          <div v-else-if="categoryImages.length === 0">Нет фото</div>
          <template v-else>
            <div v-for="img in categoryImages" :key="img.id" class="modal-project-item">
              <img
                :src="img.image"
                :alt="selectedCategory?.name"
                class="project-preview"
                @click.stop="openFullImage(img.image)"
              />
            </div>
          </template>
        </div>
        <button class="modal-close" @click="closeModal">Закрыть</button>
      </div>
    </div>
    <div v-if="fullImageSrc" class="full-image-overlay" @click="closeFullImage">
      <img :src="fullImageSrc" class="full-image" @click.stop="closeFullImage" />
    </div>
  </section>
</template>

<script>
import { getApiUrl } from '~/config/api';

export default {
  name: 'Portfolio',
  data() {
    return {
      categories: [],
      showModal: false,
      selectedCategory: null,
      categoryImages: [],
      loadingCategoryImages: false,
      fullImageSrc: null,
    };
  },
  methods: {
    async fetchCategories() {
      // Получаем категории
      const res = await fetch(getApiUrl('/api/project/category'));
      const categories = await res.json();
      // Для каждой категории получаем первую картинку
      const categoriesWithImages = await Promise.all(
        categories.map(async (cat) => {
          const imgRes = await fetch(getApiUrl(`/api/project/category/${cat.id}/images`));
          const images = await imgRes.json();
          return {
            ...cat,
            image: images[0]?.image || '',
          };
        })
      );
      this.categories = categoriesWithImages;
    },
    async openCategory(category) {
      this.selectedCategory = category;
      this.showModal = true;
      this.loadingCategoryImages = true;
      // Получаем все фото категории
      const res = await fetch(getApiUrl(`/api/project/category/${category.id}/images`));
      const images = await res.json();
      console.log('categoryImages:', images); // Добавил вывод в консоль
      this.categoryImages = images;
      this.loadingCategoryImages = false;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCategory = null;
      this.categoryImages = [];
    },
    openFullImage(src) {
      this.fullImageSrc = src;
    },
    closeFullImage() {
      this.fullImageSrc = null;
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.portfolio-section {
  padding: 40px 20px;
  max-width: 1360px;
  margin: 0 auto;
  margin-top: 100px;
}

.portfolio-title {
  text-align: center;
  font-size: 32px;
  color: #00aaff;
  margin-bottom: 40px;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.portfolio-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.portfolio-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(60%);
  transition: filter 0.3s ease;
}

.portfolio-item:hover img {
  filter: brightness(80%);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: 600;
  pointer-events: none;
}

/* Модалка */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 32px 24px;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}
.modal-close {
  margin-top: 24px;
  background: #00aaff;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
}
.modal-projects {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  flex-wrap: nowrap;
  width: 100%;
  min-width: 0;
  min-width: 300px;
}
.modal-project-item {
  flex: 0 0 auto;
  text-align: center;
}
.project-preview {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  cursor: pointer;
  transition: transform 0.2s;
}
.project-preview:hover {
  transform: scale(1.04);
}

/* Оверлей для полноразмерного фото */
.full-image-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.85);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.full-image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.25);
  cursor: pointer;
}

@media (max-width: 900px) {
  .portfolio-section {
    padding: 24px 4px;
    margin-top: 40px;
  }
  .portfolio-title {
    font-size: 22px;
  }
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .overlay {
    font-size: 18px;
  }
}
@media (max-width: 480px) {
  .portfolio-section {
    padding: 12px 2px;
  }
  .portfolio-title {
    font-size: 16px;
  }
  .overlay {
    font-size: 13px;
  }
}
@media (max-width: 375px) {
  .portfolio-title {
    font-size: 12px;
  }
  .overlay {
    font-size: 10px;
  }
}
</style>
