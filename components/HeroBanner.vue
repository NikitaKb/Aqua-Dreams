<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <img src="/images/wave-logo.svg" alt="Aqua Dreams" class="hero-logo" />
        <p class="hero-subtitle">ВАШ ПУТЬ К ИДЕАЛЬНОМУ БАССЕЙНУ</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 100vh;
  width: 100vw;
  background-image: url('/images/pool-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.hero-logo {
  height: 137px;
  width: 346px;
  object-fit: contain;
  margin-bottom: 20px;
}

.hero-subtitle {
  margin-top: 20px;
  font-size: 27px;
  letter-spacing: 2px;
  font-weight: 400;
}

@media (max-width: 480px) {
  .hero-logo {
    height: 80px;
    width: 200px;
    margin-bottom: 16px;
  }

  .hero-subtitle {
    font-size: 14px;
    letter-spacing: 1px;
    margin-top: 16px;
  }

  .container {
    padding: 0 16px;
  }
}

@media (max-width: 1024px) {
  .hero-logo {
    height: 100px;
    width: 250px;
    margin-bottom: 16px;
  }
  .hero-subtitle {
    font-size: 18px;
    letter-spacing: 1px;
    margin-top: 16px;
  }
  .container {
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  .hero {
    width: 768px;
    height: 570px;
    background-image: url('/images/pool-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 0;
  }
  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .hero-logo {
    height: 90px;
    width: 220px;
    object-fit: contain;
    margin-bottom: 18px;
  }
  .hero-subtitle {
    margin-top: 18px;
    font-size: 18px;
    letter-spacing: 1.5px;
    font-weight: 400;
    color: #fff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.25);
  }
  .container {
    padding: 0 16px;
  }
}

@media (max-width: 375px) {
  .hero {
    height: 100vh;
    width: 100vw;
    min-height: 500px;
  }
  .hero-logo {
    height: 60px;
    width: 120px;
    margin-bottom: 12px;
  }
  .hero-subtitle {
    font-size: 12px;
    margin-top: 12px;
    letter-spacing: 0.5px;
  }
  .container {
    padding: 0 8px;
  }
}
</style> 