<template>
  <section class="pool-details-page" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <div class="container">
      <div class="pool-main-block">
        <div class="pool-image-block">
          <div class="pool-slider">
            <img :src="currentImage" :alt="poolData.name" class="pool-main-image" />
            <button v-if="poolData.images && poolData.images.length > 1 && !isMobile" class="slider-arrow left" @click="prevImage">&#60;</button>
            <button v-if="poolData.images && poolData.images.length > 1 && !isMobile" class="slider-arrow right" @click="nextImage">&#62;</button>
          </div>
          
        </div>
        <div class="slider-dots" v-if="poolData.images && poolData.images.length > 1 && isMobile">
            <span
              v-for="(image, index) in poolData.images"
              :key="index"
              class="dot"
              :class="{ active: index === currentIndex }"
              @click="goToImage(index)"
            ></span>
          </div>
        <div class="pool-info-block">
          <h3 class="pool-title">{{ poolData.name }}</h3>
          <p class="pool-description">{{ poolData.description_short }}</p>
          <button class="pool-consult-btn" @click="showConsultModal = true">Бесплатная консультация</button>
        </div>
      </div>
      <div class="pool-advantages-block" v-if="poolData.advantages && poolData.advantages.length > 0">
        <h2 class="advantages-title">Преимущества</h2>
        <div class="advantages-columns">
          <div class="advantages-col">
            <div class="advantage-item" v-for="(advantage, idx) in leftAdvantages" :key="advantage.title">
              <div class="advantage-number">{{ idx * 2 + 1 }}</div>
              <div>
                <div class="advantage-title">{{ advantage.title }}</div>
                <div class="advantage-text">{{ advantage.text }}</div>
              </div>
            </div>
          </div>
          <div class="advantages-col">
            <div class="advantage-item" v-for="(advantage, idx) in rightAdvantages" :key="advantage.title">
              <div class="advantage-number">{{ idx * 2 + 2 }}</div>
              <div>
                <div class="advantage-title">{{ advantage.title }}</div>
                <div class="advantage-text">{{ advantage.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConsultationModal
      :show="showConsultModal"
      :onClose="() => showConsultModal = false"
      :slug="poolData.slug"
      :name="poolData.name"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, watch, onBeforeUnmount } from 'vue';
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';
import ConsultationModal from './ConsultationModal.vue';
import { API_CONFIG, getApiUrl } from '~/config/api';

interface Advantage {
  title: string;
  text: string;
}

interface PoolImage {
  image_url: string;
}

interface PoolData {
  id: number;
  name: string;
  description_short: string;
  description: string | null;
  slug: string;
  images: PoolImage[];
  advantages?: Advantage[];
}

const props = defineProps<{ type: string }>();

const poolData = ref<PoolData>({
  id: 0,
  name: '',
  description_short: '',
  description: '',
  slug: '',
  images: [{ image_url: '/images/b-pools.png' }],
  advantages: []
});

const currentIndex = ref(0);

const currentImage = computed(() => {
  const images = poolData.value.images || [];
  if (images.length === 0) return '/images/b-pools.png';
  const imgObj = images[currentIndex.value];
  if (!imgObj || !imgObj.image_url) return '/images/b-pools.png';
  return imgObj.image_url.startsWith('http') ? imgObj.image_url : API_CONFIG.BASE_URL + imgObj.image_url;
});

const leftAdvantages = computed(() => {
  const advantages = poolData.value.advantages || [];
  return [advantages[0], advantages[2]];
});

const rightAdvantages = computed(() => {
  const advantages = poolData.value.advantages || [];
  return [advantages[1], advantages[3]];
});

function prevImage() {
  const images = poolData.value.images || ['/images/b-pools.png'];
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
}

function nextImage() {
  const images = poolData.value.images || ['/images/b-pools.png'];
  currentIndex.value = (currentIndex.value + 1) % images.length;
}

function goToImage(index: number) {
  currentIndex.value = index;
}

const showConsultModal = ref(false);

let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50; // pixels

function handleTouchStart(event: TouchEvent) {
  touchStartX = event.changedTouches[0].screenX;
}

function handleTouchMove(event: TouchEvent) {
  touchEndX = event.changedTouches[0].screenX;
}

function handleTouchEnd() {
  const distance = touchEndX - touchStartX;

  if (distance > minSwipeDistance) {
    // Swipe right
    prevImage();
  } else if (distance < -minSwipeDistance) {
    // Swipe left
    nextImage();
  }

  // Reset touch values
  touchStartX = 0;
  touchEndX = 0;
}

const route = useRoute();

const getType = (t: string | string[]) => Array.isArray(t) ? t[0] : t;

const isMobile = ref(false);

function checkMobile() {
  isMobile.value = window.innerWidth <= 768; // Using 768px breakpoint for mobile
}

onMounted(() => {
  fetchPoolData(getType(route.params.type));
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});

watch(() => route.params.type, (newType) => {
  fetchPoolData(getType(newType));
});

async function fetchPoolData(type: string) {
  try {
    console.log('Fetching pool data for type:', type);
    const response = await fetch(getApiUrl(`${API_CONFIG.API_ENDPOINTS.POOLS}/${type}/`));
    if (!response.ok) {
      throw new Error(`Failed to fetch pool data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Received data from API:', data);
    
    poolData.value = {
      ...data,
      images: data.images || [{ image_url: '/images/b-pools.png' }],
      advantages: data.advantages || []
    };
    console.log('Processed pool data:', poolData.value);
  } catch (error) {
    console.error('Error fetching pool data:', error);
    // Fallback data in case of error
    poolData.value = {
      id: 0,
      name: 'Бассейн',
      description_short: 'Информация о бассейне временно недоступна',
      description: null,
      slug: type,
      images: [{ image_url: '/images/b-pools.png' }],
      advantages: []
    };
  }
}

</script>

<style scoped>
.pool-details-page {
  background: #fff;
  
  padding: 40px 0 0 0;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.pool-main-block {
  display: flex;
  align-items: flex-start;
  gap: 60px;
}

.pool-image-block {
  flex: 1 1 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pool-slider {
  position: relative;
  width: 100%;
  max-width: 760px;
  aspect-ratio: 760 / 490;
  background: #eee;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pool-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  display: block;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 28px;
  color: white;
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;
}

.slider-arrow.left {
  left: 16px;
}

.slider-arrow.right {
  right: 16px;
}

.slider-arrow:hover {
  background: transparent;
  color: #fff;
}

.pool-info-block {
  flex: 1 1 40%;
  
  flex-direction: column;
  align-items: flex-start;
  
}

.pool-title {
  color: #23A3FF;
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 24px;
}

.pool-description {
  color: #222;
  font-size: 18px;
  margin-bottom: 32px;
  line-height: 1.5;
}

.pool-consult-btn {
  background: transparent;
  color: #23A3FF;
  border: 1.5px solid #23A3FF;
  border-radius: 12px;
  padding: 35px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.pool-consult-btn:hover {
  background: #23A3FF;
  color: #fff;
}

.pool-advantages-block {
  margin: 60px 0 0 0;
}

.advantages-title {
  text-align: center;
  font-size: 32px;
  color: #222;
  margin-bottom: 40px;
  font-weight: 500;
}

.advantages-columns {
  display: flex;
  gap: 60px;
  justify-content: center;
}

.advantages-col {
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1 1 50%;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.advantage-number {
  color: #23A3FF;
  font-size: 64px;
  font-weight: 600;
  line-height: 1;
  min-width: 60px;
}

.advantage-title {
  font-size: 20px;
  font-weight: 500;
  color: #222;
  margin-bottom: 8px;
}

.advantage-text {
  font-size: 15px;
  color: #444;
  line-height: 1.5;
}
@media (max-width: 1024px) {
  .pool-main-block {
    flex-direction: row;
    gap: 30px;
  }
  .pool-info-block {
    margin-top: 0;
  }
  .pool-title {
    font-size: 28px;
  }
  .pool-description {
   
  }
  .advantages-columns {
    flex-direction: column;
    gap: 30px;
  }
  .advantages-col {
    gap: 30px;
  }
  .advantage-number {
    font-size: 40px;
    min-width: 40px;
  }
  .pool-slider {
    max-width: 100%;
    aspect-ratio: 760 / 565;
   
  }
}
@media (max-width: 768px) {
  .pool-main-block {
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }
  .pool-image-block {
    width: 100%;
  }
  .pool-info-block {
    align-items: center;
  }
  .pool-title,
  .pool-description {
  }
  .pool-consult-btn {
    align-self: center;
  }
  .advantages-columns {
    flex-direction: column;
    gap: 30px;
  }
  .advantages-col {
    gap: 30px;
  }
  .advantage-number {
    font-size: 40px;
    min-width: 40px;
  }
  .slider-arrow {
    display: none;
  }

  .slider-dots {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .dot {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 4px;
    cursor: pointer;
  }

  .dot.active {
    background-color: #23A3FF;
  }
}
@media (max-width: 600px) {
  .pool-main-block {
    padding: 0 10px;
  }
  .pool-title {
    font-size: 20px;
  }
  .advantage-number {
    font-size: 28px;
    min-width: 28px;
  }
  .pool-slider {
    max-width: 100%;
    aspect-ratio: 760 / 490;
  }
  @media (max-width: 375px) {
  .pool-main-block {
    flex-direction: column;
    align-items: flex-start;
  }
  .pool-image-block {
    width: 100%;
  }
  .pool-info-block {
    align-items: flex-start;
  }
  .pool-consult-btn {
    align-self: flex-start;
    padding: 20px;
  }
  .pool-title{
    font-size: 20px;
  }
  .pool-description {
    font-size: 14px;
  }
}
}

</style> 