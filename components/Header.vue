<template>
  <header :class="['header', { 'header--dark': isDark }]">
    <div class="container">
      <div class="header-content">
        <NuxtLink to="/" class="logo">
          <img 
            :src="isDark ? '/images/logo_dark.svg' : '/images/wave-logo.svg'" 
            alt="AquaDreams" 
            class="logo-image"
          >
        </NuxtLink>
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item">
              <NuxtLink to="/pools" class="nav-link">БАССЕЙНЫ</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/termo" class="nav-link">ТЕРМА-ЗОНЫ</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/products" class="nav-link">ТОВАРЫ</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/about" class="nav-link">О НАС</NuxtLink>
            </li>
          </ul>
        </nav>
        <button class="burger-menu" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <div class="mobile-menu" :class="{ 'active': isMenuOpen }">
      <nav class="mobile-nav">
        <ul class="mobile-nav-list">
          <li class="mobile-nav-item">
            <NuxtLink to="/pools" class="mobile-nav-link" @click="closeMenu">БАССЕЙНЫ</NuxtLink>
          </li>
          <li class="mobile-nav-item">
            <NuxtLink to="/termo" class="mobile-nav-link" @click="closeMenu">ТЕРМА-ЗОНЫ</NuxtLink>
          </li>
          <li class="mobile-nav-item">
            <NuxtLink to="/products" class="mobile-nav-link" @click="closeMenu">ТОВАРЫ</NuxtLink>
          </li>
          <li class="mobile-nav-item">
            <NuxtLink to="/about" class="mobile-nav-link" @click="closeMenu">О НАС</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)
const isMenuOpen = ref(false)
const SCROLL_THRESHOLD = 1190

const handleScroll = () => {
  isDark.value = window.scrollY > SCROLL_THRESHOLD
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 20px 0;
  transition: all 0.3s ease;
  background: transparent;
}

.header--dark {
  background: #fff;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: block;
}

.logo-image {
  height: 60px;
  width: auto;
  transition: all 0.3s ease;
}

.nav-list {
  display: flex;
  gap: 60px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-size: 16px;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.header--dark .nav-link {
  color: #000;
}

.burger-menu {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 20px;
  position: relative;
  z-index: 2;
}

.burger-menu span {
  display: block;
  width: 100%;
  height: 2px;
  background: #fff;
  position: absolute;
  transition: all 0.3s ease;
}

.burger-menu span:nth-child(1) {
  top: 0;
}

.burger-menu span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.burger-menu span:nth-child(3) {
  bottom: 0;
}

.header--dark .burger-menu span {
  background: #000;
}

.burger-menu.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.burger-menu.active span:nth-child(2) {
  opacity: 0;
}

.burger-menu.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1;
  transition: right 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu.active {
  right: 0;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}

.mobile-nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.mobile-nav-link:hover {
  color: #23A3FF;
}

@media (max-width: 749px) {
  .nav {
    display: none;
  }

  .burger-menu {
    display: block;
  }
}

.line {
  position: absolute;
  right: 0;
  top: 0;
  width: 100vw;
  height: 1px;
  background: #E5E5E5;
  z-index: 1;
}
</style> 