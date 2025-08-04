<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-content">
      <div class="logo-container">
        <img src="/images/logo_dark.svg" alt="AD Logo" class="loading-logo" />
      </div>
    
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean;
}

defineProps<Props>();
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
  backdrop-filter: blur(5px);
}

.loading-content {
  text-align: center;
  color: #333;
}

.logo-container {
  margin-bottom: 2rem;
}

.loading-logo {
  width: 120px;
  height: auto;
  animation: pulse 1.5s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.loading-text h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  animation: slideInUp 0.5s ease-out;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-text p {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  animation: slideInUp 0.5s ease-out 0.1s both;
  font-weight: 500;
}

.loading-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #23A3FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 10px rgba(35, 163, 255, 0.3);
}

.spinner-ring:nth-child(1) {
  animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  border-top-color: #1e3c72;
  animation-delay: 0.4s;
}

.spinner-ring:nth-child(3) {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  border-top-color: #2a5298;
  animation-delay: 0.8s;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 1; 
    filter: brightness(1);
  }
  50% { 
    transform: scale(1.08); 
    opacity: 0.9; 
    filter: brightness(1.1);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Медиа-запросы для адаптивности */
@media (max-width: 768px) {
  .loading-logo {
    width: 80px;
  }
  
  .loading-text h2 {
    font-size: 1.5rem;
  }
  
  .loading-text p {
    font-size: 1rem;
  }
  
  .loading-spinner {
    width: 60px;
    height: 60px;
  }
  
  .spinner-ring:nth-child(2) {
    width: 45px;
    height: 45px;
  }
  
  .spinner-ring:nth-child(3) {
    width: 30px;
    height: 30px;
  }
}
</style> 