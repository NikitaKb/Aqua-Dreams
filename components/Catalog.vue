<template>
  <section class="catalog-section">
    <div class="catalog-menu">
      <span
        v-for="cat in categories"
        :key="cat.slug"
        :class="['catalog-menu-item', { active: cat.slug === categoryName }]"
        @click="selectCategory(cat.slug)"
      >{{ cat.name }}</span>
    </div>
    <div class="filters-container">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="handleSearch"
          placeholder="Поиск по названию..."
          class="search-input"
        />
      </div>
      <div class="sort-container">
        <select v-model="sortOrder" @change="handleSort" class="sort-select">
          <option value="">Сортировка</option>
          <option value="popularity_desc">По популярности (убыв.)</option>
          <option value="popularity_asc">По популярности (возр.)</option>
          <option value="name_asc">По алфавиту (А-Я)</option>
          <option value="name_desc">По алфавиту (Я-А)</option>
        </select>
      </div>
    </div>
    <div class="catalog-grid">
      <div v-for="item in items" :key="item.id" class="catalog-card">
        <div class="catalog-card-img-wrap"
          @mousedown="startSwipe($event, item.id)"
          @mousemove="moveSwipe($event, item.id)"
          @mouseup="endSwipe($event, item.id)"
          @mouseleave="endSwipe($event, item.id)"
          @touchstart="startSwipe($event, item.id)"
          @touchmove="moveSwipe($event, item.id)"
          @touchend="endSwipe($event, item.id)"
          @mouseover="startHover(item.id)"
          @mouseout="endHover(item.id)"
        >
          <div class="catalog-slider">
            <img 
              :src="getCurrentImage(item)"
              :alt="item.name"
              class="catalog-card-img"
            />
          </div>
        </div>
        <div class="catalog-card-divider">
          <div class="slider-indicators">
            <span 
              :class="['indicator-line', { active: sliderIndexes[item.id] === 0 || !sliderIndexes[item.id] }]"
            ></span>
            <span 
              v-if="getImages(item).length > 1"
              :class="['indicator-line', { active: sliderIndexes[item.id] === 1 }]"
            ></span>
          </div>
        </div>
        <div class="catalog-card-name">{{ item.name }}</div>
        <router-link
          :to="`/catalog/${categoryName}/${item.slug}`"
          class="catalog-card-btn"
        >
          Подробнее
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Catalog',
  props: {
    categorySlug: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      categories: [],
      categoryName: '',
      items: [],
      loading: true,
      error: null,
      sliderIndexes: {},
      searchQuery: '',
      searchTimeout: null,
      sortOrder: '',
      swipeStartX: 0,
      swipeEndX: 0,
      isSwiping: false,
      currentSwipingItemId: null,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
      hoverTimers: {},
    };
  },
  mounted() {
    this.fetchCategories();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateWindowWidth);
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateWindowWidth);
    }
  },
  watch: {
    categorySlug: {
      immediate: true,
      handler(newSlug) {
        if (newSlug) {
          this.categoryName = newSlug;
          this.fetchCategory();
        }
      }
    }
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      try {
        const res = await fetch('http://127.0.0.1:8000/api/catalog/');
        if (!res.ok) throw new Error('Ошибка загрузки категорий');
        const data = await res.json();
        this.categories = data;
        if (!this.categorySlug && data.length > 0) {
          this.categoryName = data[0].slug;
          await this.fetchCategory();
        }
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchCategory() {
      this.loading = true;
      this.error = null;
      try {
        let url = `http://127.0.0.1:8000/api/catalog/${this.categoryName}/`;
        const params = new URLSearchParams();

        if (this.searchQuery) {
          params.append('search', this.searchQuery);
        }

        if (this.sortOrder) {
          switch (this.sortOrder) {
            case 'popularity_desc':
              params.append('ordering', '-popularity');
              break;
            case 'popularity_asc':
              params.append('ordering', 'popularity');
              break;
            case 'name_desc':
              params.append('ordering', '-name');
              break;
            case 'name_asc':
              params.append('ordering', 'name');
              break;
          }
        }

        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error('Ошибка загрузки категории');
        const data = await res.json();
        this.items = data.products;

        // Initialize sliderIndexes for each item
        this.sliderIndexes = {};
        this.items.forEach(item => {
          if (this.getImages(item).length > 1) {
            this.sliderIndexes[item.id] = 0;
          }
        });

      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.fetchCategory();
      }, 300);
    },
    handleSort() {
      this.fetchCategory();
    },
    selectCategory(slug) {
      this.categoryName = slug;
      this.searchQuery = '';
      this.sortOrder = '';
      this.fetchCategory();
    },
    getImages(item) {
      const BASE_URL = 'http://localhost:8000';
      const images = [];
      if (item.image) {
        images.push(item.image.startsWith('http') ? item.image : `${BASE_URL}${item.image}`);
      }
      if (item.image_second) {
        images.push(item.image_second.startsWith('http') ? item.image_second : `${BASE_URL}${item.image_second}`);
      }
      return images;
    },
    getCurrentImage(item) {
      const images = this.getImages(item);
      const currentIndex = this.sliderIndexes[item.id] || 0;
      return images[currentIndex] || images[0] || '';
    },
    nextImage(itemId) {
      const images = this.getImages(this.items.find(item => item.id === itemId));
      if (images.length <= 1) return;
      const currentIndex = this.sliderIndexes[itemId] || 0;
      const nextIndex = (currentIndex + 1) % images.length;
      this.sliderIndexes[itemId] = nextIndex;
    },
    prevImage(itemId) {
      const images = this.getImages(this.items.find(item => item.id === itemId));
      if (images.length <= 1) return;
      const currentIndex = this.sliderIndexes[itemId] || 0;
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      this.sliderIndexes[itemId] = prevIndex;
    },
    startSwipe(event, itemId) {
      if (this.windowWidth > 1024) return;
      if (this.hoverTimers[itemId]) {
        clearTimeout(this.hoverTimers[itemId]);
        delete this.hoverTimers[itemId];
      }
      if (event.type === 'mousedown') {
        event.preventDefault();
      }
      this.isSwiping = true;
      this.currentSwipingItemId = itemId;
      this.swipeStartX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
      this.swipeEndX = 0;
    },
    moveSwipe(event, itemId) {
      if (!this.isSwiping || this.currentSwipingItemId !== itemId) return;
      this.swipeEndX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    },
    endSwipe(event, itemId) {
      if (this.windowWidth > 1024) return;
      if (!this.isSwiping || this.currentSwipingItemId !== itemId) return;
      this.isSwiping = false;

      const swipeDistance = this.swipeEndX - this.swipeStartX;
      const minSwipeDistance = 30;

      if (this.hoverTimers[itemId]) {
        clearTimeout(this.hoverTimers[itemId]);
        delete this.hoverTimers[itemId];
      }

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance < 0) {
          this.nextImage(itemId);
        } else {
          this.prevImage(itemId);
        }
      } else {
        this.sliderIndexes[itemId] = 0;
      }

      this.swipeStartX = 0;
      this.swipeEndX = 0;
      this.currentSwipingItemId = null;
    },
    startHover(itemId) {
      if (this.windowWidth <= 1024) return;
      const item = this.items.find(item => item.id === itemId);
      if (!item || this.getImages(item).length <= 1 || this.isSwiping) return;
      
      if (this.hoverTimers[itemId]) {
        clearTimeout(this.hoverTimers[itemId]);
      }

      this.hoverTimers[itemId] = setTimeout(() => {
        if (!this.isSwiping && this.currentSwipingItemId !== itemId) {
          this.sliderIndexes[itemId] = 1;
        }
        delete this.hoverTimers[itemId];
      }, 300);
    },
    endHover(itemId) {
      if (this.hoverTimers[itemId]) {
        clearTimeout(this.hoverTimers[itemId]);
        delete this.hoverTimers[itemId];
      }

      if (this.currentSwipingItemId === itemId && this.isSwiping) return;
      const item = this.items.find(item => item.id === itemId);
      if (!item || this.getImages(item).length <= 1) return;
      this.sliderIndexes[itemId] = 0;
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>

<style scoped>
.catalog-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
}
.catalog-menu {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 32px;
  font-size: 18px;
}
.catalog-menu-item {
  color: #222;
  cursor: pointer;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border 0.2s;
}
.catalog-menu-item.active {
  color: #23A3FF;
  border-bottom: 2px solid #23A3FF;
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1400px;
  margin: 0 auto;
}
.catalog-card {
  width: 340px;
  height: 480px;
  background: #fff;
  border: 1px solid #E5E5E5;
  padding: 24px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  flex-shrink: 0;
}
.catalog-card-img-wrap {
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.catalog-slider {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.catalog-card-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: opacity 1s ease;
}
.catalog-card-divider {
  width: 100%;
  height: 1px;
  background: #E5E5E5;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}
.catalog-card-name {
  font-size: 16px;
  color: #222;
  text-align: center;
  margin-bottom: 16px;
  flex: 1 1 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.catalog-card-btn {
  border: 1px solid #23A3FF;
  background: #fff;
  color: #23A3FF;
  border-radius: 15px;
  padding: 10px 0;
  width: 160px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-top: 12px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.catalog-card-btn:hover {
  background: #23A3FF;
  color: #fff;
}

/* Планшет: 2-3 карточки в ряд, меньше размер */
@media (max-width: 1200px) {
  .catalog-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .catalog-card {
    width: 300px;
    height: 420px;
    padding: 20px 10px 20px 10px;
  }
  .catalog-card-img-wrap {
    height: 140px;
  }
  .catalog-card-img {
    max-height: 140px;
  }
}
@media (max-width: 900px) {
  .catalog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .catalog-card {
    width: 100%;
    height: 360px;
    padding: 16px 6px 16px 6px;
  }
  .catalog-card-img-wrap {
    height: 110px;
  }
  .catalog-card-img {
    
  }
}
@media (max-width: 600px) {
  .catalog-grid {
    grid-template-columns: 1fr;
  }
  .catalog-card {
    width: 100%;
    height: auto;
    min-height: 260px;
    padding: 12px 4px 12px 4px;
  }
  .catalog-card-img-wrap {
    height: 90px;
  }
  .catalog-card-img {
   
  }
}
@media (max-width: 480px) {
  .catalog-section {
    padding: 16px 2px;
  }
  .catalog-menu {
    gap: 12px;
    font-size: 14px;
    flex-wrap: wrap;
  }
  .catalog-card {
    min-width: 0;
    width: 100%;
    height: auto;
   
    padding: 8px 2px 8px 2px;
  }
  .catalog-card-img-wrap {
    height: 60px;
  }
  .catalog-card-img {
    
  }
  .catalog-card-btn {
    width: 100%;
    font-size: 14px;
    padding: 8px 0;
  }
}

@media (max-width: 430px) {
  .catalog-section {
    padding: 16px 2px;
  }
  .catalog-menu {
    gap: 12px;
    font-size: 14px;
    flex-wrap: wrap;
  }
  .catalog-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .catalog-card {
    min-width: 0;
    width: 355px;
    height: 374px;
    padding: 8px 2px 8px 2px;
  }
  .catalog-card-img-wrap {
    width: 307px;
    height: 190px;
    margin-bottom: 8px;
  }
  .catalog-slider {
    width: 307px;
    height: 190px;
  }
  .catalog-card-img {
    width: 307px;
    height: 190px;
    object-fit: contain;
  }
  .catalog-card-btn {
    width: 100%;
    font-size: 14px;
    padding: 8px 0;
  }
}

@media (max-width: 375px) {
  .catalog-section {
    padding: 16px 2px;
  }
  .catalog-menu {
    gap: 12px;
    font-size: 14px;
    flex-wrap: wrap;
  }
  .catalog-card {
    min-width: 0;
    width: 355px;
    height: 374px;
    padding: 8px 2px 8px 2px;
  }
  .catalog-card-img-wrap {
    width: 307px;
    height: 190px;
    margin-bottom: 8px;
  }
  .catalog-slider {
    width: 307px;
    height: 190px;
  }
  .catalog-card-img {
    width: 307px;
    height: 190px;
    object-fit: contain;
  }
  .catalog-card-btn {
    width: 100%;
    font-size: 14px;
    padding: 8px 0;
  }
}

.filters-container {
  display: flex;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto 40px;
  padding: 0 20px;
  align-items: center;
}

.search-container {
  flex: 1;
  margin: 0;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 16px 24px;
  padding-left: 70px;
  font-size: 16px;
  border: 1px solid #23A3FF;
  border-radius: 15px;
  outline: none;
  transition: all 0.3s ease;
  background: #fff;
}

.search-input:focus {
  box-shadow: 0 4px 15px rgba(35, 163, 255, 0.1);
}

.search-input::placeholder {
  color: #23A3FF;
  font-size: 15px;
}

.search-container::before {
  content: '';
  position: absolute;
  left: 35px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2323A3FF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.search-input:focus + .search-container::before {
  opacity: 1;
}

.sort-container {
  min-width: 200px;
}

.sort-select {
  width: 100%;
  padding: 16px 24px;
  font-size: 16px;
  border: 1px solid #23A3FF;
  border-radius: 15px;
  outline: none;
  transition: all 0.3s ease;
  background: #fff;
  color: #23A3FF;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2323A3FF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 16px;
}

.sort-select:focus {
  box-shadow: 0 4px 15px rgba(35, 163, 255, 0.1);
}

.sort-select option {
  color: #333;
  background: #fff;
}

@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    gap: 16px;
  }

  .sort-container {
    width: 100%;
  }

  .search-input {
    padding: 12px 20px;
    padding-left: 50px;
    font-size: 14px;
  }

  .search-container::before {
    left: 25px;
    width: 16px;
    height: 16px;
  }
}

.slider-indicators {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.indicator-line {
  width: calc(50% - 4px);
  height: 1px;
  background-color: #E5E5E5;
  border-radius: 0;
  transition: background-color 0.3s ease;
}

.indicator-line.active {
  background-color: #23A3FF;
}
</style> 