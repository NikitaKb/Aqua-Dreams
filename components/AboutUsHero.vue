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
    flex-wrap: wrap;
    align-items: center;
    gap: 40px;
  }
  
  .about-image {
    flex: 1 1 400px;
    text-align: center;
  }
  
  .about-image img {
    width: 100%;
    max-width: 500px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  .about-text {
    flex: 1 1 500px;
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
  </style>
  