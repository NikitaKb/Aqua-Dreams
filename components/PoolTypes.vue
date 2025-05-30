<template>
  <section class="pool-types">
    <div class="container">
      <h2 class="section-title">Виды бассейнов</h2>
      <p class="section-subtitle">Ваш уголок отдыха и гармонии прямо у дома.</p>
      
      <div class="pool-cards">
        <div class="pool-card" v-for="pool in pools" :key="pool.id">
          <img :src="pool.main_image_url" :alt="pool.name" class="pool-image">
          <div class="pool-content">
            <h3 class="pool-title">{{ pool.name }}</h3>
            <p class="pool-description">
              <template v-if="isMobile">{{ getShortDescription(pool.description_short) }}</template>
              <template v-else>{{ pool.description_short }}</template>

            </p>
            <NuxtLink :to="`/pools/${pool.slug}`" class="pool-button">Подробнее</NuxtLink>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getApiUrl } from '~/config/api';

const pools = ref([]);
const isMobile = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth <= 425;
}

onMounted(async () => {
  const res = await fetch(getApiUrl('/api/pools/'));
  pools.value = await res.json();
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

function getShortDescription(desc) {
  if (!desc) return '';
  const idx = desc.indexOf('.')
  return idx !== -1 ? desc.slice(0, idx + 1) : desc;
}
</script>

<style scoped>
.pool-types {
  background: #fff;
  padding-top: 86px;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  color: #23A3FF;
  font-size: 36px;
  text-align: center;
  margin-bottom: 10px;
}

.section-subtitle {
  text-align: center;
  color: #333;
  font-size: 18px;
  margin-bottom: 60px;
}

.pool-cards {
  display: flex;
  flex-direction: column;
  gap: 86px;
}

.pool-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 525px;
  background: #000;
  width: 100%;
}

.pool-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.pool-content {
  position: relative;
  z-index: 1;
  padding: 40px;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pool-title {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #23A3FF;
}

.pool-description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 600px;
}

.pool-button {
  display: inline-block;
  background: transparent;
  color: #23A3FF;
  border: 1.5px solid #23A3FF;
  padding: 12px 30px;
  border-radius: 100px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.pool-button:hover {
  background: #23A3FF;
  color: #fff;
  border-color: #23A3FF;
}

@media (max-width: 1024px) {
  .pool-types {
    padding: 80px 0;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .section-subtitle {
    font-size: 16px;
    margin-bottom: 40px;
  }

  .pool-cards {
    gap: 16px;
  }

  .pool-card {
    height: 380px;
  }

  .pool-content {
    padding: 20px;
  }

  .pool-title {
    font-size: 24px;
  }

  .pool-description {
    font-size: 13px;
  }

  .pool-button {
    font-size: 12px;
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  .pool-types {
    padding: 60px 0;
  }

  .pool-card {
    height: 300px;
  }

  .pool-content {
    padding: 20px;
  }

  .pool-title {
    font-size: 24px;
  }

  .pool-description {
    font-size: 12px;
  }

  .pool-button {
    padding: 8px 16px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .pool-types {
    padding: 40px 0;
  }

  .section-title {
    font-size: 24px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .pool-card {
    height: 250px;
  }

  .pool-content {
    padding: 15px;
  }

  .pool-title {
    font-size: 20px;
  }

  .pool-description {
    font-size: 11px;
  }
}

@media (max-width: 375px) {
  .pool-card {
    flex-direction: column;
    align-items: center;
    display: flex;
  }
  .pool-button {
    align-self: center;
    margin-top: 12px;
  }
}
</style> 