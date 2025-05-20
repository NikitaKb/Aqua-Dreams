<template>
  <section class="our-projects">
    <div class="container">
      <h2 class="section-title">Наши проекты</h2>
      <div class="slider-container">
        <button class="nav-button prev" @click="prevSlide">
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 11L12 20" stroke="white" stroke-width="3" stroke-linecap="square"/>
          </svg>
        </button>
        
        <div class="projects-slider" ref="slider">
          <div 
            class="project-card" 
            v-for="(project, index) in visibleProjects" 
            :key="index"
            :style="{ transform: `translateX(${-currentSlide * (100 + gap)}%)` }"
          >
            <div class="card-inner" :class="{ 'is-flipped': project.isFlipped }">
              <div class="card-front">
                <img :src="project.image" :alt="project.address" class="project-image" />
                <button class="info-button" @click.prevent="flipCard(index)">
                  <img src="/images/info.svg" alt="Информация" />
                </button>
                <div class="project-address">{{ project.address }}</div>
              </div>
              <div class="card-back">
                <div class="project-info">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>
                  <ul class="project-details">
                    <li v-for="(detail, idx) in project.details" :key="idx">
                      {{ detail }}
                    </li>
                  </ul>
                </div>
                <button class="close-button" @click.prevent="flipCard(index)">×</button>
              </div>
            </div>
          </div>
        </div>

        <button class="nav-button next" @click="nextSlide">
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 20L11 11L2 2" stroke="white" stroke-width="3" stroke-linecap="square"/>
          </svg>
        </button>
      </div>
      <div class="view-all">
        <button class="button-view-all">Смотреть все проекты</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const projects = ref([
  {
    image: '/images/project_1.png',
    address: 'г. Таганрог, ул. Святого Отца д. 46',
    title: 'Частный бассейн',
    description: 'Современный бассейн с системой фильтрации и подогрева воды',
    details: [
      'Размер: 8x4 метра',
      'Глубина: 1.8м',
      'Подогрев воды',
      'Система фильтрации',
      'Светодиодное освещение'
    ],
    isFlipped: false
  },
  {
    image: '/images/project_1.png',
    address: 'г. Таганрог, ул. Святого Отца д. 49',
    title: 'Спа-комплекс',
    description: 'Роскошный бассейн с джакузи и зоной отдыха',
    details: [
      'Размер бассейна: 10x5 метров',
      'Джакузи на 6 персон',
      'Система противотока',
      'Декоративное освещение',
      'Зона отдыха'
    ],
    isFlipped: false
  },
  {
    image: '/images/project_1.png',
    address: 'г. Таганрог, ул. Дзержинского д. 123',
    title: 'Открытый бассейн',
    description: 'Большой открытый бассейн для загородного дома',
    details: [
      'Размер: 12x6 метров',
      'Глубина: 2.2м',
      'Подогрев воды',
      'Система очистки',
      'Подсветка'
    ],
    isFlipped: false
  },
  {
    image: '/images/project_1.png',
    address: 'г. Таганрог, ул. Дзержинского д. 123',
    title: 'Открытый бассейн',
    description: 'Большой открытый бассейн для загородного дома',
    details: [
      'Размер: 12x6 метров',
      'Глубина: 2.2м',
      'Подогрев воды',
      'Система очистки',
      'Подсветка'
    ],
    isFlipped: false
  },
  {
    image: '/images/project_1.png',
    address: 'г. Таганрог, ул. Дзержинского д. 123',
    title: 'Открытый бассейн',
    description: 'Большой открытый бассейн для загородного дома',
    details: [
      'Размер: 12x6 метров',
      'Глубина: 2.2м',
      'Подогрев воды',
      'Система очистки',
      'Подсветка'
    ],
    isFlipped: false
  },
  {
    image: '/images/project_1.png',
    address: 'г. Таганрог, ул. Петровская д. 15',
    title: 'Крытый бассейн',
    description: 'Крытый бассейн с современной системой вентиляции',
    details: [
      'Размер: 15x4 метров',
      'Глубина: 1.6м',
      'Климат-контроль',
      'Очистка воды',
      'LED освещение'
    ],
    isFlipped: false
  }
])

