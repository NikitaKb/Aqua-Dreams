<template>
  <section class="about-stats">
    <img src="/images/wave.svg" alt="Волна" class="wave-decoration" />
    <div class="container">
      <div class="content-wrapper">
        <div class="stats-images">
          <img src="/images/img_stats.png" alt="О нас" class="stats-image" />
        </div>
        <div class="stats-block">
          <h2 class="section-title">О НАС В ЦИФРАХ</h2>
          <div class="stats-numbers">
            <div class="stat-item">
              <div class="stat-value">25</div>
              <div class="stat-description">Лет успешного строительства</div>
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
  gap: 30px;
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
  .content-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .stats-images {
    width: 100%;
    max-width: 719px;
    height: auto;
    aspect-ratio: 719/647;
  }

  .stats-block {
    width: 100%;
    padding-top: 20px;
  }

  .section-title {
    text-align: center;
    font-size: 42px;
  }

  .stats-numbers {
    justify-content: center;
    gap: 15px;
  }

  .stat-item {
    text-align: center;
  }

  .separator {
    display: none;
  }

  .stat-description {
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .stats-numbers {
    flex-direction: column;
    gap: 30px;
  }

  .stat-item {
    width: 100%;
  }

  .stat-description {
    max-width: none;
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
</style> 