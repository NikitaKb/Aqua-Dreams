<template>
  <section class="portfolio-section">
    <h2 class="portfolio-title">Портфолио проектов</h2>
    <div class="portfolio-grid">
      <div class="portfolio-item">
        <img src="/public/images/proj.png" alt="2025" />
        <div class="overlay">2025</div>
      </div>
      <div class="portfolio-item">
        <img src="/public/images/proj.png" alt="2024" />
        <div class="overlay">2024</div>
      </div>
      <div class="portfolio-item">
        <img src="/public/images/proj.png" alt="2023" />
        <div class="overlay">2023</div>
      </div>
      <div class="portfolio-item">
        <img src="/public/images/proj.png" alt="2022" />
        <div class="overlay">2022</div>
      </div>
      <div class="portfolio-item">
        <img src="/public/images/proj.png" alt="2021" />
        <div class="overlay">2021</div>
      </div>
      <div class="portfolio-item">
        <img src="/public/images/proj.png" alt="2020" />
        <div class="overlay">2020</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio-section {
  padding: 40px 20px;
  max-width: 1360px;
  margin: 0 auto;
  margin-top: 100px;
}

.portfolio-title {
  text-align: center;
  font-size: 32px;
  color: #00aaff;
  margin-bottom: 40px;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.portfolio-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.portfolio-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(60%);
  transition: filter 0.3s ease;
}

.portfolio-item:hover img {
  filter: brightness(80%);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: 600;
  pointer-events: none;
}

@media (max-width: 900px) {
  .portfolio-section {
    padding: 24px 4px;
    margin-top: 40px;
  }
  .portfolio-title {
    font-size: 22px;
  }
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .overlay {
    font-size: 18px;
  }
}
@media (max-width: 480px) {
  .portfolio-section {
    padding: 12px 2px;
  }
  .portfolio-title {
    font-size: 16px;
  }
  .overlay {
    font-size: 13px;
  }
}
@media (max-width: 375px) {
  .portfolio-title {
    font-size: 12px;
  }
  .overlay {
    font-size: 10px;
  }
}
</style>
