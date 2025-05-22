<template>
    <section class="experience">
      <div class="container">
        <div class="left">
          <div class="number-25">25</div>
        </div>
        <div class="right">
          <div class="content-wrapper">
            <h2 class="heading">Лет создаем решения</h2>
  
            <div class="stats">
              <div class="stat">
                <div class="big-number">30</div>
                <div class="text">Наград в<br />конкурсах</div>
              </div>
  
              <div class="divider"></div>
  
              <div class="stat">
                <div class="big-number">100</div>
                <div class="text">Проектов на<br />обслуживании</div>
              </div>
  
              <div class="divider"></div>
  
              <div class="stat">
                <div class="big-number">500</div>
                <div class="text">Реализованных<br />проектов</div>
              </div>
            </div>
  
            <p class="note">Каждый объект строится в соответствии с ГОСТ №4335 и СНиП №53543</p>
  
            <div class="buttons">
              <button class="btn">ГОСТ</button>
              <button class="btn">СНиП</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  .experience {
    padding: 60px 20px;
    background: #fff;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: center;
    position: relative;
  }
  
  .left {
    flex-shrink: 0;
  }
  
  .number-25 {
    font-size: 500px;
    font-weight: 700;
    color: #1da1ff;
    line-height: 0.9;
  }
  
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    transform: translateY(-20px); /* для выравнивания по центру относительно цифры */
  }
  
  .heading {
    font-size: 48px;
    font-weight: 500;
    margin-bottom: 40px;
  }
  
  .stats {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    margin-bottom: 25px;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .big-number {
    font-size: 30px;
    color: #1da1ff;
    font-weight: 500;
    margin-bottom: 5px;
  }
  
  .text {
    font-size: 18px;
    line-height: 1.3;
    color: #000;
  }
  
  .divider {
    width: 1px;
    height: 50px;
    background-color: #bbb;
    margin-top: 24px;
  }
  
  .note {
    font-size: 14px;
    color: #444;
    margin: 20px 0;
  }
  
  .buttons {
    display: flex;
    gap: 20px;
  }
  
  .btn {
    padding: 10px 24px;
    font-size: 14px;
    border: 1px solid #1da1ff;
    color: #1da1ff;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .btn:hover {
    background-color: #e6f4ff;
  }
  
  @media (max-width: 900px) {
    .container {
      flex-direction: column;
      gap: 24px;
      padding: 0;
    }
    .left {
      text-align: center;
    }
    .number-25 {
      font-size: 180px;
    }
    .right {
      width: 100%;
      justify-content: center;
    }
    .content-wrapper {
      align-items: center;
      transform: none;
      padding: 0 8px;
    }
    .heading {
      font-size: 28px;
      text-align: center;
    }
    .stats {
      
      gap: 16px;
      align-items: center;
    }
    .note {
      text-align: center;
    }
    .buttons {
      justify-content: center;
    }
  }
  @media (max-width: 480px) {
    .experience {
      padding: 24px 4px;
    }
    .number-25 {
      font-size: 90px;
    }
    .heading {
      font-size: 18px;
    }
    .big-number {
      font-size: 22px;
    }
    .text {
      font-size: 13px;
    }
  }
  @media (max-width: 375px) {
    .experience {
      padding: 12px 2px;
    }
    .number-25 {
      font-size: 60px;
    }
    .heading {
      font-size: 14px;
    }
    .big-number {
      font-size: 16px;
    }
    .text {
      font-size: 11px;
    }
  }
  </style>
  