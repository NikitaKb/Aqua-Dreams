<template>
  <section class="termo-details-page">
    <div class="container">
      <div class="termo-main-block">
        <div class="termo-image-block">
          <div class="termo-slider">
            <img :src="imageSrc" :alt="termoTitle" class="termo-main-image" />
          </div>
        </div>
        <div class="termo-info-block">
          <h1 class="termo-title">{{ termoTitle }}</h1>
          <p class="termo-description">{{ termoDescription }}</p>
          <button class="termo-consult-btn" @click="showModal = true">Бесплатная консультация</button>
        </div>
      </div>
      <div class="termo-advantages-block container">
        <h2 class="advantages-title">Преимущества</h2>
        <div class="advantages-columns">
          <div class="advantages-col">
            <div class="advantage-item" v-for="(advantage, idx) in leftAdvantages" :key="advantage.title">
              <div class="advantage-number">{{ idx * 2 + 1 }}</div>
              <div>
                <div class="advantage-title">{{ advantage.title }}</div>
                <div class="advantage-text">{{ advantage.text }}</div>
              </div>
            </div>
          </div>
          <div class="advantages-col">
            <div class="advantage-item" v-for="(advantage, idx) in rightAdvantages" :key="advantage.title">
              <div class="advantage-number">{{ idx * 2 + 2 }}</div>
              <div>
                <div class="advantage-title">{{ advantage.title }}</div>
                <div class="advantage-text">{{ advantage.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно консультации -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <button class="modal-close" @click="showModal = false">&times;</button>
        <h2 class="modal-title">Получить бесплатную консультацию</h2>
        <form class="modal-form" @submit.prevent="submitConsultation">
          <input v-model="form.firstName" type="text" placeholder="Имя" required class="modal-input" />
          <input v-model="form.lastName" type="text" placeholder="Фамилия" required class="modal-input" />
          <input v-model="form.phone" type="tel" placeholder="Телефон" required class="modal-input" />
          <button type="submit" class="modal-submit">Получить консультацию</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { defineProps } from 'vue';

const props = defineProps<{ type: string }>();

const termoTitles: Record<string, string> = {
  saunas: 'Сауны',
  hammams: 'Хаммамы',
  kupel: 'Купели',
  bany: 'Бани',
  dush: 'Душ впечатлений Granda',
};

const termoDescriptions: Record<string, string> = {
  saunas: 'Сауна — это идеальное место для отдыха с максимальной пользой для здоровья. Сухой пар, температура до 100 градусов. Для любителей классического парения. Финские сауны отличаются особой атмосферой и качеством используемых материалов.',
  hammams: 'Хаммам, или турецкая баня — древняя традиция оздоровления. При идеальной влажности воздуха и температуре до 50 градусов, организм мягко прогревается. Это отличный способ для релаксации, а также ухода за кожей.',
  kupel: 'Купель — это особый вид бассейна для охлаждения после бани или сауны. Традиционно изготавливается из натурального дерева. Идеальное дополнение к любой бане для контрастных процедур.',
  bany: 'Русская баня из натурального бревна или бруса — это традиционная и классическая парная. Это совершенство в простоте, где каждая деталь продумана для создания правильного микроклимата и получения максимума пользы.',
  dush: 'Душ впечатлений Granda — уникальная spa-процедура, которая сочетает в себе воздействие воды разной температуры и напора, хромотерапию, ароматерапию. Позволяет восстановить силы после тренировок, снять стресс и получить заряд бодрости.',
};

const termoImages: Record<string, string> = {
  saunas: '/images/sauna_bl.png',
  hammams: '/images/hammam_bl.png',
  kupel: '/images/kupel_bl.png',
  bany: '/images/bany_bl.png',
  dush: '/images/dush_bl.png',
};

const termoAdvantages: Record<string, {title: string, text: string}[]> = {
  saunas: [
    { title: 'Оздоровительный эффект', text: 'Сауна способствует укреплению иммунитета, улучшает кровообращение и общее самочувствие.' },
    { title: 'Индивидуальный дизайн', text: 'Возможность выбора отделки, размеров и планировки под ваш вкус.' },
    { title: 'Долговечность', text: 'Использование качественных материалов обеспечивает долгий срок службы.' },
    { title: 'Простота эксплуатации', text: 'Современные системы управления делают использование сауны максимально удобным.' },
  ],
  hammams: [
    { title: 'Мягкий климат', text: 'Низкая температура и высокая влажность подходят даже для людей с чувствительной кожей.' },
    { title: 'Расслабление и уход за кожей', text: 'Пар и процедуры в хаммаме способствуют глубокому очищению и увлажнению кожи.' },
    { title: 'Эстетика и атмосфера', text: 'Восточный стиль и мозаика создают особую атмосферу релакса.' },
    { title: 'Универсальность', text: 'Хаммам можно оборудовать в частном доме, квартире или spa-комплексе.' },
  ],
  kupel: [
    { title: 'Контрастные процедуры', text: 'Купель идеально подходит для охлаждения после парной, усиливая оздоровительный эффект.' },
    { title: 'Экологичность', text: 'Изготавливается из натурального дерева или современных материалов.' },
    { title: 'Компактность', text: 'Не занимает много места, легко вписывается в любой интерьер.' },
    { title: 'Простота ухода', text: 'Современные купели просты в обслуживании и долговечны.' },
  ],
  bany: [
    { title: 'Традиции и здоровье', text: 'Русская баня — это не только отдых, но и профилактика многих заболеваний.' },
    { title: 'Натуральные материалы', text: 'Использование дерева создает особый микроклимат и аромат.' },
    { title: 'Гибкость планировки', text: 'Можно реализовать любые пожелания по размерам и внутреннему устройству.' },
    { title: 'Долговечность', text: 'Качественная баня служит десятилетиями.' },
  ],
  dush: [
    { title: 'Многофункциональность', text: 'Сочетает в себе различные режимы подачи воды, световые и ароматические эффекты.' },
    { title: 'Релаксация и восстановление', text: 'Идеально подходит для снятия стресса и восстановления после физических нагрузок.' },
    { title: 'Современные технологии', text: 'Инновационные системы управления и безопасности.' },
    { title: 'Индивидуальный подход', text: 'Возможность настройки под личные предпочтения.' },
  ],
};

const termoTitle = computed(() => termoTitles[props.type] || props.type);
const termoDescription = computed(() => termoDescriptions[props.type] || '');
const imageSrc = computed(() => termoImages[props.type] || '/images/sauna_bl.png');
const advantages = computed(() => termoAdvantages[props.type] || termoAdvantages['saunas']);

const leftAdvantages = computed(() => [advantages.value[0], advantages.value[2]]);
const rightAdvantages = computed(() => [advantages.value[1], advantages.value[3]]);

const showModal = ref(false);
const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
});

