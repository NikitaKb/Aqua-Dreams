<template>
<div class="pools-page">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">СОЗДАЙТЕ СВОЙ ИДЕАЛЬНЫЙ БАССЕЙН</h1>
        <p class="hero-description">
          Комплексные услуги по проектированию, строительству и обслуживанию бассейнов для любого бюджета
        </p>
      </div>
      <div class="hero-gallery">
        <div class="gallery-item gallery-item-small">
          <img src="/images/hero_1.png" alt="Частный бассейн" class="gallery-image">
        </div>
        <div class="gallery-item gallery-item-large">
          <img src="/images/hero_2.png" alt="Спа бассейн" class="gallery-image">
        </div>
        <div class="gallery-item gallery-item-small">
          <img src="/images/hero_3.png" alt="Вечерний бассейн" class="gallery-image">
        </div>
      </div>
    </div>
  
  </div>
</template>

<script setup>
// Здесь может быть добавлена логика компонента
</script>

<style scoped>
.pools-page {

  position: relative;
}

.hero-section {
  position: relative;
  height: 700px;
  background: url('/images/pool-bg.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 180px;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  color: #FFFFFF;
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-description {
  color: #FFFFFF;
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 100px;
}

.hero-gallery {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  max-width: 1342px;
  padding: 0 20px;
  margin-top: auto;
  transform: none;
}

.gallery-item {
  border-radius: 15px;
  overflow: hidden;
  height: 300px;
}

.gallery-item-small {
  width: 373px;
}

.gallery-item-large {
  width: 576px;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .hero-section {
    height: auto;
    padding-top: 120px;
  }

  .hero-gallery {
    flex-direction: row;
    padding: 0 20px;
    gap: 10px;
    margin-top: 100px;
  }

  .gallery-item-small {
    width: 200px;
    height: 200px;
  }

  .gallery-item-large {
    width: 300px;
    height: 200px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 20px;
    margin-bottom: 50px;
  }

  .pool-types {
    padding: 80px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .section-subtitle {
    font-size: 16px;
    margin-bottom: 40px;
  }

  .pool-card {
    height: 350px;
  }

  .pool-content {
    padding: 30px;
  }

  .pool-title {
    font-size: 28px;
  }

  .pool-description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding-top: 80px;
  }

  .hero-gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 83px;
  }
  
  .gallery-item-small {
    display: none;
  }
  
  .gallery-item-large {
    width: 100%;
    height: 200px;
  }
  
  .hero-content {
    padding: 40px 0;
  }
  
  .hero-title {
    font-size: 24px;
  }
  
  .hero-description {
    font-size: 14px;
  }

  .pool-types {
    padding: 60px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .pool-card {
    height: 300px;
  }

  .pool-content {
    padding: 20px;
  }

  .pool-title {
    font-size: 24px;
  }

  .pool-description {
    font-size: 12px;
  }
}

.pool-types {
  padding: 100px 0;
  background: #fff;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  color: #23A3FF;
  font-size: 36px;
  text-align: center;
  margin-bottom: 10px;
}

.section-subtitle {
  text-align: center;
  color: #333;
  font-size: 18px;
  margin-bottom: 60px;
}

.pool-cards {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.pool-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 400px;
  background: #000;
}

.pool-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.pool-content {
  position: relative;
  z-index: 1;
  padding: 40px;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.pool-title {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #23A3FF;
}

.pool-description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 600px;
}

.pool-button {
  display: inline-block;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 12px 30px;
  border-radius: 100px;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.pool-button:hover {
  background: #23A3FF;
  border-color: #23A3FF;
}

@media (max-width: 768px) {
  .pool-card {
    height: 350px;
  }

  .pool-content {
    padding: 30px;
  }

  .pool-title {
    font-size: 28px;
  }

  .pool-description {
    font-size: 14px;
  }
}
</style>
