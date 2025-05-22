<template>
    <section class="certificates-section">
      <h2 class="section-title blue">Сертификаты</h2>
      <div class="certificates">
        <img src="/public/images/sertifikat.png" alt="Сертификат 1" />
   <img src="/public/images/sertifikat.png" alt="Сертификат 2" />
   <img src="/public/images/sertifikat.png" alt="Сертификат 3" />
   <img src="/public/images/sertifikat.png" alt="Сертификат 4" />
      
</div>
    </section>
  </template>
  
  <style scoped>
  .certificates-section{margin-top: 100px;}
  .section-title {
    text-align: center;
    font-size: 42px;
    margin-bottom: 70px;
  }
  .section-title.blue {
    color: #00aaff;
  }
  .certificates {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
 
  }
  .certificates img {
  
    height: auto;
  }
  @media (max-width: 900px) {
    .section-title {
      font-size: 22px;
      margin-bottom: 30px;
    }
    .certificates {
      gap: 16px;
    }
    .certificates img {
      max-width: 120px;
    }
  }
  @media (max-width: 480px) {
    .certificates-section {
      margin-top: 40px;
    }
    .section-title {
      font-size: 16px;
      margin-bottom: 16px;
    }
    .certificates img {
      max-width: 80px;
    }
  }
  @media (max-width: 375px) {
    .section-title {
      font-size: 12px;
    }
    .certificates img {
      max-width: 50px;
    }
  }
  </style>
  
   