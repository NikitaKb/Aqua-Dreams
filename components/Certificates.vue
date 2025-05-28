<template>
  <section class="certificates-section">
    <h3 class="section-title blue">Сертификаты</h3>
    <div class="carousel-wrapper">
      <button class="nav-btn prev" @click="prevSlide" v-show="!showAllCertificates && windowWidth > 768">&lt;</button>
      <div class="certificates" ref="certificatesContainer">
        <template v-if="itemsPerSlide === 1">
          <div class="certificate-item">
            <img src="/public/images/sertifikat.png" alt="Сертификат {{ currentIndex + 1 }}" />
          </div>
        </template>
        <template v-else-if="itemsPerSlide === 2">
          <div class="certificate-item" v-for="n in [currentIndex + 1, currentIndex + 2]" :key="n">
            <img v-if="n <= totalItems" src="/public/images/sertifikat.png" :alt="`Сертификат ${n}`" />
          </div>
        </template>
        <template v-else>
          <div class="certificate-item" v-for="n in totalItems" :key="n">
            <img src="/public/images/sertifikat.png" :alt="`Сертификат ${n}`" />
          </div>
        </template>
      </div>
      <button class="nav-btn next" @click="nextSlide" v-show="!showAllCertificates && windowWidth > 768">&gt;</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const certificatesContainer = ref(null);
const currentIndex = ref(0);
const itemsPerSlide = ref(4); // Default to showing all 4 certificates
const windowWidth = ref(1024); // Initialize with a default value
const totalItems = 4; // Total number of certificates

// For swipe functionality
let startX = 0;
let isDragging = false;

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const updateItemsPerSlide = () => {
  const width = windowWidth.value;
  if (width <= 480) {
    itemsPerSlide.value = 1;
  } else if (width <= 900) {
    itemsPerSlide.value = 2;
  } else if (width <= 1200) {
    itemsPerSlide.value = 3;
  } else {
    itemsPerSlide.value = 4;
  }
};

const showAllCertificates = computed(() => itemsPerSlide.value >= totalItems);

const nextSlide = () => {
  const maxIndex = totalItems - itemsPerSlide.value;
  if (maxIndex < 0) return;
  if (currentIndex.value < maxIndex) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
  updateCarousel();
};

const prevSlide = () => {
  const maxIndex = totalItems - itemsPerSlide.value;
  if (maxIndex < 0) return;
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = maxIndex;
  }
  updateCarousel();
};

const updateCarousel = () => {
  if (certificatesContainer.value && !showAllCertificates.value) {
    if (itemsPerSlide.value === 1 || itemsPerSlide.value === 2) {
      certificatesContainer.value.style.transform = '';
    } else {
      const item = certificatesContainer.value.querySelector('.certificate-item');
      const itemWidth = item.offsetWidth;
      const containerWidth = certificatesContainer.value.offsetWidth;
      let visible = itemsPerSlide.value;
      let offset = -currentIndex.value * itemWidth + (containerWidth - visible * itemWidth) / 2;
      certificatesContainer.value.style.transform = `translateX(${offset}px)`;
    }
  } else if (certificatesContainer.value && showAllCertificates.value) {
    certificatesContainer.value.style.transform = `translateX(0px)`;
  }
};

// Swipe Handlers (мобильная логика)
const touchStart = (event) => {
  if (windowWidth.value > 900) return; // Только на мобильных/планшетах
  isDragging = true;
  startX = event.touches[0].clientX;
};

const touchEnd = (event) => {
  if (!isDragging) return;
  isDragging = false;
  const endX = event.changedTouches[0].clientX;
  const deltaX = endX - startX;
  if (deltaX < -50) {
    nextSlide();
  } else if (deltaX > 50) {
    prevSlide();
  }
};

