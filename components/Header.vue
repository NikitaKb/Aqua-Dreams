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
                  <NuxtLink
                    v-for="pool in pools"
                    :key="pool.slug"
                    :to="`/pools/${pool.slug}`"
                    class="dropdown-item"
                  >
                    {{ pool.name }}
                  </NuxtLink>
                </div>
              </transition>
            </li>
            <li class="nav-item" @mouseenter="openDropdown('termo')" @mouseleave="closeDropdown('termo')">
              <NuxtLink to="/termo" class="nav-link">ТЕРМА-ЗОНЫ</NuxtLink>
              <transition name="dropdown">
                <div v-show="activeDropdown === 'termo'" class="dropdown-menu termo-dropdown">
                  <NuxtLink
                    v-for="termo in termoTypes"
                    :key="termo.slug"
                    :to="`/termo/${termo.slug}`"
                    class="dropdown-item"
                  >
                    {{ termo.name }}
                  </NuxtLink>
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
import { getApiUrl } from '~/config/api'

interface Pool {
  name: string;
  slug: string;
}

interface TermoType {
  name: string;
  slug: string;
}

const pools = ref<Pool[]>([])
const termoTypes = ref<TermoType[]>([])

onMounted(async () => {
  try {
    const res = await fetch(getApiUrl('/api/pools/'))
    pools.value = await res.json()
  } catch (e) {
    pools.value = []
  }
  try {
    const res = await fetch(getApiUrl('/api/terms/'))
    termoTypes.value = await res.json()
  } catch (e) {
    termoTypes.value = []
  }
})

const props = defineProps({
  staticWhite: Boolean,
});

const isDark = ref(false)
const isMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)
const SCROLL_THRESHOLD = 1

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
  -webkit-transition: all 0.3s ease;
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: block;
  margin-right: 40px;
}

.logo-image {
  height: 60px;
  width: auto;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.nav {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.nav-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-around;
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
  -webkit-transition: color 0.3s ease;
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
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  -webkit-border-radius: 8px;
  border-radius: 8px;
  padding: 15px 0;
  min-width: 250px;
  -webkit-box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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
  -webkit-transition: all 0.3s ease;
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
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  opacity: 1;
  -webkit-transform: translateY(0) translateX(-50%);
  transform: translateY(0) translateX(-50%);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  -webkit-transform: translateY(-10px) translateX(-50%);
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
  height: 1px;
  background: #fff;
  position: absolute;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-border-radius: 1px;
  border-radius: 1px;
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
  -webkit-transform: translateY(9px) rotate(45deg);
  transform: translateY(9px) rotate(45deg);
}

.burger-menu.active span:nth-child(2) {
  opacity: 0;
}

.burger-menu.active span:nth-child(3) {
  -webkit-transform: translateY(-9px) rotate(-45deg);
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
  -webkit-transition: right 0.3s ease;
  transition: right 0.3s ease;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.mobile-menu.active {
  right: 0;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  gap: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.mobile-nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.02em;
  -webkit-transition: color 0.3s ease;
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

  .header-content {
    justify-content: space-between;
  }

  .header {
    /* Adjust header padding/height if needed for smaller logo */
  }

  .logo-image {
    height: 40px; /* Smaller height for mobile */
    width: auto;
  }
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
  -webkit-transition: width 0.3s ease;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.header--dark .nav-link::after {
  background: #23A3FF;
}
</style>