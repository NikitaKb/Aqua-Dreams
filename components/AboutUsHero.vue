<template>
  <section class="about-section">
    <div class="about-container">
      <div class="about-image">
        <img src="/public/images/us.png" alt="Команда компании" />
      </div>
      <div class="about-text">
        <h2>О компании</h2>
        <p>
          Путь нашей компании начался более 25 лет назад, когда мы были известны как Микс. На тот момент мы уже закладывали основы для создания уникальных и экологичных бассейнов, о которых мечтали наши клиенты. С годами наша команда росла, а амбиции — укреплялись, и мы решили сделать следующий шаг, став Аквамикс
        </p>
        <p>
          Но время не стоит на месте. Мы почувствовали, что для новой эры и новых решений нам нужно новое имя. Так, в 2023 году, мы пережили ребрендинг и стали Aqua Dreams — воплощением наших амбиций и мечты о создании идеальных водных пространств для каждого. Мы не просто строим бассейны, мы строим мечты.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding-left: 10px;
  padding-right: 10px;
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
    padding-left: 10px;
    padding-right: 10px;
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
    padding-left: 10px;
    padding-right: 10px;
  }
  .about-text h2 {
    font-size: 16px;
  }
  .about-text p {
    font-size: 12px;
  }
}
</style>
