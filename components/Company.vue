<template>
  <div class="partners-container">
    <h2 class="partners-title">
      НАШИ <span class="highlight">ПАРТНЕРЫ</span>
    </h2>
    <div class="carousel-wrapper">
      <button class="nav-btn prev" @click="prevSlide" v-show="!showAllLogos && windowWidth > 768">&lt;</button>
      <div class="partners-logos" ref="logosContainer">
        <div class="logo-item">
          <img src="/public/images/sj.png" alt="San Juan" />
        </div>
        <div class="logo-item">
          <img src="/public/images/ps.png" alt="Poolsar" />
        </div>
        <div class="logo-item">
          <img src="/public/images/com.png" alt="Compass" />
        </div>
        <div class="logo-item">
          <img src="/public/images/fun.png" alt="Fun Group" />
        </div>
        <div class="logo-item">
          <img src="/public/images/comp.png" alt="Composit" />
        </div>
        <div class="logo-item">
          <img src="/public/images/cedr.png" alt="Кедр Пром" />
        </div>
        <div class="logo-item">
          <img src="/public/images/gran.png" alt="Grandis" />
        </div>
      </div>
      <button class="nav-btn next" @click="nextSlide" v-show="!showAllLogos && windowWidth > 768">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const logosContainer = ref(null);
const currentIndex = ref(0);
const itemsPerSlide = ref(7);
const windowWidth = ref(1024); // Initialize with a default value

// For swipe functionality
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let animationFrameId = null;

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const updateItemsPerSlide = () => {
  const width = windowWidth.value;
  console.log('updateItemsPerSlide - windowWidth:', width);
  if (width > 1024) {
    itemsPerSlide.value = 7; // Show all 7 items on screens wider than 1024px
  } else if (width <= 375) {
    itemsPerSlide.value = 3;
  } else if (width <= 480) {
    itemsPerSlide.value = 3;
  } else if (width <= 768) {
    itemsPerSlide.value = 4;
  } else if (width <= 900) {
    itemsPerSlide.value = 4;
  } else if (width <= 1024) {
    itemsPerSlide.value = 5;
  }
  console.log('updateItemsPerSlide - itemsPerSlide:', itemsPerSlide.value);
};

const showAllLogos = computed(() => itemsPerSlide.value === 7);

const nextSlide = () => {
  if (logosContainer.value) {
    const totalItems = 7;
    const maxIndex = totalItems - itemsPerSlide.value;
    if (maxIndex < 0) return; // Prevent sliding if all items are visible
    currentIndex.value = (currentIndex.value + 1) % (maxIndex + 1);
    updateCarousel();
  }
};

const prevSlide = () => {
  if (logosContainer.value) {
    const totalItems = 7;
    const maxIndex = totalItems - itemsPerSlide.value;
     if (maxIndex < 0) return; // Prevent sliding if all items are visible
    currentIndex.value = (currentIndex.value - 1 + maxIndex + 1) % (maxIndex + 1);
    updateCarousel();
  }
};

const updateCarousel = () => {
  console.log('updateCarousel - itemsPerSlide:', itemsPerSlide.value);
  if (logosContainer.value && !showAllLogos.value) {
    const itemWidth = logosContainer.value.querySelector('.logo-item').offsetWidth;
    const offset = -currentIndex.value * itemWidth;
    currentTranslate = offset; // Update currentTranslate for swipe
    setSliderPosition();
  } else if (logosContainer.value && showAllLogos.value) {
     currentTranslate = 0; // Reset for non-carousel view
     setSliderPosition();
  }
};

const setSliderPosition = () => {
   if (logosContainer.value) {
    logosContainer.value.style.transform = `translateX(${currentTranslate}px)`;
   }
};

const animation = () => {
  if (isDragging) {
    setSliderPosition();
    animationFrameId = requestAnimationFrame(animation);
  }
};

// Swipe Handlers
const touchStart = (event) => {
  if (showAllLogos.value || windowWidth.value > 768) return; // Only swipe on smaller screens
  isDragging = true;
  startX = event.touches[0].clientX;
  logosContainer.value.style.transition = 'none'; // Disable smooth transition while dragging
  animationFrameId = requestAnimationFrame(animation);
};

const touchMove = (event) => {
  if (!isDragging) return;
  const currentX = event.touches[0].clientX;
  const moveDistance = startX - currentX;
  currentTranslate = prevTranslate - moveDistance;

  // Optional: Add boundaries to prevent excessive swiping
  const containerWidth = logosContainer.value.offsetWidth;
  const contentWidth = logosContainer.value.scrollWidth;
  const maxTranslate = 0;
  const minTranslate = containerWidth - contentWidth;

  if (currentTranslate > maxTranslate) {
    currentTranslate = maxTranslate; // Clamp at left boundary
  } else if (currentTranslate < minTranslate) {
     currentTranslate = minTranslate; // Clamp at right boundary
  }
};

