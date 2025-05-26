<template>
  <section class="our-projects">
    <div class="container">
      <h2 class="section-title">Наши проекты</h2>
      <div v-if="isLoading" class="loading">
        Загрузка проектов...
      </div>
      <div v-else class="slider-container">
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
      <!-- <div class="view-all">
        <button class="button-view-all">Смотреть все проекты</button>
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { API_CONFIG, getApiUrl } from '~/config/api'

const projects = ref([])
const isLoading = ref(true)
const currentSlide = ref(0)
const itemsPerSlide = ref(2) // Default for larger screens
const gap = ref(4.5) // 30px gap as percentage of container width (approx)

// Reference to the slider element
const slider = ref(null);

let intervalId = null;

// For swipe functionality
let startX = 0;
let currentTranslate = 0; // Will track the temporary translation during swipe
let isDragging = false;
let animationFrameId = null; // For requestAnimationFrame

function updateItemsPerSlide() {
  // Adjust breakpoint as needed. 750px is just an example.
  // This will show 1 item below 750px, and 2 items above.
  if (window.innerWidth < 750) {
    itemsPerSlide.value = 1;
    gap.value = 0; // Set gap to 0 for mobile
  } else {
    itemsPerSlide.value = 2;
    gap.value = 4.5; // Reset gap for larger screens
  }
   // Ensure currentSlide is within valid range after changing itemsPerSlide
  const maxSlide = Math.max(0, projects.value.length - itemsPerSlide.value);
  currentSlide.value = Math.min(currentSlide.value, maxSlide);
}