onMounted(() => {
  updateWindowWidth();
  updateItemsPerSlide();
  updateCarousel();
  window.addEventListener('resize', () => {
    updateWindowWidth();
    updateItemsPerSlide();
    updateCarousel();
  });
  if (certificatesContainer.value) {
    certificatesContainer.value.addEventListener('touchstart', touchStart);
    certificatesContainer.value.addEventListener('touchend', touchEnd);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    updateWindowWidth();
    updateItemsPerSlide();
    updateCarousel();
  });
  if (certificatesContainer.value) {
    certificatesContainer.value.removeEventListener('touchstart', touchStart);
    certificatesContainer.value.removeEventListener('touchend', touchEnd);
  }
});
</script>

<style scoped>
.certificates-section{
  text-align: center;
  overflow: hidden;
}
.section-title {
  text-align: center;
  font-size: 42px;
  margin-bottom: 70px;
}
.section-title.blue {
  color: #00aaff;
  font-size: 45px;
}
@media (max-width: 1440px) {
  .section-title.blue {
    font-size: 40px;
  }
}
@media (max-width: 1024px) {
  .section-title.blue {
    font-size: 40px;
  }
}
@media (max-width: 768px) {
  .section-title.blue {
    font-size: 28px;
  }
}
@media (max-width: 430px) {
  .section-title.blue {
    font-size: 20px;
  }
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}

.certificates {
  display: flex;
  justify-content: flex-start; /* Align to start for carousel */
  align-items: center;
  gap: 40px;
  transition: transform 0.3s ease;
  width: 100%;
  cursor: grab; /* Indicate draggable area */
}

 .certificates.dragging {
  cursor: grabbing;
}

.certificate-item {
  flex: 0 0 calc(100% / 4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}

.certificates img {
  width: 267px;
  height: 370px;
  object-fit: contain;
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
  opacity: 0; /* Hidden by default */
  transition: opacity 0.3s ease;
}

.carousel-wrapper:hover .nav-btn {
  opacity: 1; /* Show on hover */
}

/* Always hide buttons on screens <= 768px */
@media (max-width: 768px) {
  .nav-btn {
    display: none;
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

/* Responsive styles */
/* Show 4 certificates on screens wider than 1024px */
 @media (min-width: 1025px) {
     .carousel-wrapper {
       overflow: visible;
     }
     .certificates {
       flex-wrap: wrap; /* Allow wrapping */
       justify-content: center; /* Center items when wrapped */
       width: auto;
       transform: none !important; /* Disable transform for carousel */
       transition: none !important; /* Disable transition for carousel */
       gap: 40px; /* Keep the gap */
       cursor: default; /* No grabbing cursor */
     }
     .certificate-item {
       flex: 0 0 auto; /* Allow items to take their natural width */
       padding: 0;
     }
      .certificates img {
        max-width: 250px; /* Increased size for readability */
      }
 }

@media (max-width: 1200px) {
  .certificate-item {
    flex: 0 0 calc(100% / 3);
  }
}

@media (max-width: 900px) {
  .section-title {
    margin-bottom: 30px;
  }
  .certificates {
    gap: 16px;
  }
  .certificate-item {
    flex: 0 0 calc(100% / 2);
  }
}

@media (max-width: 768px) {
  /* The display: none for nav-btn is handled above */
  .certificate-item {
    flex: 0 0 calc(100% / 2); /* Show 2 items on touch devices */
  }
}

@media (max-width: 480px) {
  .certificates-section {
    margin-top: 40px;
  }
  .section-title {
    margin-bottom: 16px;
  }
  .certificate-item {
    flex: 0 0 100%;
  }
}

@media (max-width: 375px) {
  .section-title {
    font-size: 12px;
  }
  .section-title.blue {
    font-size: 20px;
  }
  .certificates img {
    width: 267px;
    height: 370px;
    object-fit: contain;
  }
  .certificate-item {
    flex: 0 0 100%;
  }
}

.carousel-wrapper .nav-btn {
  display: block;
}

@media (max-width: 900px) {
  .carousel-wrapper .nav-btn {
    display: none;
  }
}
</style>

 