const touchEnd = () => {
  if (!isDragging) return;
  cancelAnimationFrame(animationFrameId);
  isDragging = false;
  logosContainer.value.style.transition = 'transform 0.3s ease'; // Re-enable smooth transition

  const movedBy = currentTranslate - prevTranslate;

  // Determine swipe direction and trigger slide change
  if (movedBy < -50) { // Swiped left (next)
    nextSlide();
  } else if (movedBy > 50) { // Swiped right (prev)
    prevSlide();
  } else {
    // If swipe wasn't enough, snap back to the current item
    updateCarousel();
  }
  prevTranslate = currentTranslate; // Save final position
};

onMounted(() => {
  updateWindowWidth();
  updateItemsPerSlide();
  updateCarousel(); // Initial carousel position

  // Add resize listener
  window.addEventListener('resize', () => {
    updateWindowWidth();
    updateItemsPerSlide();
    updateCarousel();
  });

  // Add touch listeners
  if (logosContainer.value) {
    logosContainer.value.addEventListener('touchstart', touchStart);
    logosContainer.value.addEventListener('touchmove', touchMove);
    logosContainer.value.addEventListener('touchend', touchEnd);
  }
});

onUnmounted(() => {
  // Remove resize listener
  window.removeEventListener('resize', () => {
    updateWindowWidth();
    updateItemsPerSlide();
    updateCarousel();
  });

  // Remove touch listeners
  if (logosContainer.value) {
    logosContainer.value.removeEventListener('touchstart', touchStart);
    logosContainer.value.removeEventListener('touchmove', touchMove);
    logosContainer.value.removeEventListener('touchend', touchEnd);
  }
});
</script>

<style scoped>
.partners-container {
  text-align: center;
  padding: 40px 20px;
  overflow: hidden;
}

.partners-title {
  font-size: 45px;
  margin-bottom: 30px;
}

.partners-title .highlight {
  color: #00aaff;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.partners-logos {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  transition: transform 0.3s ease;
  width: 100%;
  cursor: grab; /* Indicate draggable area */
}

.partners-logos.dragging {
  cursor: grabbing;
}

.logo-item {
  flex: 0 0 calc(100% / 3); /* Default for larger screens */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}

/* Styles for showing all logos on wider screens */
@media (min-width: 1025px) {
  .carousel-wrapper {
    overflow: visible;
  }
  .partners-logos {
    flex-wrap: wrap; /* Allow wrapping */
    justify-content: center; /* Center items when wrapped */
    width: auto;
    transform: none !important; /* Disable transform for carousel */
    transition: none !important; /* Disable transition for carousel */
    gap: 40px; /* Keep the gap */
    cursor: default; /* No grabbing cursor */
  }
  .logo-item {
    flex: 0 0 auto; /* Allow items to take their natural width */
    padding: 0;
  }
  .nav-btn {
    display: none; /* Hide navigation buttons */
  }
}


.partners-logos img {
  max-height: 60px;
  max-width: 160px;
  width: auto;
  height: auto;
  /* Prevent image dragging conflicts */
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #00aaff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel-wrapper:hover .nav-btn {
  opacity: 1;
}

/* Always hide buttons on screens <= 768px */
@media (max-width: 768px) {
  .nav-btn {
    display: none;
  }
  .logo-item {
    flex: 0 0 calc(100% / 4);
  }
  .partners-logos img {
    width: 175px;
    height: 51px;
    object-fit: contain;
  }
}

.nav-btn:hover {
  background: #0088cc;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media (max-width: 1024px) {
  .partners-title {
    font-size: 36px;
    margin-bottom: 40px;
  }
  .partners-logos {
    gap: 30px;
  }
  .partners-logos img {
    max-height: 50px;
    max-width: 130px;
  }
  .logo-item {
    flex: 0 0 calc(100% / 5);
  }
}

@media (max-width: 900px) {
  .partners-title {
    font-size: 28px;
  }
  .partners-logos {
    gap: 20px;
  }
  .partners-logos img {
    max-width: 100px;
    max-height: 40px;
  }
  .logo-item {
    flex: 0 0 calc(100% / 4);
  }
}

@media (max-width: 480px) {
  .partners-container {
    padding: 20px 4px;
  }
  .partners-title {
    font-size: 18px;
  }
  .partners-logos {
    gap: 10px;
  }
  .partners-logos img {
    max-width: 70px;
    max-height: 30px;
  }
  /* nav-btn size adjustment is still relevant if needed */
   .nav-btn {
     width: 30px;
     height: 30px;
     font-size: 16px;
   }
  .logo-item {
    flex: 0 0 calc(100% / 2);
  }
}

@media (max-width: 430px) {
  .logo-item {
    flex: 0 0 calc(100% / 3);
  }
  .logo-item img {
    width: 90px;
    height: 25px;
    object-fit: contain;
  }
  .partners-logos {
    gap: 0;
  }
  .partners-title {
    font-size: 20px;
  }
}

@media (max-width: 375px) {
  .partners-title {
    font-size: 20px;
  }
  .partners-logos img {
    width: 90px;
    height: 25px;
    object-fit: contain;
  }
  .logo-item {
    flex: 0 0 calc(100% / 3);
  }
  .logo-item img {
    object-fit: contain;
  }
  .partners-logos {
    gap: 0;
  }
}
</style>
