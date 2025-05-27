<template>
  <section class="certificates-section">
    <h3 class="section-title blue">Сертификаты</h3>
    <div class="carousel-wrapper">
      <button class="nav-btn prev" @click="prevSlide" v-show="!showAllCertificates && windowWidth > 768">&lt;</button>
      <div class="certificates" ref="certificatesContainer">
        <div class="certificate-item">
          <img src="/public/images/sertifikat.png" alt="Сертификат 1" />
        </div>
        <div class="certificate-item">
          <img src="/public/images/sertifikat.png" alt="Сертификат 2" />
        </div>
        <div class="certificate-item">
          <img src="/public/images/sertifikat.png" alt="Сертификат 3" />
        </div>
        <div class="certificate-item">
          <img src="/public/images/sertifikat.png" alt="Сертификат 4" />
        </div>
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
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let animationFrameId = null;

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const updateItemsPerSlide = () => {
  const width = windowWidth.value;
  if (width > 1024) { // Adjusted breakpoint to show all 4 on wider screens
     itemsPerSlide.value = 4; // Show all 4 on screens wider than 1024px
  } else if (width <= 375) {
    itemsPerSlide.value = 1;
  } else if (width <= 768) {
    itemsPerSlide.value = 2;
  } else if (width <= 1024) { // Between 769px and 1024px
    itemsPerSlide.value = 3;
  }
};

const showAllCertificates = computed(() => itemsPerSlide.value === totalItems);

const nextSlide = () => {
  if (certificatesContainer.value) {
    const maxIndex = totalItems - itemsPerSlide.value;
    if (maxIndex < 0) return; // Prevent sliding if all items are visible
    currentIndex.value = (currentIndex.value + 1) % (maxIndex + 1);
    updateCarousel();
  }
};

const prevSlide = () => {
  if (certificatesContainer.value) {
    const maxIndex = totalItems - itemsPerSlide.value;
     if (maxIndex < 0) return; // Prevent sliding if all items are visible
    currentIndex.value = (currentIndex.value - 1 + maxIndex + 1) % (maxIndex + 1);
    updateCarousel();
  }
};

const updateCarousel = () => {
  if (certificatesContainer.value && !showAllCertificates.value) {
    const itemWidth = certificatesContainer.value.querySelector('.certificate-item').offsetWidth;
    const offset = -currentIndex.value * itemWidth;
    currentTranslate = offset; // Update currentTranslate for swipe
    setSliderPosition();
  } else if (certificatesContainer.value && showAllCertificates.value) {
     currentTranslate = 0; // Reset for non-carousel view
     setSliderPosition();
  }
};

const setSliderPosition = () => {
   if (certificatesContainer.value) {
    certificatesContainer.value.style.transform = `translateX(${currentTranslate}px)`;
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
  if (showAllCertificates.value || windowWidth.value > 768) return; // Only swipe on smaller screens
  isDragging = true;
  startX = event.touches[0].clientX;
  certificatesContainer.value.style.transition = 'none'; // Disable smooth transition while dragging
  animationFrameId = requestAnimationFrame(animation);
};

const touchMove = (event) => {
  if (!isDragging) return;
  const currentX = event.touches[0].clientX;
  const moveDistance = startX - currentX;
  currentTranslate = prevTranslate - moveDistance;

  // Optional: Add boundaries to prevent excessive swiping
  const containerWidth = certificatesContainer.value.offsetWidth;
  const contentWidth = certificatesContainer.value.scrollWidth;
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
  certificatesContainer.value.style.transition = 'transform 0.3s ease'; // Re-enable smooth transition

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
  if (certificatesContainer.value) {
    certificatesContainer.value.addEventListener('touchstart', touchStart);
    certificatesContainer.value.addEventListener('touchmove', touchMove);
    certificatesContainer.value.addEventListener('touchend', touchEnd);
  }
  windowWidth.value = window.innerWidth; // Set actual window width after mount
});

onUnmounted(() => {
  // Remove resize listener
  window.removeEventListener('resize', () => {
    updateWindowWidth();
    updateItemsPerSlide();
    updateCarousel();
  });

  // Remove touch listeners
  if (certificatesContainer.value) {
    certificatesContainer.value.removeEventListener('touchstart', touchStart);
    certificatesContainer.value.removeEventListener('touchmove', touchMove);
    certificatesContainer.value.removeEventListener('touchend', touchEnd);
  }
});
</script>

<style scoped>
.certificates-section{
  margin-top: 100px;
  text-align: center;
  overflow: hidden; /* Added for carousel */
}
.section-title {
  text-align: center;
  font-size: 42px;
  margin-bottom: 70px;
}
.section-title.blue {
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
  flex: 0 0 calc(100% / 4); /* Default: show all 4 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px; /* Added padding for spacing */
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

@media (max-width: 1024px) {
   .section-title {
     font-size: 36px;
     margin-bottom: 40px;
   }
   .certificates {
     gap: 20px;
   }
   .certificates img {
    /* Adjusted max-width for 3 items */
   }
    .certificate-item {
      flex: 0 0 calc(100% / 3); /* Show 3 items */
    }
 }

@media (max-width: 900px) {
  .section-title {
    
    margin-bottom: 30px;
  }
  .certificates {
    gap: 16px;
  }
  .certificates img {


   .certificate-item {
      flex: 0 0 calc(100% / 2); /* Show 2 items */
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

   .nav-btn {
     width: 30px;
     height: 30px;
     font-size: 16px;
   }
  .certificate-item {
    flex: 0 0 100%; /* Show 1 item */
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
}

</style>

 