const fetchProjects = async () => {
  try {
    const response = await fetch(getApiUrl(API_CONFIG.API_ENDPOINTS.PROJECTS))
    const data = await response.json()
    projects.value = data.map(project => ({
      ...project,
      isFlipped: project.is_flipped || false,
      details: project.details.map(detail => detail.text)
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
  } finally {
    isLoading.value = false
  }
}

// Swipe Handlers
const touchStart = (event) => {
  console.log('touchStart', event);
  // Only enable swipe on screens <= 768px
  if (window.innerWidth > 768) return;

  isDragging = true;
  startX = event.touches[0].clientX;
  // Optional: Disable CSS transition during drag for smoother feel
  if (slider.value) {
    slider.value.style.transition = 'none';
  }
   // Initialize currentTranslate with the current position for smoother drag
   if (slider.value) {
      const transformMatrix = window.getComputedStyle(slider.value).getPropertyValue('transform');
      if (transformMatrix && transformMatrix !== 'none') {
         const matrix = transformMatrix.split('(')[1].split(')')[0].split(',');
         // Get the translateX value (usually the 5th value in the matrix)
         currentTranslate = parseFloat(matrix[4]);
      } else {
         currentTranslate = 0;
      }
   }
};

const touchMove = (event) => {
  console.log('touchMove', event);
  if (!isDragging) return;
  const currentX = event.touches[0].clientX;
  const moveDistance = startX - currentX; // How much finger has moved

  // Calculate new temporary translate position
  // This doesn't directly control the slide index yet, just the visual drag
  // This part might need adjustment based on how the current transform is applied
  // If transform is based on percentage like `translateX(${-currentSlide * 100}%)`,
  // we need to calculate the pixel equivalent of the percentage shift.
  // A simpler approach might be to calculate the new slide index based on the total drag distance
  // in touchEnd and only update currentSlide there.

  // For simplicity with the current transform logic, let's try updating the style directly during move.
  // This might conflict with the currentSlide * (100 + gap) transform.
  // Let's stick to updating slide index in touchEnd based on the total swipe distance.

  // Let's refine touchMove: don't update style here directly, just track total movement from start
  // This requires storing the initial position before dragging started, not just currentTranslate
  // Let's simplify and just use the delta to decide next/prev slide in touchEnd.
};

const touchEnd = () => {
  console.log('touchEnd');
  if (!isDragging) return;
  isDragging = false;
  // Re-enable CSS transition if it was disabled
  if (slider.value) {
     slider.value.style.transition = ''; // Reset to default or previous transition
  }

  const movedBy = event.changedTouches[0].clientX - startX; // Total horizontal movement

  // Determine swipe direction and trigger slide change
  // Adjust threshold as needed (e.g., 50 pixels)
  if (movedBy < -50) { // Swiped left (next)
    nextSlide();
  } else if (movedBy > 50) { // Swiped right (prev)
    prevSlide();
  }
  // If swipe wasn't enough, the slider stays at the currentSlide due to Vue's reactivity.
};

onMounted(() => {
  fetchProjects();
  updateItemsPerSlide(); // Set initial value

  // Add resize listener
  window.addEventListener('resize', updateItemsPerSlide);

  // Auto-slide interval for desktop
  intervalId = setInterval(nextSlide, 8000);

  // Add touch listeners for swipe on mobile
  console.log('onMounted - checking slider.value', slider.value);
  if (slider.value) {
    console.log('onMounted - slider.value is available, adding touch listeners');
    slider.value.addEventListener('touchstart', touchStart);
    // We need touchmove and touchend listeners on the document or a higher element
    // to handle cases where the touch moves outside the slider element.
    // However, for simplicity and to avoid potential conflicts, let's keep it on the slider for now.
    // If drag doesn't work well, we might need to move these listeners.
    slider.value.addEventListener('touchmove', touchMove);
    slider.value.addEventListener('touchend', touchEnd);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  window.removeEventListener('resize', updateItemsPerSlide); // Clean up resize listener

  // Remove touch listeners
  if (slider.value) {
    slider.value.removeEventListener('touchstart', touchStart);
    slider.value.removeEventListener('touchmove', touchMove);
    slider.value.removeEventListener('touchend', touchEnd);
  }
});

// Watch for slider ref to be available
watch(slider, (newValue) => {
  if (newValue) {
    console.log('slider ref is available, adding touch listeners');
    newValue.addEventListener('touchstart', touchStart);
    newValue.addEventListener('touchmove', touchMove);
    newValue.addEventListener('touchend', touchEnd);
  }
});

const visibleProjects = computed(() => {
  // The current transform logic handles showing part of adjacent slides
  // based on item width, gap, and container padding/margin.
  return projects.value
})

const flipCard = (index) => {
  projects.value.forEach((project, idx) => {
    if (idx !== index) {
      project.isFlipped = false
    }
  })
  projects.value[index].isFlipped = !projects.value[index].isFlipped
}

const nextSlide = () => {
  projects.value.forEach(project => {
    project.isFlipped = false
  })
  
  // Calculate the maximum slide index based on the number of items
  // and how many fit per view (itemsPerSlide.value).
  const maxSlide = projects.value.length - itemsPerSlide.value;

  if (currentSlide.value < maxSlide) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0; // Loop back to the beginning
  }
}

const prevSlide = () => {
  projects.value.forEach(project => {
    project.isFlipped = false
  })
  
   const maxSlide = projects.value.length - itemsPerSlide.value;

  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
     currentSlide.value = maxSlide; // Loop to the end
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
  width: calc(50% - 15px);
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

@media (max-width: 768px) {
  .nav-button {
    display: none;
  }

  /* Ensure touch interaction is possible */
   .projects-slider {
      cursor: grab; /* Indicate draggable area */
   }
    .projects-slider.dragging {
      cursor: grabbing;
   }
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
    width: calc(50% - 15px);
  }
}

@media (max-width: 1024px) {
  .project-card {
    min-width: calc(50% - 15px);
    height: 380px;
    width: calc(50% - 15px);
  }
}

@media (max-width: 750px) {
  .section-title {
    font-size: 36px;
  }

  .project-card {
    min-width: 100%;
    height: 400px;
    width: 100%;
  }

  .slider-container {
    margin: 0;
    margin-bottom: 30px;
  }

  .projects-slider {
    gap: 0;
  }

  .project-card {
    min-width: 100%;
    margin: 0;
  }

  .projects-slider,
  .project-card {
    transition: none !important;
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
    width: 25px;
    height: 25px;
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

/* Add specific styles for 375px if needed */
@media (max-width: 375px) {
  .project-card {
     /* Further adjustments for very small screens */
  }
  /* Adjust gap, padding, etc. */
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #23A3FF;
}
</style> 