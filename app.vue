<template>
  <div>
    <!-- Загрузочный экран -->
    <LoadingScreen :is-loading="$isLoading.value" />
    
    <!-- Основной контент -->
    <div v-show="!$isLoading.value" class="main-content">
      <Header />
      <main>
        <NuxtPage />
      </main>
      <Footer />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap');

:root {
  --container-max-width: 1360px;
  --container-padding: 5vw;
  --base-font-size: 18px;
  --scale-factor: 1;
  --viewport-width: 100vw;
  --viewport-height: 100vh;
  --base-padding: 1.25rem;
}
button,
a.button,
.nuxt-link-exact-active,
.pool-button,
.pool-consult-btn,
.consult-btn {
  border-radius: 15px !important;
  transition: all 0.3s ease;
}

.consult-btn,
.pool-consult-btn {
  background: transparent;
  color: #23A3FF;
  border: 1.5px solid #23A3FF;
  border-radius: 12px;
  padding: 20px 35px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
}

.consult-btn:hover,
.pool-consult-btn:hover {
  background: #23A3FF;
  color: #fff;
}

@media (max-width: 1024px) {
  .consult-btn,
  .pool-consult-btn {
    padding: 18px 30px;
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .consult-btn,
  .pool-consult-btn {
    padding: 16px 25px;
    font-size: 14px;
    width: auto;
    min-width: 200px;
  }
}

@media (max-width: 480px) {
  .consult-btn,
  .pool-consult-btn {
    padding: 14px 20px;
    font-size: 14px;
    width: 100%;
    max-width: 280px;
  }
}

@media (max-width: 375px) {
  .consult-btn,
  .pool-consult-btn {
    padding: 12px 16px;
    font-size: 13px;
    width: 100%;
    max-width: 240px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: var(--base-font-size);
  overflow-x: hidden;
  width: 100%;
}

body {
  font-family: 'Hanken Grotesk', sans-serif;
  line-height: 1.6;
  min-height: 100vh;
  font-size: 1rem;
  overflow-x: hidden;
  width: 100%;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  width: 100%;
  position: relative;
}

/* Глобальные стили для кнопок */
.button-primary {
  background: transparent;
  color: #23A3FF;
  border: 1px solid #23A3FF;
  padding: calc(1rem * var(--scale-factor)) calc(2.5rem * var(--scale-factor));
  border-radius: 100px;
  font-size: calc(1rem * var(--scale-factor));
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transform-origin: center;
  transform: scale(var(--scale-factor));
}

.button-primary:hover {
  background: #23A3FF;
  color: white;
 }

h1 {
  font-size: calc(4rem * var(--scale-factor));
  font-weight: 500;
  line-height: 1.2;
  transform-origin: center;
  transform: scale(var(--scale-factor));
}

h2 {
  font-size: calc(3rem * var(--scale-factor));
  font-weight: 500;
  line-height: 1.2;
  transform-origin: center;
 
}

h3 {
  font-size: calc(2rem * var(--scale-factor));
  font-weight: 500;
  line-height: 1.2;
  transform-origin: center;
 
}

h4 {
  font-size: calc(2rem * var(--scale-factor));
  font-weight: 500;
  line-height: 1.2;
  transform-origin: center;
 
}

h5 {
  font-size: calc(1.5rem * var(--scale-factor));
  font-weight: 500;
  line-height: 1.2;
  transform-origin: center;

}

h6 {
  font-size: calc(1.25rem * var(--scale-factor));
  font-weight: 500;
  line-height: 1.2;
  transform-origin: center;
  transform: scale(var(--scale-factor));
} */

.main-content {
  opacity: 0;
  animation: fadeInContent 0.8s ease-out forwards;
}

main {
  width: 100%;
  overflow-x: hidden;
}

@keyframes fadeInContent {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media Queries для масштабирования */
@media screen and (max-width: 1360px) {
  :root {
    --scale-factor: 0.9;
    --container-padding: 6vw;
  }
}

@media screen and (max-width: 1200px) {
  :root {
    --scale-factor: 0.8;
    --container-padding: 7vw;
  }
}

@media screen and (max-width: 992px) {
  :root {
    --scale-factor: 0.7;
    --container-padding: 8vw;
  }
}

@media screen and (max-width: 768px) {
  :root {
    --scale-factor: 0.6;
    --container-padding: 10vw;
  }
}

@media screen and (max-width: 576px) {
  :root {
    --scale-factor: 0.5;
    --container-padding: 12vw;
  }
}
</style>
