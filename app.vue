<template>
  <div>
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<style>
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
  font-size: 18px;
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
  font-size: 72px;
  font-weight: 500;
}

h2 {
  font-size: 54px;
  font-weight: 500;
}

h3 {
  font-size: 45px;
  font-weight: 500;
}

h4 {
  font-size: 36px;
  font-weight: 500;
}

h5 {
  font-size: 27px;
  font-weight: 500;
}

h6 {
  font-size: 22.5px;
  font-weight: 500;
}

main {
  min-height: 100vh;
}
</style>
