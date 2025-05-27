<template>
  <section class="contacts">
    <div class="container">
      <div class="contacts-content">
        <div class="contacts-form">
          <h2 class="contacts-title">КОНТАКТЫ</h2>
          <p class="contacts-subtitle">Оставьте свои контакты и мы свяжемся с вами в ближайшее время</p>
          
          <form @submit.prevent="handleSubmit" class="form">
            <div class="form-group">
              <input 
                type="text" 
                placeholder="Ваше имя*"
                v-model="form.name"
                class="form-input"
              >
            </div>
            <div class="form-group">
              <input 
                type="tel" 
                placeholder="+7 XXX XXX XX XX*"
                :value="formatPhone(form.phone)"
                @input="onPhoneInput"
                class="form-input"
                maxlength="18"
              >
            </div>
            <button type="submit" class="submit-button">
              Перезвоните мне
            </button>
            <div v-if="error" style="color: #e53935; margin-top: 10px;">{{ error }}</div>
            <div v-if="success" style="color: #23A3FF; margin-top: 10px;">Спасибо! Мы свяжемся с вами.</div>
          </form>

          <div class="additional-contacts">
            <p class="contacts-text">Или свяжитесь с нами по этим контактам:</p>
            <div class="contact-items">
              <a href="mailto:info@aquadreams.ru" class="contact-item">
                <img src="/images/email.svg" alt="Email" class="contact-icon">
                <div class="contact-info">
                  <span class="contact-value">info@aquadreams.ru</span>
                  <span class="contact-label">Есть вопросы? Пишите нам</span>
                </div>
              </a>
              <a href="tel:+74951539622" class="contact-item">
                <img src="/images/phone.svg" alt="Phone" class="contact-icon">
                <div class="contact-info">
                  <span class="contact-value">+7 (495) 153-96-22</span>
                  <span class="contact-label">Пн-Пт с 09:00 до 19:00</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div class="contacts-map" ref="mapContainer"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getApiUrl } from '~/config/api'

interface FormData {
  name: string;
  phone: string;
}

interface Window {
  ymaps: any;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const form = ref<FormData>({
  name: '',
  phone: ''
})

const error = ref<string>('');
const success = ref<boolean>(false);
const mapContainer = ref<HTMLElement | null>(null);

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(phone);
};

const formatPhone = (value: string): string => {
  let digits = value.replace(/\D/g, '');

  // Remove starting 7 if present, since +7 is fixed prefix
  if (digits.startsWith('7')) {
    digits = digits.slice(1);
  } else if (digits.startsWith('8')) {
    // Allow starting with 8 as well (sometimes Russians enter 8)
    digits = digits.slice(1);
  }

  if (digits.length > 10) {
    digits = digits.slice(0, 10);
  }

  let formattedValue = '+7 ';

  if (digits.length > 0) {
    formattedValue += '(' + digits.slice(0, 3);
  }
  if (digits.length >= 4) {
    formattedValue += ') ' + digits.slice(3, 6);
  }
  if (digits.length >= 7) {
    formattedValue += '-' + digits.slice(6, 8);
  }
  if (digits.length >= 9) {
    formattedValue += '-' + digits.slice(8, 10);
  }
  
  return formattedValue;
};

const onPhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const rawValue = input.value;

  // Удаляем всё кроме цифр
  let digits = rawValue.replace(/\D/g, '');

  // Убираем ведущие 7 или 8, если есть
  if (digits.startsWith('7')) digits = digits.slice(1);
  if (digits.startsWith('8')) digits = digits.slice(1);

  // Ограничиваем до 10 цифр
  if (digits.length > 10) digits = digits.slice(0, 10);

  const formatted = formatPhone(digits);

  form.value.phone = formatted;
  input.value = formatted;
};

const initMap = () => {
  if (window.ymaps && mapContainer.value) {
    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapContainer.value, {
        center: [47.225738, 39.618516], // Москва
        zoom: 15,
        controls: ['zoomControl', 'fullscreenControl']
      });

      // Добавляем маркер
      const marker = new window.ymaps.Placemark([47.225738, 39.618516], {
        balloonContent: 'Aquadreams'
      }, {
        preset: 'islands#blueStretchyIcon'
      });

      map.geoObjects.add(marker);
    });
  }
};

onMounted(() => {
  // Загружаем скрипт Яндекс.Карт
  const script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=a0c7ab2a-6296-4652-aa6e-cc6427b9bc2a&lang=ru_RU';
  script.async = true;
  script.onload = initMap;
  document.head.appendChild(script);
});

