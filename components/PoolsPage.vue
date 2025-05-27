<template>
  <div class="pools-page">
      <div class="hero-section">
        <div class="hero-content">
          <h3 class="hero-title">СОЗДАЙТЕ СВОЙ ИДЕАЛЬНЫЙ БАССЕЙН</h3>
          <p class="hero-description">
            Комплексные услуги по проектированию, строительству и обслуживанию бассейнов для любого бюджета
          </p>
        </div>
        
      </div>
    
    </div>
  </template>
  
  <script setup>
  // Здесь может быть добавлена логика компонента
  </script>
  
  <style scoped>
  .pools-page {
  
    position: relative;
  }
  
  .hero-section {
    position: relative;
    height: 700px;
    background: url('/images/pool-bg.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 180px;
  }
  
  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
  }
  
  .hero-title {
    color: #FFFFFF;
   margin-top: 134px;
    font-weight: 500;
    margin-bottom: 20px;
    
  }
  
  .hero-description {
    color: #FFFFFF;
    margin-bottom: 134px;
   
   
  }
  
  .hero-gallery {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 0 auto;
    max-width: 1342px;
    padding: 0 20px;
    margin-top: auto;
    transform: none;
  }
  
  .gallery-item {
    border-radius: 15px;
    overflow: hidden;
    height: 300px;
    max-width: 100%;
  }
  
  .gallery-item-small {
    width: 375px;
    height: 300px;
    max-width: 100%;
  }
  
  .gallery-item-large {
    width: 570px;
    height: 300px;
    max-width: 100%;
  }
  
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 1024px) {
    .hero-section {
      height: 720px !important;
      justify-content: center;
      padding-top: 0 !important;
    }
    .hero-gallery {
      max-width: 960px;
      padding: 0 10px;
      gap: 8px;
    }
  }
  @media (max-width: 1322px) {
    .hero-gallery {
      
      display: none;
    }
  }
  @media (max-width: 768px) {
    .hero-gallery {
      max-width: 100%;
      padding: 0 4px;
      gap: 6px;
      display: none;
    }
    .gallery-item {
      height: 146px;
    }
    .gallery-item-small {
      width: 194px;
      height: 146px;
    }
    .gallery-item-large {
      width: 292px;
      height: 146px;
    }
  }
  
  @media (max-width: 480px) {
    .hero-section {
      padding-top: 80px;
    }
    .hero-gallery {
      max-width: 100%;
      padding: 0;
      gap: 4px;
    }
  }
  
  @media (max-width: 375px) {
    .hero-section {
      height: 817px !important;
    }
    .hero-section {
      justify-content: center;
      padding-top: 0;
    }
  }
  
  .pool-types {
    padding: 100px 0;
    background: #fff;
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
    gap: 30px;
  }
  
  .pool-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    height: 400px;
    background: #000;
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
    justify-content: flex-start;
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
    background: transparent;
    color: #fff;
    border: 1px solid #fff;
    padding: 12px 30px;
    border-radius: 100px;
    text-decoration: none;
    font-size: 16px;
    transition: all 0.3s ease;
    align-self: flex-start;
  }
  
  .pool-button:hover {
    background: #23A3FF;
    border-color: #23A3FF;
  }
  
  @media (max-width: 768px) {
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
  }
  </style>
  