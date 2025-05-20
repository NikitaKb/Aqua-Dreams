<template>
  <section class="modular-baths">
    <div class="container">
      <!-- Первый блок -->
      <div class="bath-block">
        <div class="bath-content">
          <h2 class="bath-title">Модульные стационарные бани</h2>
          <p class="bath-description">
            Наши модульные стационарные бани — это идеальное решение для отдыха и оздоровления. Они быстро устанавливаются, имеют гибкий дизайн и обеспечивают комфортную температуру благодаря современным теплоизоляционным материалам. Используя экологически чистые материалы, мы гарантируем долговечность и безопасность ваших бань.
          </p>
          <div class="button-wrapper">
            <a href="#" class="button-primary">Оставить заявление</a>
          </div>
        </div>
        <div class="bath-image">
          <img src="/images/module_2.png" alt="Модульная баня" />
        </div>
      </div>

      <!-- Второй блок -->
      <div class="bath-block bath-block-reverse">
        <div class="bath-image">
          <img src="/images/module_1.png" alt="Плавающее солярное покрытие" />
        </div>
        <div class="bath-content">
          <h2 class="bath-title">Плавающее солярное покрытие</h2>
          <p class="bath-description">
            Наши модульные стационарные бани — это идеальное решение для отдыха и оздоровления. Они быстро устанавливаются, имеют гибкий дизайн и обеспечивают комфортную температуру благодаря современным теплоизоляционным материалам. Используя экологически чистые материалы, мы гарантируем долговечность и безопасность ваших бань. Создайте идеальное место для отдыха с нашими банями!
          </p>
          <div class="button-wrapper">
            <a href="#" class="button-primary">Оставить заявление</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modular-baths {
  background: #fff;
  padding: 60px 0;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.bath-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 100px;
}

.bath-block-reverse {
  flex-direction: row;
}

.bath-content {
  width: 50%;
  max-width: 570px;
  padding: 0;
}

.bath-title {
  color: #C77D47;
  font-size: 48px;
  margin-bottom: 30px;
  font-weight: 500;
  line-height: 1.2;
}

.bath-block-reverse .bath-title {
  color: #23A3FF;
}

.bath-description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #333;
}

.bath-image {
  width: 50%;
  max-width: 690px;
  height: 460px;
  overflow: hidden;
  border-radius: 20px;
}

.bath-image img {
  width: 100%;
  height: 100%;

}

.button-wrapper {
  margin-top: 30px;
}

.button-primary {
  background: transparent;
  color: #23A3FF;
  border: 1px solid #23A3FF;
  padding: 16px 40px;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
}

.button-primary:hover {
  background: #23A3FF;
  color: white;
}

/* @media (max-width: 1360px) {
  .bath-block {
    flex-direction: column;
    position: relative;
  }
  
  .bath-block-reverse {
    flex-direction: column;
  }
  
  .bath-content, 
  .bath-image {
    width: 100%;
    max-width: 100%;
  }
  
  .bath-title {
    font-size: 36px;
  }
}

@media (max-width: 1100px) {
  .bath-block {
    position: relative;
  }
  
  .bath-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
    padding: 30px;
    z-index: 1;
  }
  
  .bath-image {
    position: relative;
    height: 500px;
    border-radius: 20px;
  }
  
  .bath-title {
    color: white;
    font-size: 32px;
    margin-bottom: 20px;
  }
  
  .bath-description {
    color: white;
    font-size: 16px;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .button-primary {
    background: #23A3FF;
    color: white;
    border: none;
  }
} */

@media (max-width: 749px) {
  .bath-block {
    margin-bottom: 60px;
    gap: 0;
  }
  
  .bath-image {
    height: 400px;
    border-radius: 10px;
  }
  
  .bath-title {
    font-size: 28px;
    margin-bottom: 15px;
  }
  
  .bath-description {
    font-size: 14px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  }
  
  .button-primary {
    font-size: 14px;
    padding: 12px 30px;
  }
}

@media (max-width: 480px) {
  .modular-baths {
    padding: 40px 0;
  }
  
  .bath-block {
    margin-bottom: 40px;
  }
  
  .bath-image {
    height: 300px;
  }
  
  .bath-content {
    padding: 20px;
  }
  
  .bath-title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .bath-description {
    font-size: 12px;
    margin-bottom: 15px;
    -webkit-line-clamp: 2;
  }
  
  .button-primary {
    font-size: 12px;
    padding: 10px 20px;
  }
}

@media (max-width: 1024px) {
  .container {
    padding-left: 32px;
    padding-right: 32px;
  }
  .bath-block,
  .bath-block-reverse {
    flex-direction: row;
    gap: 24px;
    align-items: center;
    margin-bottom: 60px;
  }
  .bath-content {
    width: 50%;
    max-width: 100%;
    padding: 0;
  }
  .bath-image {
    width: 50%;
    max-width: 100%;
    height: 330px;
    border-radius: 0;
    overflow: hidden;
  }
  .bath-title {
    font-size: 36px;
    margin-bottom: 20px;
    color: #C77D47;
  }
  .bath-block-reverse .bath-title {
    color: #23A3FF;
  }
  .bath-description {
    font-size: 16px;
    margin-bottom: 24px;
    color: #333;
  }
  .button-primary {
    background: transparent;
    color: #23A3FF;
    border: 1px solid #23A3FF;
    font-size: 16px;
    padding: 16px 40px;
  }
  .button-primary:hover {
    background: #23A3FF;
    color: white;
  }
}
</style> 