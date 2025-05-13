<template>
  <section class="termo-types">
    <div class="container">
      <h2 class="section-title">Терма-зоны</h2>
      <p class="section-subtitle">Ваш уголок отдыха и гармонии прямо у дома.</p>
      <div class="termo-cards">
        <div class="termo-card">
          <img src="/images/sauna_bl.png" alt="Сауны" class="termo-image">
          <div class="termo-content">
            <h3 class="termo-title">Сауны</h3>
            <p class="termo-description">
              Сауна – это идеальное место для отдыха с максимальной пользой для здоровья. Сухой пар, температура до 100 градусов. Для любителей классического парения. Финские сауны отличаются особой атмосферой и качеством используемых материалов.
            </p>
            <NuxtLink to="/termo/saunas" class="termo-button">Подробнее</NuxtLink>
          </div>
        </div>

        <div class="termo-card">
          <img src="/images/hammam_bl.png" alt="Хаммамы" class="termo-image">
          <div class="termo-content">
            <h3 class="termo-title">Хаммамы</h3>
            <p class="termo-description">
              Хаммам, или турецкая баня – древняя традиция оздоровления. При идеальной влажности воздуха и температуре до 50 градусов, организм мягко прогревается. Это отличный способ для релаксации, а также ухода за кожей.
            </p>
            <NuxtLink to="/termo/hammams" class="termo-button">Подробнее</NuxtLink>
          </div>
        </div>

        <div class="termo-card">
          <img src="/images/kupel_bl.png" alt="Купели" class="termo-image">
          <div class="termo-content">
            <h3 class="termo-title">Купели</h3>
            <p class="termo-description">
              Купель – это особый вид бассейна для охлаждения после бани или сауны. Традиционно изготавливается из натурального дерева. Идеальное дополнение к любой бане для контрастных процедур.
            </p>
            <NuxtLink to="/termo/kupel" class="termo-button">Подробнее</NuxtLink>
          </div>
        </div>

        <div class="termo-card">
          <img src="/images/bany_bl.png" alt="Бани" class="termo-image">
          <div class="termo-content">
            <h3 class="termo-title">Бани</h3>
            <p class="termo-description">
              Русская баня из натурального бревна или бруса – это традиционная и классическая парная. Это совершенство в простоте, где каждая деталь продумана для создания правильного микроклимата и получения максимума пользы.
            </p>
            <NuxtLink to="/termo/bany" class="termo-button">Подробнее</NuxtLink>
          </div>
        </div>

        <div class="termo-card">
          <img src="/images/dush_bl.png" alt="Душ впечатлений Granda" class="termo-image">
          <div class="termo-content">
            <h3 class="termo-title">Душ впечатлений Granda</h3>
            <p class="termo-description">
              Уникальная spa-процедура, которая сочетает в себе воздействие воды разной температуры и напора, хромотерапию, ароматерапию. Позволяет восстановить силы после тренировок, снять стресс и получить заряд бодрости.
            </p>
            <NuxtLink to="/termo/dush" class="termo-button">Подробнее</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.termo-types {
  background: #fff;

  padding-top: 86px;
}

.container {
  max-width: 1360px;
  margin:  86px auto;
  padding: 0 20px;
}

.section-title {
  color: #C4944C;
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

.termo-cards {
  display: flex;
  flex-direction: column;
  gap: 86px;
}

.termo-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 525px;
  background: #000;
  width: 100%;
}

.termo-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.termo-content {
  position: relative;
  z-index: 1;
  padding: 40px;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.termo-title {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #C4944C;
}

.termo-description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 600px;
}

.termo-button {
  display: inline-block;
  background: #C4944C;
  color: #fff;
  padding: 16px 60px;
  border-radius: 100px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s ease;
  align-self: flex-start;
  border: none;
}

.termo-button:hover {
  background: #b38544;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .termo-card {
    height: 350px;
  }

  .termo-content {
    padding: 30px;
  }

  .termo-title {
    font-size: 28px;
  }

  .termo-description {
    font-size: 14px;
  }
}
</style>
