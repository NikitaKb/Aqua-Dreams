<template>
  <section class="pool-types">
    <div class="container">
      <h2 class="section-title">Виды бассейнов</h2>
      <p class="section-subtitle">Ваш уголок отдыха и гармонии прямо у дома.</p>
      
      <div class="pool-cards">
        <div class="pool-card">
          <img src="/images/b-pools.png" alt="Бетонный бассейн" class="pool-image">
          <div class="pool-content">
            <h3 class="pool-title">Бетонный бассейн</h3>
            <p class="pool-description">
              Бетонные бассейны — это долговечные и надежные конструкции, позволяющие создавать бассейн любой формы и размера. Они дополняют внешний вид любого участка и могут стать его изюминкой. Такие бассейны идеально подходят как для загородных домов, так и для коммерческих объектов, обеспечивая комфортное времяпрепровождение.
            </p>
            <a href="#" class="pool-button">Подробнее</a>
          </div>
        </div>

        <div class="pool-card">
          <img src="/images/kom-pools.png" alt="Композитный бассейн" class="pool-image">
          <div class="pool-content">
            <h3 class="pool-title">Композитный бассейн</h3>
            <p class="pool-description">
              Композитные бассейны - это бассейны, изготовленные из многослойного композитного материала высокой прочности, армированного стекловолокном и покрытого гелькоутом. Эти бассейны представляют собой цельную конструкцию, которая доставляется на объект в готовом виде.
            </p>
            <a href="#" class="pool-button">Конструктор</a>
          </div>
        </div>

        <div class="pool-card">
          <img src="/images/kar-pools.png" alt="Каркасные бассейны Fun" class="pool-image">
          <div class="pool-content">
            <h3 class="pool-title">Каркасные бассейны Fun</h3>
            <p class="pool-description">
              Каркасные бассейны - это сборные конструкции, где чаша опирается на прочный и разборный каркас. Эти бассейны отличаются простотой монтажа, доступной ценой и универсальностью конструкции.
            </p>
            <a href="#" class="pool-button">Конструктор</a>
          </div>
        </div>

        <div class="pool-card">
          <img src="/images/pl-pools.png" alt="Бассейн из пластиковых полимерных панелей" class="pool-image">
          <div class="pool-content">
            <h3 class="pool-title">Бассейн из пластиковых полимерных панелей</h3>
            <p class="pool-description">
              Бассейны из пластиковых полимерных панелей - это современное и высокотехнологичное решение для создания мест для купания и отдыха как на открытом воздухе, так и в помещении. Эти бассейны отличаются простотой монтажа, прочностью и достойным внешним видом.
            </p>
            <a href="#" class="pool-button">Конструктор</a>
          </div>
        </div>

        <div class="pool-card">
          <img src="/images/bo-pools.png" alt="Бассейн из несъёмной бетонной опалубки" class="pool-image">
          <div class="pool-content">
            <h3 class="pool-title">Бассейн из несъёмной бетонной опалубки</h3>
            <p class="pool-description">
              Бассейн из несъемной бетонной опалубки - это надежное и долговечное решение для создания индивидуального водоема на вашем участке. Эта технология обеспечивает простоту в установке и конструкции, обеспечивая долговечность, высокую прочность и минимальные потери тепла при нагреве воды.
            </p>
            <a href="#" class="pool-button">Конструктор</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Компонент с видами бассейнов
</script>

<style scoped>
.pool-types {
  background: #fff;
  padding-top: 86px;
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
  gap: 86px;
}

.pool-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 525px;
  background: #000;
  width: 100%;
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
  justify-content: center;
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
  background: #23A3FF;
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

.pool-button:hover {
  background: #1e8edf;
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .pool-types {
    padding: 80px 0;
  }

  .section-title {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .section-subtitle {
    font-size: 16px;
    margin-bottom: 40px;
  }

  .pool-cards {
    gap: 20px;
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

  .pool-button {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .pool-types {
    padding: 60px 0;
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

  .pool-button {
    padding: 8px 16px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .pool-types {
    padding: 40px 0;
  }

  .section-title {
    font-size: 24px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .pool-card {
    height: 250px;
  }

  .pool-content {
    padding: 15px;
  }

  .pool-title {
    font-size: 20px;
  }

  .pool-description {
    font-size: 11px;
  }
}
</style> 