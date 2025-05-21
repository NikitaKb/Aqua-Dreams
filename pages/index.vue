<script setup lang="ts">


</script>

<template>
    <div>
      
      <main>
      
        <HeroBanner />
        <PoolsAndSaunas />
        <ModularBaths />
        <AboutUsStats />
        <OurProjects />
        <Contacts />
   <Catalog />
        
      </main>
    </div>
  </template>
  
 
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Hanken Grotesk', sans-serif;
    line-height: 1.6;
    min-height: 100vh;
    font-size: 16px;
    overflow-x: hidden;
  }
  
  .container {
    max-width: 1360px;
    margin: 0 auto;
    width: 100%;
    padding: 0 20px;
  }
  
  /* Глобальные стили для кнопок */
  .button-primary {
    background: transparent;
    color: #23A3FF;
    border: 1px solid #23A3FF;
    padding: 16px 40px;
    border-radius: 100px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    text-decoration: none;
  }
  
  .button-primary:hover {
    background: #23A3FF;
    color: white;
  }
  
  h1 {
    font-size: 64px;
    font-weight: 500;
  }
  
  h2 {
    font-size: 48px;
    font-weight: 500;
  }
  
  h3 {
    font-size: 40px;
    font-weight: 500;
  }
  
  h4 {
    font-size: 32px;
    font-weight: 500;
  }
  
  h5 {
    font-size: 24px;
    font-weight: 500;
  }
  
  h6 {
    font-size: 20px;
    font-weight: 500;
  }
  
  @media (max-width: 1440px) {
    h1 {
      font-size: 64px;
    }

    h2 {
      font-size: 48px;
    }

    h3 {
      font-size: 40px;
    }

    h4 {
      font-size: 32px;
    }

    h5 {
      font-size: 24px;
    }

    h6 {
      font-size: 20px;
    }

    body {
      font-size: 16px;
    }

    .button-primary {
      font-size: 16px;
    }
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 48px;
    }

    h2 {
      font-size: 36px;
    }

    h3 {
      font-size: 32px;
    }

    h4 {
      font-size: 24px;
    }

    h5 {
      font-size: 20px;
    }

    h6 {
      font-size: 18px;
    }

    body {
      font-size: 15px;
    }

    .button-primary {
      font-size: 15px;
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 18px;
    }

    h4 {
      font-size: 16px;
    }

    h5 {
      font-size: 14px;
    }

    h6 {
      font-size: 12px;
    }

    body {
      font-size: 14px;
    }

    .button-primary {
      padding: 12px 30px;
      font-size: 14px;
    }

    .container {
      padding: 0 16px;
    }
  }
  
  main {
    min-height: 100vh;
  }
  </style>