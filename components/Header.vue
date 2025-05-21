<template>
  <header :class="[{ 'static-white': staticWhite }, 'header', { 'header--dark': isDark }]">
    <div class="container">
      <div class="header-content">
        <button class="burger-menu" @click="toggleMenu" :class="{ 'active': isMenuOpen }" aria-label="Меню">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <NuxtLink to="/" class="logo">
          <img
            :src="staticWhite ? '/images/logo_dark.svg' : (isDark ? '/images/logo_dark.svg' : '/images/wave-logo.svg')"
            alt="AquaDreams" class="logo-image">
        </NuxtLink>
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item" @mouseenter="openDropdown('pools')" @mouseleave="closeDropdown('pools')">
              <NuxtLink to="/pools" class="nav-link">БАССЕЙНЫ</NuxtLink>
              <transition name="dropdown">
                <div v-show="activeDropdown === 'pools'" class="dropdown-menu pools-dropdown">
                  <NuxtLink to="/pools/concrete" class="dropdown-item">Бетонный бассейн</NuxtLink>
                  <NuxtLink to="/pools/composite" class="dropdown-item">Композитный бассейн</NuxtLink>
                  <NuxtLink to="/pools/frame" class="dropdown-item">Каркасные бассейны</NuxtLink>
                  <NuxtLink to="/pools/fun" class="dropdown-item">Fun Бассейн</NuxtLink>
                  <NuxtLink to="/pools/polymer" class="dropdown-item">Бассейн из пластиковых полимерных панелей</NuxtLink>
                  <NuxtLink to="/pools/formwork" class="dropdown-item">Бассейн из несъёмной бетонной опалубки</NuxtLink>
                </div>
              </transition>
            </li>
            <li class="nav-item" @mouseenter="openDropdown('termo')" @mouseleave="closeDropdown('termo')">
              <NuxtLink to="/termo" class="nav-link">ТЕРМА-ЗОНЫ</NuxtLink>
              <transition name="dropdown">
                <div v-show="activeDropdown === 'termo'" class="dropdown-menu termo-dropdown">
                  <NuxtLink to="/termo/saunas" class="dropdown-item">Сауны</NuxtLink>
                  <NuxtLink to="/termo/hammams" class="dropdown-item">Хамамы</NuxtLink>
                  <NuxtLink to="/termo/baths" class="dropdown-item">Купели</NuxtLink>
                  <NuxtLink to="/termo/steam" class="dropdown-item">Бани</NuxtLink>
                  <NuxtLink to="/termo/experience" class="dropdown-item">Душ впечатлений</NuxtLink>
                  <NuxtLink to="/termo/grands" class="dropdown-item">Grands</NuxtLink>
                </div>
              </transition>
            </li>
            <li class="nav-item">
              <NuxtLink to="/products" class="nav-link">ТОВАРЫ</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/about" class="nav-link">О НАС</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="mobile-menu" :class="{ 'active': isMenuOpen }">
      <button class="close-menu" @click="closeMenu" aria-label="Закрыть меню">
        <span></span>
        <span></span>
      </button>
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue'

const props = defineProps({
  staticWhite: Boolean,
});

const isDark = ref(false)
const isMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)
const SCROLL_THRESHOLD = 1190

const handleScroll = () => {
  if (props.staticWhite) {
    isDark.value = false;
    return;
  }
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

const openDropdown = (name: string) => {
  activeDropdown.value = name
}

const closeDropdown = (name: string) => {
  if (activeDropdown.value === name) {
    activeDropdown.value = null
  }
}

onMounted(() => {
  if (!props.staticWhite) {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  } else {
    isDark.value = false;
  }
})

onUnmounted(() => {
  if (!props.staticWhite) {
    window.removeEventListener('scroll', handleScroll)
  }
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

.static-white {
  background-color: white;
  color: black;
  position: relative;
}

.static-white .nav-link {
  color: #000;
}

.static-white .burger-menu span {
  background: #000;
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

.nav-item {
  position: relative;
}

.nav-link {
  font-size: 16px;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.02em;
  position: relative;
  padding: 10px 0;
}

.header--dark .nav-link {
  color: #000;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 15px 0;
  min-width: 250px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.header--dark .dropdown-menu {
  background: rgba(0, 0, 0, 0.9);
}

.dropdown-item {
  display: block;
  padding: 10px 25px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  text-transform: none;
  font-weight: 400;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #23A3FF;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateY(0) translateX(-50%);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) translateX(-50%);
}

.burger-menu {
  display: none;
  background: none;
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 20px;
  position: relative;
  z-index: 2;
}

.burger-menu span {
  display: block;
  width: 20px;
  height: 1px;
  background: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
}

.burger-menu span:nth-child(1) {
  top: 6px;
}

.burger-menu span:nth-child(2) {
  top: 50%;
  transform: translate(-50%, -50%);
}

.burger-menu span:nth-child(3) {
  bottom: 6px;
}

.close-menu {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.close-menu span {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all 0.3s ease;
}

.close-menu span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close-menu span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.mobile-menu {
  display: none;
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

@media (max-width: 768px) {
  .header-content {
    justify-content: center;
    position: relative;
  }
  .logo {
  display: none;
}
  .burger-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    cursor: pointer;
  }
  .burger-menu span {
    display: block;
    width: 32px;
    height: 2px;
    margin: 2px 0;
    background: white;
    border-radius: 3px;
    transition: 0.3s;
  }
  .logo {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-image {
    height: 48px;
    width: auto;
  }
  .nav {
    display: none !important;
  }
  .mobile-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: -100vw;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    z-index: 1000;
    transition: right 0.3s ease;
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
    gap: 32px;
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
  .mobile-dropdown-list {
    list-style: none;
    margin: 8px 0 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  .mobile-dropdown-link {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    padding-left: 16px;
    transition: color 0.3s ease;
  }
  .mobile-dropdown-link:hover {
    color: #23A3FF;
  }
}

@media (max-width: 375px) {
  .header {
    padding: 10px 0;
  }
  .header-content {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  .logo {
    display: flex !important;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 120px;
  }
  .logo-image {
    height: 32px;
    width: auto;
  }
  .burger-menu {
    width: 40px;
    height: 40px;
    margin-left: 0;
  }
  .burger-menu span {
    width: 24px;
    height: 2px;
    margin: 3px 0;
  }
  .close-menu {
    width: 40px;
    height: 40px;
    top: 10px;
    right: 10px;
  }
  .close-menu span {
    width: 28px;
    height: 2px;
  }
  .mobile-menu {
    padding-top: 40px;
  }
  .mobile-nav-list {
    gap: 20px;
  }
  .mobile-nav-link {
    font-size: 18px;
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

/* Анимация подчеркивания для навигации */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #23A3FF;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.header--dark .nav-link::after {
  background: #23A3FF;
}
</style>