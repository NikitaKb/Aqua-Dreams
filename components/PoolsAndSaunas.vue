<template>
  <section class="pools-section">
    <h2 class="section-title">Бассейны и сауны</h2>
    <p class="section-description">Мы строим и реконструируем бассейны и сауны уже более 19 лет<br>от дизайн-проекта до сдачи объекта точно в срок</p>
    
    <div class="services-grid">
      <div class="grid-row">
        <!-- Бассейны -->
        <nuxt-link to="/pools" class="service-card large">
          <img src="/images/pools.png" alt="Бассейны" class="service-image" />
          <div class="service-overlay">
            <h3 class="service-title">Бассейны</h3>
          </div>
        </nuxt-link>
        <!-- Проектирование и дизайн -->
        <nuxt-link to="/design" class="service-card">
          <img src="/images/design.png" alt="Проектирование и дизайн" class="service-image" />
          <div class="service-overlay">
            <h3 class="service-title">Проектирование и дизайн</h3>
          </div>
        </nuxt-link>
      </div>

      <div class="grid-row">
        <!-- Хаммамы -->
        <nuxt-link to="/termo" class="service-card">
          <img src="/images/hammam.png" alt="Хаммамы" class="service-image" />
          <div class="service-overlay">
            <h3 class="service-title">Хаммамы</h3>
          </div>
        </nuxt-link>
        <!-- Сауны -->
        <nuxt-link to="/termo" class="service-card large">
          <img src="/images/termo-b.png" alt="Сауны" class="service-image" />
          <div class="service-overlay">
            <h3 class="service-title">Сауны</h3>
          </div>
        </nuxt-link>
      </div>

      <div class="grid-row">
        <!-- Химия -->
        <nuxt-link to="/chemistry" class="service-card large">
          <img src="/images/chemistry.png" alt="Химия" class="service-image" />
          <div class="service-overlay">
            <h3 class="service-title">Химия</h3>
          </div>
        </nuxt-link>
        <!-- Оборудование -->
        <nuxt-link to="/equipment" class="service-card">
          <img src="/images/equipment.png" alt="Оборудование" class="service-image" />
          <div class="service-overlay">
            <h3 class="service-title">Оборудование</h3>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="cta-button">
      <button class="button-primary">Оставить заявление</button>
    </div>
  </section>
</template>

<style scoped>
.pools-section {
  padding: 100px 0;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  color: #0085FF;
  margin-bottom: 20px;
  font-size: 48px;
}

.section-description {
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.5;
  font-size: 16px;
}

.services-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 60px;
}

.grid-row {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.service-card {
  position: relative;
  overflow: hidden;
  width: 580px;
  height: 335px;
  flex-shrink: 0;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: scale(1.02);
}

.service-card.large {
  width: 740px;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px;
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
}

.service-card:hover .service-overlay {
  background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%);
}

.service-title {
  color: white;
  margin: 0;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
}

.cta-button {
  text-align: center;
}

/* Desktop (1440px) */
@media (max-width: 1440px) {
  .section-title {
    font-size: 48px;
  }

  .section-description {
    font-size: 16px;
  }

  .service-title {
    font-size: 32px;
  }
}

/* Tablet (768px) */
@media (max-width: 768px) {
  .section-title {
    font-size: 36px;
  }

  .section-description {
    font-size: 15px;
  }

  .service-title {
    font-size: 24px;
  }

  .services-grid {
    gap: 16px;
  }

  .grid-row {
    flex-direction: column;
    gap: 16px;
  }

  .service-card,
  .service-card.large {
    width: 100%;
    height: 280px;
  }
}

/* Mobile (480px) */
@media (max-width: 480px) {
  .pools-section {
    padding: 40px 0;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .section-description {
    font-size: 14px;
    margin-bottom: 30px;
    padding: 0 16px;
  }

  .services-grid {
    gap: 12px;
    margin-bottom: 30px;
  }

  .grid-row {
    gap: 12px;
  }

  .service-card,
  .service-card.large {
    height: 200px;
  }

  .service-overlay {
    padding: 16px;
  }

  .service-title {
    font-size: 18px;
  }

  br {
    display: none;
  }
}

@media (max-width: 1024px) {
  .services-section {
    padding: 80px 0;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .section-description {
    font-size: 16px;
    margin-bottom: 40px;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .service-card {
    height: 300px;
  }

  .service-content {
    padding: 20px;
  }

  .service-title {
    font-size: 24px;
  }

  .service-description {
    font-size: 14px;
  }

  .service-button {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 60px 0;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .service-card {
    height: 250px;
  }

  .service-content {
    padding: 15px;
  }

  .service-title {
    font-size: 20px;
  }

  .service-description {
    font-size: 12px;
  }

  .service-button {
    padding: 8px 16px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 40px 0;
  }

  .section-title {
    font-size: 24px;
  }

  .section-description {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .service-card {
    height: 200px;
  }

  .service-content {
    padding: 10px;
  }

  .service-title {
    font-size: 18px;
  }

  .service-description {
    font-size: 11px;
  }
}
</style> 