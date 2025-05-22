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
        <nuxt-link to="/catalog" class="service-card large">
          <img src="/images/chemistry.png" alt="Химия" class="service-image" />
          <div class="service-overlay">
            <h3 class="service-title">Химия</h3>
          </div>
        </nuxt-link>
        <!-- Оборудование -->
        <nuxt-link to="/catalog" class="service-card">
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
 padding-top: 100px;
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
  .pools-section {
    width: 1160px;
    margin: 0 auto;
  }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .grid-row {
    display: block !important;
    margin: 0;
    padding: 0;
  }
  .service-card,
  .service-card.large {
    width: 748px;
    min-width: 748px;
    max-width: 748px;
    height: 260px;
    min-height: 260px;
    max-height: 260px;
    margin: 0 auto 16px auto;
    display: block;
  }
  .service-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  .pools-section {
    padding-left: 32px;
    padding-right: 32px;
  }
  .services-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .grid-row {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
  .service-card,
  .service-card.large {
    height: 260px;
    max-width: 100%;
  }
  /* Первый ряд */
  .grid-row:nth-child(1) .service-card:first-child { width: 520px; }
  .grid-row:nth-child(1) .service-card:last-child { width: 420px; }
  /* Второй ряд */
  .grid-row:nth-child(2) .service-card:first-child { width: 420px; }
  .grid-row:nth-child(2) .service-card:last-child { width: 520px; }
  /* Третий ряд */
  .grid-row:nth-child(3) .service-card:first-child { width: 520px; }
  .grid-row:nth-child(3) .service-card:last-child { width: 420px; }
  .service-title {
    font-size: 28px;
  }
  .service-overlay {
    padding: 20px;
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

@media (max-width: 375px) {
  .pools-section {
    padding: 24px 0;
  }
  .section-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .section-description {
    font-size: 13px;
    margin-bottom: 18px;
    padding: 0 8px;
  }
  .services-grid {
    gap: 8px;
    margin-bottom: 18px;
    align-items: center;
  }
  .grid-row {
    gap: 8px;
    flex-direction: column;
    align-items: center;
  }
  .service-card,
  .service-card.large {
    width: 355px !important;
    min-width: 355px !important;
    max-width: 355px !important;
    height: 155px !important;
    min-height: 155px !important;
    max-height: 155px !important;
    margin: 0 auto 8px auto;
    display: block;
  }
  .service-overlay {
    padding: 10px;
  }
  .service-title {
    font-size: 15px;
  }
  .cta-button {
    margin-top: 10px;
  }
  .button-primary {
    font-size: 15px;
    padding: 10px 0;
    width: 180px;
    border-radius: 100px;
  }
  br {
    display: none;
  }
}
</style> 