const handleSubmit = async (): Promise<void> => {
  error.value = '';
  success.value = false;
  
  if (!form.value.name) {
    error.value = 'Пожалуйста, введите ваше имя';
    return;
  }
  
  if (!validatePhone(form.value.phone)) {
    error.value = 'Введите номер в формате +7 (XXX) XXX-XX-XX';
    return;
  }

  try {
    const response = await fetch(getApiUrl('/api/contact/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: form.value.name,
        phone: form.value.phone,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      error.value = 'Ошибка при отправке: ' + errorText;
      return;
    }
    success.value = true;
    form.value.name = '';
    form.value.phone = '';
  } catch (e: unknown) {
    error.value = 'Ошибка при отправке. Попробуйте позже.';
  }
}
</script>

<style scoped>
.contacts {
 margin-top: 100px;
  background: #fff;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.contacts-content {
  display: flex;
  gap: 30px;
}

.contacts-form {
  flex: 1;
  max-width: 660px;
}

.contacts-map {
  flex: 1;
  height: 560px;
  width: 100%;
  transition: all 0.3s ease;
}

.contacts-title {
  font-size: 48px;
  color: #000;
  margin-bottom: 8px;
  font-weight: 500;
}

.contacts-subtitle {
  font-size: 16px;
  color: #000;
  margin-bottom: 32px;
  font-weight: 400;
}

.form {
  margin-bottom: 32px;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  margin-bottom: 12px;
  width: 100%;
}

.form-input {
  width: 100%;
  height: 56px;
  border: 1px solid #E5E7EB;
  border-radius: 100px;
  padding: 0 24px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  background: #fff;
}

.form-input:focus {
  border-color: #23A3FF;
}

.form-input::placeholder {
  color: #000;
  opacity: 0.4;
}

.submit-button {
  width: 260px;
  height: 60px;
  background: #23A3FF;
  border: none;
  border-radius: 100px;
  color: white;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin-top: 20px;
  align-self: flex-start;
}

.submit-button:hover {
  opacity: 0.9;
}

.contacts-text {
  font-size: 16px;
  color: #000;
  margin-bottom: 24px;
}

.contact-items {
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

.contact-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-value {
  font-size: 16px;
  color: #23A3FF;
  font-weight: 400;
}
.contact-value-p{
  font-size: 16px;
  color: #23A3FF;
  font-weight: 400;
}

.contact-label {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
}

@media (max-width: 1200px) {
  .contacts-content {
    flex-direction: column;
  }

  .contacts-form {
    max-width: 100%;
  }

  .contacts-map {
    height: 400px;
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .contacts {
    margin-top: 60px;
  }
  
  .contacts-content {
    display: flex;
    flex-direction: row;
    gap: 24px;
    align-items: stretch;
  }
  
  .contacts-form {
    max-width: 50%;
    height: 415px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .form {
    margin-bottom: 20px;
  }
  
  .additional-contacts {
    margin-top: auto;
  }

  .contact-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .contact-item:first-child {
    display: none;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .contacts-map {
    width: 450px;
    height: 415px;
    flex-shrink: 0;
  }
  
  .contacts-title {
    font-size: 28px;
    margin-bottom: 8px;
  }
  
  .contacts-subtitle {
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  .form-input {
    font-size: 14px;
    height: 48px;
    padding: 0 18px;
  }
  
  .submit-button {
    font-size: 14px;
    height: 48px;
    width: 200px;
  }
  
  .contact-icon {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 768px) {
  .contacts {
    display: none;
  }

  .contacts-title {
    font-size: 42px;
  }

  .contacts-subtitle {
    font-size: 16px;
  }

  .contacts-map {
    height: 300px;
  }

  .contact-items {
    flex-direction: column;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .contacts-content {
    flex-direction: column;
    gap: 20px;
  }

  .contacts-form {
    max-width: 100%;
  }

  .contacts-map {
    height: 300px;
  }

  .contacts-title {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .contacts-subtitle {
    font-size: 14px;
    margin-bottom: 24px;
  }

  .form {
    margin-bottom: 24px;
  }

  .form-input {
    height: 48px;
    font-size: 14px;
    padding: 0 20px;
  }

  .submit-button {
    width: 100%;
    height: 48px;
    font-size: 14px;
    margin-top: 16px;
  }

  .contacts-text {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .contact-items {
    gap: 20px;
  }

  .contact-icon {
    width: 40px;
    height: 40px;
  }

  .contact-info {
    font-size: 14px;
  }

  .contact-value {
    font-size: 14px;
  }

  .contact-label {
    font-size: 12px;
  }
}
</style> 