<template>
  <div>
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
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
.pool-consult-btn {
  border-radius: 15px !important;
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
  padding: 0 calc(var(--container-padding) * var(--scale-factor));
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
  font-size: calc(2.5rem * var(--scale-factor));
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
}

main {
  
  width: 100%;
  overflow-x: hidden;
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