function submitConsultation() {
  // Логируем данные и инфо о кнопке
  console.log('Была нажата кнопка: Бесплатная консультация');
  console.log('Данные пользователя:', {
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
  });
  showModal.value = false;
  // Очищаем форму (по желанию)
  form.firstName = '';
  form.lastName = '';
  form.phone = '';
}
</script>

<style scoped>
.termo-details-page {
  background: #fff;
  min-height: 100vh;
  padding: 40px 0 0 0;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.termo-main-block {
  display: flex;
  align-items: flex-start;
  gap: 60px;
}

.termo-image-block {
  flex: 1 1 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.termo-slider {
  position: relative;
  width: 100%;
  max-width: 760px;
  aspect-ratio: 760 / 490;
  background: #eee;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.termo-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  display: block;
}

.termo-info-block {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
}

.termo-title {
  color: #C4944C;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 24px;
}

.termo-description {
  color: #222;
  font-size: 18px;
  margin-bottom: 32px;
  line-height: 1.5;
}

.termo-consult-btn {
  background: transparent;
  color: #C4944C;
  border: 2px solid #C4944C;
  border-radius: 16px;
  padding: 35px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.termo-consult-btn:hover {
  background: #C4944C;
  color: #fff;
}

.termo-advantages-block {
  margin: 60px 0 0 0;
}

.advantages-title {
  text-align: center;
  font-size: 32px;
  color: #222;
  margin-bottom: 40px;
  font-weight: 500;
}

.advantages-columns {
  display: flex;
  gap: 60px;
  justify-content: center;
}

.advantages-col {
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1 1 50%;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.advantage-number {
  color: #C4944C;
  font-size: 64px;
  font-weight: 600;
  line-height: 1;
  min-width: 60px;
}

.advantage-title {
  font-size: 20px;
  font-weight: 500;
  color: #222;
  margin-bottom: 8px;
}

.advantage-text {
  font-size: 15px;
  color: #444;
  line-height: 1.5;
}
@media (max-width: 1024px) {
  .termo-main-block {
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }
  .termo-info-block {
    margin-top: 0;
    align-items: center;
  }
  .termo-title {
    font-size: 36px;
    text-align: center;
  }
  .termo-description {
    text-align: center;
  }
  .advantages-columns {
    flex-direction: column;
    gap: 30px;
  }
  .advantages-col {
    gap: 30px;
  }
  .advantage-number {
    font-size: 40px;
    min-width: 40px;
  }
  .termo-slider {
    max-width: 100%;
    aspect-ratio: 760 / 490;
  }
}
@media (max-width: 600px) {
  .termo-main-block {
    padding: 0 10px;
  }
  .termo-title {
    font-size: 24px;
  }
  .advantage-number {
    font-size: 28px;
    min-width: 28px;
  }
  .termo-slider {
    max-width: 100%;
    aspect-ratio: 760 / 490;
  }
}

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
  color: #C4944C;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #a97a2e;
}
.modal-title {
  color: #C4944C;
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
  border: 1.5px solid #C4944C;
  font-size: 16px;
  outline: none;
  transition: border 0.2s;
}
.modal-input:focus {
  border-color: #a97a2e;
}
.modal-submit {
  background: #C4944C;
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
  background: #a97a2e;
}
</style> 