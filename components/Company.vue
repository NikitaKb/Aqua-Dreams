<template>
    <div class="partners-container">
      <h2 class="partners-title">
        НАШИ <span class="highlight">ПАРТНЕРЫ</span>
      </h2>
      <div class="partners-logos">
        <img src="/public/images/sj.png" alt="San Juan" />
        <img src="/public/images/ps.png" alt="Poolsar" />
        <img src="/public/images/com.png" alt="Compass" />
        <img src="/public/images/fun.png" alt="Fun Group" />
        <img src="/public/images/comp.png" alt="Composit" />
        <img src="/public/images/cedr.png" alt="Кедр Пром" />
        <img src="/public/images/gran.png" alt="Grandis" />
      </div>
    </div>
  </template>
  
  <style scoped>
  .partners-container {
    text-align: center;
    padding: 40px 20px;
  }
  
  .partners-title {
    font-size: 45px;
    margin-bottom: 70px;
    margin-bottom: 30px;
  }
  
  .partners-title .highlight {
    color: #00aaff;
  }
  
  .partners-logos {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;
  }
  
  .partners-logos img {
    max-height: 60px;
    max-width: 160px;
    object-fit: contain;
  }
  </style>
  