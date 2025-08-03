export default defineNuxtPlugin(() => {
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
  
  // Скрываем загрузочный экран когда страница и все изображения загружены
  if (process.client) {
    const initializeLoading = async () => {
      // Ждем загрузки DOM
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', async () => {
          // Ждем загрузки всех изображений
          await waitForImages();
          // Небольшая задержка для плавности
          setTimeout(() => {
            hideLoading();
          }, 500);
        });
      } else {
        // DOM уже загружен, ждем только изображения
        await waitForImages();
        setTimeout(() => {
          hideLoading();
        }, 500);
      }
    };
    
    initializeLoading();
  }
  
  return {
    provide: {
      isLoading: computed(() => isLoading.value),
      hideLoading,
      showLoading
    }
  };
}); 