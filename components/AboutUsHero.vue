<template>
  <section class="about-section">
    <div class="about-container">
      <div class="about-image">
        <img src="/public/images/us.png" alt="Команда компании" />
      </div>
      <div class="about-text">
        <h2>О компании</h2>
        <p>
          Группа компаний КИТ-СВ занимается проектированием и строительством бассейнов «под ключ–без хлора и химии», а также является эксклюзивным представителем в России немецкой компании
          <strong>Mesc</strong>, мирового лидера в области экологичной дезинфекции воды в бассейнах при помощи ионов меди и серебра.
        </p>
        <p>
          КИТ-СВ работает на рынке строительства бассейнов с 1996 года. За это время нашими клиентами стали тысячи частных клиентов и организаций. Мы имеем широкую дистрибьюторскую сеть в регионах России и постоянно расширяем круг наших партнеров.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 60px 20px;
  background-color: #fff;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.about-image,
.about-text {
  flex: 1 1 0;
  width: 50%;
  min-width: 0;
}

.about-image img {
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.about-text {
 
}

.about-text h2 {
  font-size: 36px;
  color: #0072ce;
  margin-bottom: 20px;
}

.about-text p {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 16px;
}

@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    padding: 0;
  }
  .about-image,
  .about-text {
    width: 100%;
    flex: unset;
  }
  .about-image img {
    max-width: 100vw;
    width: 100%;
    height: auto;
  }
  .about-text {
    padding: 0 8px;
  }
  .about-text h2 {
    font-size: 28px;
  }
  .about-text p {
    font-size: 15px;
  }
}
@media (max-width: 480px) {
  .about-section {
    padding: 24px 4px;
  }
  .about-text h2 {
    font-size: 20px;
  }
  .about-text p {
    font-size: 13px;
  }
}
@media (max-width: 375px) {
  .about-section {
    padding: 12px 2px;
  }
  .about-text h2 {
    font-size: 16px;
  }
  .about-text p {
    font-size: 12px;
  }
}
</style>
