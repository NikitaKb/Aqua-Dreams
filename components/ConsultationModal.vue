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
        <button type="submit" class="modal-submit">Получить консультацию</button>
      </form>
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
});
const phoneError = ref('');

watch(() => props.show, (val) => {
  if (val) {
    form.fullName = '';
    form.phone = '';
    phoneError.value = '';
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
  if (!validatePhone(form.phone)) {
    phoneError.value = 'Введите номер в формате +7 (XXX) XXX-XX-XX';
    return;
  }
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
    alert('Заявка успешно отправлена!');
    props.onClose();
  } catch (error) {
    alert('Ошибка при отправке. Попробуйте позже.');
    console.error(error);
  }
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
</style> 