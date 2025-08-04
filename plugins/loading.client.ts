export default defineNuxtPlugin((nuxtApp) => {
  const isLoading = ref(true);
  
  // Функция для скрытия загрузочного экрана
  const hideLoading = () => {
    isLoading.value = false;
  };
  
  // Функция для показа загрузочного экрана
  const showLoading = () => {
    isLoading.value = true;
  };
  
  // Функция для ожидания загрузки всех изображений
  const waitForImages = () => {
    return new Promise<void>((resolve) => {
      const images = document.querySelectorAll('img');
      let loadedCount = 0;
      const totalImages = images.length;
      
      if (totalImages === 0) {
        resolve();
        return;
      }
      
      const checkComplete = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          resolve();
        }
      };
      
      images.forEach((img) => {
        if (img.complete) {
          checkComplete();
        } else {
          img.addEventListener('load', checkComplete);
          img.addEventListener('error', checkComplete); // Обрабатываем ошибки загрузки
        }
      });
    });
  };
  
  // Функция для обработки загрузки страницы
  const handlePageLoad = async () => {
    // Ждем загрузки всех изображений
    await waitForImages();
    // Небольшая задержка для плавности
    setTimeout(() => {
      hideLoading();
    }, 300);
  };
  
  if (process.client) {
    // Инициализация при первой загрузке
    const initializeLoading = async () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handlePageLoad);
      } else {
        await handlePageLoad();
      }
    };
    
    initializeLoading();
    
    // Отслеживаем навигацию между страницами
    nuxtApp.hook('page:start', () => {
      showLoading();
    });
    
    nuxtApp.hook('page:finish', async () => {
      await handlePageLoad();
    });
    
    // Отслеживаем изменения маршрута
    const router = useRouter();
    router.beforeEach((to, from, next) => {
      if (from.path !== to.path) {
        showLoading();
      }
      next();
    });
  }
  
  return {
    provide: {
      isLoading: computed(() => isLoading.value),
      hideLoading,
      showLoading
    }
  };
}); 