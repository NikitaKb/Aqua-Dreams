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
  </style>
  
   