<template>
  <div v-if="show" class="modal-overlay" @click.self="onClose()">
    <div class="modal-content">
      <button class="modal-close" @click="onClose()">&times;</button>
      <h2 class="modal-title">Получить бесплатную консультацию</h2>
      <form class="modal-form" @submit.prevent="submitConsultation">
        <input v-model="form.fullName" type="text" placeholder="ФИО" required class="modal-input" />
        <input
          :value="getMaskedPhone()"
          @input="onPhoneInput"
          type="tel"
          placeholder="Телефон"
          required
          class="modal-input"
          maxlength="18"
        />
        <div v-if="phoneError" class="modal-error">{{ phoneError }}</div>
        
        <!-- Согласие на обработку персональных данных -->
        <div class="privacy-checkbox">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="form.privacyAgreement" 
              class="checkbox-input"
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text">
              Я согласен на обработку 
              <a href="/privacy" target="_blank" class="privacy-link">персональных данных</a>
            </span>
          </label>
        </div>
        
        <div v-if="privacyError" class="modal-error">{{ privacyError }}</div>
        
        <button type="submit" class="modal-submit" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="loading-spinner"></span>
          {{ isSubmitting ? 'Отправка...' : 'Получить консультацию' }}
        </button>
      </form>
    </div>
    
    <!-- Уведомление об успешной отправке -->
    <div v-if="showSuccess" class="success-notification">
      <div class="success-content">
        <div class="success-icon">✓</div>
        <h3>Заявка отправлена!</h3>
        <p>Мы свяжемся с вами в ближайшее время</p>
        <button @click="closeSuccess" class="success-button">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { getApiUrl } from '~/config/api'

const props = defineProps<{
  show: boolean,
  onClose: () => void,
  slug: string,
  name: string,
}>();

const form = reactive({
  fullName: '',
  phone: '',
  privacyAgreement: false,
});
const phoneError = ref('');
const privacyError = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);

watch(() => props.show, (val) => {
  if (val) {
    form.fullName = '';
    form.phone = '';
    form.privacyAgreement = false;
    phoneError.value = '';
    privacyError.value = '';
    showSuccess.value = false;
  }
});

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);
  let result = '+7';
  if (digits.length > 1) result += ' (' + digits.slice(1, 4);
  if (digits.length >= 4) result += ') ' + digits.slice(4, 7);
  if (digits.length >= 7) result += '-' + digits.slice(7, 9);
  if (digits.length >= 9) result += '-' + digits.slice(9, 11);
  return result;
}

function onPhoneInput(e: Event) {
  const input = e.target as HTMLInputElement;
  let digits = input.value.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);
  form.phone = digits;
}

function getMaskedPhone() {
  return formatPhone(form.phone);
}

function validatePhone(phone: string) {
  return phone.length === 11 && phone.startsWith('7');
}

async function submitConsultation() {
  phoneError.value = '';
  privacyError.value = '';
  
  // Проверка согласия на обработку персональных данных
  if (!form.privacyAgreement) {
    privacyError.value = 'Необходимо согласие на обработку персональных данных';
    return;
  }
  
  if (!validatePhone(form.phone)) {
    phoneError.value = 'Введите номер в формате +7 (XXX) XXX-XX-XX';
    return;
  }
  
  isSubmitting.value = true;
  
  const payload = {
    fullName: form.fullName,
    phone: '+' + form.phone,
    slug: props.slug,
    name: props.name,
  };
  
  try {
    const response = await fetch(getApiUrl('/api/contact/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', response.status, errorText);
      throw new Error('Ошибка при отправке формы');
    }
    
    showSuccess.value = true;
  } catch (error) {
    alert('Ошибка при отправке. Попробуйте позже.');
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
}

function closeSuccess() {
  showSuccess.value = false;
  props.onClose();
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 40px 32px 32px 32px;
  min-width: 320px;
  max-width: 95vw;
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-close {
  position: absolute;
  top: 18px;
  right: 22px;
  background: none;
  border: none;
  font-size: 32px;
  color: #23A3FF;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #1e8edf;
}
.modal-title {
  color: #23A3FF;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 28px;
  text-align: center;
}
.modal-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.modal-input {
  padding: 14px 18px;
  border-radius: 10px;
  border: 1.5px solid #23A3FF;
  font-size: 16px;
  outline: none;
  transition: border 0.2s;
}
.modal-input:focus {
  border-color: #1e8edf;
}
.modal-submit {
  background: #23A3FF;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 18px 0;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}
.modal-submit:hover {
  background: #1e8edf;
}
.modal-error {
  color: #e53935;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: left;
}

/* Стили для чекбокса согласия */
.privacy-checkbox {
  margin: 15px 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.4;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #23A3FF;
  border-radius: 4px;
  background: #fff;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-input:checked + .checkbox-custom {
  background: #23A3FF;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.checkbox-text {
  color: #333;
}

.privacy-link {
  color: #23A3FF;
  text-decoration: underline;
}

.privacy-link:hover {
  color: #1e8edf;
}

/* Стили для кнопки отправки */
.modal-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Стили для уведомления об успехе */
.success-notification {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-content {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  margin: 0 auto 20px;
}

.success-content h3 {
  color: #23A3FF;
  font-size: 24px;
  margin-bottom: 10px;
}

.success-content p {
  color: #666;
  font-size: 16px;
  margin-bottom: 25px;
}

.success-button {
  background: #23A3FF;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.success-button:hover {
  background: #1e8edf;
}
</style> 