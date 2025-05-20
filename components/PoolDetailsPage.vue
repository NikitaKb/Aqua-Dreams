<template>
  <section class="pool-details-page">
    <div class="container">
      <div class="pool-main-block">
        <div class="pool-image-block">
          <div class="pool-slider">
            <img :src="currentImage" :alt="poolData.name" class="pool-main-image" />
            <button v-if="poolData.images && poolData.images.length > 1" class="slider-arrow left" @click="prevImage">&#60;</button>
            <button v-if="poolData.images && poolData.images.length > 1" class="slider-arrow right" @click="nextImage">&#62;</button>
          </div>
        </div>
        <div class="pool-info-block">
          <h1 class="pool-title">{{ poolData.name }}</h1>
          <p class="pool-description">{{ poolData.description_short }}</p>
          <button class="pool-consult-btn" @click="showModal = true">Бесплатная консультация</button>
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

    <!-- Модальное окно консультации -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <button class="modal-close" @click="showModal = false">&times;</button>
        <h2 class="modal-title">Получить бесплатную консультацию</h2>
        <form class="modal-form" @submit.prevent="submitConsultation">
          <input v-model="form.firstName" type="text" placeholder="Имя" required class="modal-input" />
          <input v-model="form.lastName" type="text" placeholder="Фамилия" required class="modal-input" />
          <input v-model="form.phone" type="tel" placeholder="Телефон" required class="modal-input" />
          <button type="submit" class="modal-submit">Получить консультацию</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue';
import { defineProps } from 'vue';

interface Advantage {
  title: string;
  text: string;
}

interface PoolData {
  id: number;
  name: string;
  description_short: string;
  description: string | null;
  slug: string;
  images?: string[];
  advantages?: Advantage[];
}

const props = defineProps<{ type: string }>();

const poolData = ref<PoolData>({
  id: 0,
  name: '',
  description_short: '',
  description: '',
  slug: '',
  images: ['/images/b-pools.png'],
  advantages: []
});

const currentIndex = ref(0);
const currentImage = computed(() => {
  const images = poolData.value.images || ['/images/b-pools.png'];
  return images[currentIndex.value] || '/images/b-pools.png';
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

const showModal = ref(false);
const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
});

async function fetchPoolData() {
  try {
    console.log('Fetching pool data for type:', props.type);
    const response = await fetch(`http://127.0.0.1:8000/api/pools/${props.type}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pool data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Received data from API:', data);
    
    poolData.value = {
      ...data,
      images: data.images || ['/images/b-pools.png'],
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
      slug: props.type,
      images: ['/images/b-pools.png'],
      advantages: []
    };
  }
}

function submitConsultation() {
  console.log('Была нажата кнопка: Бесплатная консультация');
  console.log('Данные пользователя:', {
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
  });
  showModal.value = false;
  form.firstName = '';
  form.lastName = '';
  form.phone = '';
}

onMounted(() => {
  fetchPoolData();
});
</script>

<style scoped>
.pool-details-page {
  background: #fff;
  min-height: 100vh;
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
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 28px;
  color: #23A3FF;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;
}

.slider-arrow.left {
  left: 16px;
}

.slider-arrow.right {
  right: 16px;
}

.slider-arrow:hover {
  background: #23A3FF;
  color: #fff;
}

.pool-info-block {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
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
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }
  .pool-info-block {
    margin-top: 0;
    align-items: center;
  }
  .pool-title {
    font-size: 28px;
    text-align: center;
  }
  .pool-description {
    text-align: center;
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
    aspect-ratio: 760 / 490;
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
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 40px 32px 32px 32px;
  min-width: 320px;
  max-width: 95vw;
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-close {
  position: absolute;
  top: 18px;
  right: 22px;
  background: none;
  border: none;
  font-size: 32px;
  color: #23A3FF;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #1e8edf;
}
.modal-title {
  color: #23A3FF;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 28px;
  text-align: center;
}
.modal-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.modal-input {
  padding: 14px 18px;
  border-radius: 10px;
  border: 1.5px solid #23A3FF;
  font-size: 16px;
  outline: none;
  transition: border 0.2s;
}
.modal-input:focus {
  border-color: #1e8edf;
}
.modal-submit {
  background: #23A3FF;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 18px 0;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}
.modal-submit:hover {
  background: #1e8edf;
}
</style> 