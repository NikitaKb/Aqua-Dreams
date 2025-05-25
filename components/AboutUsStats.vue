<template>
  <section class="about-stats">
    <img 
      v-if="!isMobile" 
      src="/images/wave.svg" 
      alt="Волна" 
      class="wave-decoration" 
    />
    <img 
      v-else 
      src="/images/wave-s.svg" 
      alt="Волна" 
      class="wave-decoration" 
    />
    <div class="container">
      <div class="content-wrapper">
        <div class="stats-images">
          <div class="stats-image-bg"></div>
          <img src="/public/images/img_stats.png" alt="О нас" class="stats-image" />
        </div>
        <div class="stats-block">
          <h2 class="section-title">О НАС В ЦИФРАХ</h2>
          <div class="stats-numbers">
            <div class="stat-item">
              <div class="stat-value">25</div>
              <div class="stat-description">Лет строительства</div>
            </div>
            <div class="separator">|</div>
            <div class="stat-item">
              <div class="stat-value">30</div>
              <div class="stat-description">Наград в конкурсах</div>
            </div>
            <div class="separator">|</div>
            <div class="stat-item">
              <div class="stat-value">100</div>
              <div class="stat-description">Проектов на обслуживании</div>
            </div>
            <div class="separator">|</div>
            <div class="stat-item">
              <div class="stat-value">500</div>
              <div class="stat-description">Реализованных проектов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 1024;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.about-stats {
  background: #fff;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.content-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px
 
}

.stats-images {
  width: 719px;
  height: 647px;
  position: relative;
}

.stats-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.stats-block {
  flex: 1;
  padding-top: 40px;
}

.section-title {
  color: #000;
  font-size: 48px;
  margin-bottom: 40px;
  font-weight: 500;
}

.stats-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: nowrap;
}

.stat-item {
  text-align: left;
}

.separator {
  color: #000;
  font-size: 32px;
  font-weight: 300;
  margin-top: -20px;
}

.stat-value {
  font-size: 40px;
  font-weight: 600;
  color: #23A3FF;
  margin-bottom: 5px;
  white-space: nowrap;
}

.stat-description {
  font-size: 16px;
  color: #333;
  line-height: 1.3;
  max-width: 100px;
}

.wave-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;
}

@media (max-width: 1360px) {
  .stats-images {
    width: 600px;
    height: 540px;
  }
}

@media (max-width: 1200px) {
  .stats-images {
    width: 500px;
    height: 450px;
  }

  .section-title {
    font-size: 48px;
  }

  .stat-value {
    font-size: 42px;
  }
}

@media (max-width: 1024px) {
  .container {
    padding: 0 32px;
  }
  .content-wrapper {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
  .stats-images {
    width: 412px;
    height: 371px;
    min-width: 412px;
    min-height: 371px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
  .stats-image {
    width: 412px;
    height: 371px;
    border-radius: 32px;
    object-fit: cover;
  }
  .stats-block {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    box-sizing: border-box;
  }
  .section-title {
    color: #000;
    font-size: 35px;
    margin-bottom: 20px;
    font-weight: 500;
    
  }
  .stats-numbers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: nowrap;
  }
  .stat-item {
    text-align: left;
  }
  .stat-value {
    font-size: 32px;
    font-weight: 600;
    color: #23A3FF;
  }
  .stat-description {
    font-size: 16px;
    color: #333;
    max-width: 100px;
  }
}

@media (max-width: 900px) {
  .container {
    padding: 0 24px;
  }
  .content-wrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: flex-start;
  }
  .stats-images {
    width: 350px;
    height: 315px;
    min-width: 350px;
    min-height: 315px;
  }
  .stats-image {
    width: 350px;
    height: 315px;
  }
  .stats-block {
    padding-top: 20px;
  }
  .section-title {
    font-size: 30px;
    margin-bottom: 16px;
  }
  .stats-numbers {
    gap: 16px;
  }
  .stat-value {
    font-size: 28px;
  }
  .stat-description {
    font-size: 14px;
    max-width: 80px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .stats-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 110px;
  }
  .stat-item {
    width: 100%;
  }

  .stat-description {
    max-width: none;
  }

  .stats-images {
    display: none;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    gap: 20px;
  }

  .stats-block {
    padding-top: 0;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 24px;
  }

  .stats-numbers {
    gap: 20px;
  }

  .stat-value {
    font-size: 24px;
    margin-bottom: 4px;
  }

  .stat-description {
    font-size: 14px;
    max-width: none;
  }

  .stats-images {
    aspect-ratio: 16/9;
  }

  .wave-decoration {
    height: 40px;
    object-fit: cover;
  }
}

@media (max-width: 375px) {
  .about-stats {
    padding: 0 0 16px 0;
  }
  .container {
    padding: 0 4px;
  }
  .content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  .stats-block {
    padding-top: 0;
    margin-bottom: 0;
    align-items: center;
    justify-content: center;
  }
  .section-title {
    font-size: 18px;
    margin-bottom: 18px;
    text-align: center;
  }
  .stats-numbers {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    width: 100%;
  }
  .stat-item {
    text-align: center;
    width: 100%;
    margin-bottom: 0;
  }
  .stat-value {
    font-size: 22px;
    color: #23A3FF;
    font-weight: 500;
    margin-bottom: 2px;
    border-bottom: 2px solid #23A3FF;
    display: inline-block;
    padding-bottom: 2px;
  }
  .stat-description {
    font-size: 13px;
    color: #222;
    margin-bottom: 0;
    margin-top: 2px;
  }
  .separator {
    display: none;
  }
  .wave-decoration {
    position: static;
    width: 100vw;
    min-width: 100vw;
    max-width: 100vw;
    height: 38px;
    object-fit: cover;
    margin-top: 18px;
    margin-bottom: 0;
    left: 0;
    display: none;
  }
}
</style> 