<template>
  <header :class="[{ 'static-white': staticWhite }, 'header', { 'header--dark': isDark }]">
    <div class="container">
      <div class="header-content">
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
                  <NuxtLink to="/pools/karkasnye-bassejny-fun" class="dropdown-item">Каркасные бассейны</NuxtLink>
                  <NuxtLink to="/pools/karkasnye-bassejny-fun" class="dropdown-item">Fun Бассейн</NuxtLink>
                  <NuxtLink to="/pools/bassejn-iz-plastikovyh-polimernyh-panelej" class="dropdown-item">Бассейн из пластиковых полимерных панелей</NuxtLink>
                  <NuxtLink to="/pools/bassejn-iz-nesyomnoj-betonnoj-opalubki" class="dropdown-item">Бассейн из несъёмной бетонной опалубки</NuxtLink>
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue'


const pools = ref([]);

onMounted(async () => {
  const res = await fetch('http://localhost:8000/api/pools/');
  pools.value = await res.json();
});
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

@media (max-width: 768px) {
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