const currentSlide = ref(0)
const itemsPerSlide = ref(2)
const gap = ref(4.5) // 30px gap as percentage of container width

const visibleProjects = computed(() => {
  return projects.value
})

const flipCard = (index) => {
  // Сначала закрываем все открытые карточки, кроме текущей
  projects.value.forEach((project, idx) => {
    if (idx !== index) {
      project.isFlipped = false
    }
  })
  // Затем переворачиваем текущую карточку
  projects.value[index].isFlipped = !projects.value[index].isFlipped
}

const nextSlide = () => {
  // Закрываем все открытые карточки перед сменой слайда
  projects.value.forEach(project => {
    project.isFlipped = false
  })
  
  if (currentSlide.value < Math.ceil(projects.value.length / itemsPerSlide.value) - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const prevSlide = () => {
  // Закрываем все открытые карточки перед сменой слайда
  projects.value.forEach(project => {
    project.isFlipped = false
  })
  
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = Math.ceil(projects.value.length / itemsPerSlide.value) - 1
  }
}
</script>

<style scoped>
.our-projects {
  padding: 80px 0;
  background: #fff;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 48px;
  color: #23A3FF;
  text-align: center;
  margin-bottom: 60px;
  font-weight: 500;
}

.slider-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  overflow: hidden;
}

.projects-slider {
  display: flex;
  gap: 30px;
  width: 100%;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card {
  min-width: calc(50% - 15px);
  height: 560px;
  perspective: 1000px;
  width: 660px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

.card-inner.is-flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  overflow: hidden;
 
}

.card-front {
  background: #fff;
  transform: rotateY(0deg);
}

.card-back {
  background: #fff;
  transform: rotateY(180deg);
  padding: 30px;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
}

.info-button:hover {
  transform: scale(1.1) rotate(180deg);
}

.info-button img {
  width: 50px;
  height: 50px;
}

.project-address {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: #fff;
  font-size: 16px;
}

.project-info {
  color: #333;
}

.project-info h3 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #23A3FF;
}

.project-info p {
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.project-details {
  list-style: none;
  padding: 0;
  font-size: 16px;
}

.project-details li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
}

.project-details li:before {
  content: "•";
  color: #23A3FF;
  position: absolute;
  left: 0;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: #23A3FF;
  color: white;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 0;
}

.nav-button.prev {
  left: 10px;
}

.nav-button.next {
  right: 10px;
}

.nav-button svg {
  width: 14px;
  height: 22px;
}

.view-all {
  text-align: center;
}

.button-view-all {
  background: transparent;
  border: 1px solid #23A3FF;
  color: #23A3FF;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-view-all:hover {
  background: #23A3FF;
  color: white;
}

@media (max-width: 1200px) {
  .project-card {
    min-width: calc(50% - 15px);
    height: 560px;
    width: 660px;
  }
}

@media (max-width: 1024px) {
  .project-card {
    min-width: 470px;
    height: 380px;
    width: 470px;
  }
}

@media (max-width: 749px) {
  .section-title {
    font-size: 36px;
  }

  .project-card {
    min-width: 100%;
    height: 400px;
    width: 100%;
  }

  .slider-container {
    margin: 0 -16px;
    margin-bottom: 30px;
  }

  .projects-slider {
    gap: 16px;
  }

  .project-card {
    min-width: calc(100% - 32px);
    margin: 0 16px;
  }
}

@media (max-width: 480px) {
  .our-projects {
    padding: 40px 0;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .project-card {
    height: 300px;
  }

  .project-address {
    font-size: 14px;
    padding: 12px;
  }

  .info-button {
    width: 32px;
    height: 32px;
    top: 12px;
    right: 12px;
  }

  .info-button img {
    width: 16px;
    height: 16px;
  }

  .project-info h3 {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .project-info p {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .project-details {
    font-size: 14px;
  }

  .project-details li {
    margin-bottom: 8px;
  }

  .close-button {
    font-size: 24px;
    top: 12px;
    right: 12px;
  }

  .button-view-all {
    font-size: 14px;
    padding: 12px 30px;
  }
}
</style> 