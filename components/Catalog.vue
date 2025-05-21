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
    <div class="catalog-grid">
      <div v-for="item in items" :key="item.id" class="catalog-card">
        <div class="catalog-card-img-wrap">
          <img :src="getCurrentImage(item)" alt="" class="catalog-card-img" />
        </div>
        <div class="catalog-card-divider"></div>
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
  data() {
    return {
      categories: [],
      categoryName: '',
      items: [],
      loading: true,
      error: null,
      sliderIndexes: {},
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      try {
        const res = await fetch('http://127.0.0.1:8000/api/catalog/');
        if (!res.ok) throw new Error('Ошибка загрузки категорий');
        const data = await res.json();
        this.categories = data;
        if (data.length > 0) {
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
        const res = await fetch(`http://127.0.0.1:8000/api/catalog/${this.categoryName}/`);
        if (!res.ok) throw new Error('Ошибка загрузки категории');
        const data = await res.json();
        this.items = data.products;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    selectCategory(slug) {
      this.categoryName = slug;
      this.fetchCategory();
    },
    getImages(item) {
      return [item.image, item.image_second].filter(Boolean);
    },
    getCurrentImage(item) {
      const images = this.getImages(item);
      const idx = this.sliderIndexes[item.id] || 0;
      return images[idx] || images[0];
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
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
}
.catalog-card {
  width: 340px;
  height: 480px;
  background: #fff;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 24px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}
.catalog-card-img-wrap {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.catalog-card-img {
  max-width: 100%;
  max-height: 180px;
  object-fit: contain;
}
.catalog-card-divider {
  width: 100%;
  height: 1px;
  background: #E5E5E5;
  margin-bottom: 16px;
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
  border-radius: 100px;
  padding: 10px 0;
  width: 160px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-top: 12px;
}
.catalog-card-btn:hover {
  background: #23A3FF;
  color: #fff;
}

/* Планшет: 2-3 карточки в ряд, меньше размер */
@media (max-width: 1200px) {
  .catalog-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
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
    gap: 16px;
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
    max-height: 110px;
  }
}
@media (max-width: 600px) {
  .catalog-grid {
    grid-template-columns: 1fr;
    gap: 12px;
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
    max-height: 90px;
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
    width: 100%;
    height: auto;
    min-height: 180px;
    padding: 8px 2px 8px 2px;
  }
  .catalog-card-img-wrap {
    height: 60px;
  }
  .catalog-card-img {
    max-height: 60px;
  }
  .catalog-card-btn {
    width: 100%;
    font-size: 14px;
    padding: 8px 0;
  }
}
</style> 