export default defineNuxtPlugin(() => {
  // Оптимизация загрузки шрифтов
  if (process.client) {
    // Предзагрузка критических ресурсов
    const preloadLinks = [
      { rel: 'preload', href: '/images/hero_1.png', as: 'image' },
      { rel: 'preload', href: '/images/hero_2.png', as: 'image' },
      { rel: 'preload', href: '/images/hero_3.png', as: 'image' }
    ];

    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link');
      Object.assign(linkElement, link);
      document.head.appendChild(linkElement);
    });

    // Оптимизация скролла
    let ticking = false;
    const updateScroll = () => {
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });

    // Оптимизация изображений
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    // Оптимизация анимаций
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
  }
}); 