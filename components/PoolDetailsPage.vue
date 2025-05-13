<template>
  <section class="pool-details-page">
    <div class="container">
      <div class="pool-main-block">
        <div class="pool-image-block">
          <div class="pool-slider">
            <img :src="currentImage" :alt="poolTitle" class="pool-main-image" />
            <button v-if="images.length > 1" class="slider-arrow left" @click="prevImage">&#60;</button>
            <button v-if="images.length > 1" class="slider-arrow right" @click="nextImage">&#62;</button>
          </div>
        </div>
        <div class="pool-info-block">
          <h1 class="pool-title">{{ poolTitle }}</h1>
          <p class="pool-description">{{ poolDescription }}</p>
          <button class="pool-consult-btn" @click="showModal = true">Бесплатная консультация</button>
        </div>
      </div>
      <div class="pool-advantages-block">
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

const poolTitles: Record<string, string> = {
  concrete: 'Бетонный бассейн',
  composite: 'Композитный бассейн',
  frame: 'Каркасный бассейн',
  spa: 'СПА-бассейн',
  fun: 'Каркасный бассейн Fun',
  polymer: 'Бассейн из пластиковых полимерных панелей',
  formwork: 'Бассейн из несъёмной бетонной опалубки',
};

const poolDescriptions: Record<string, string> = {
  concrete: 'Бассейн под ключ – это комплексное решение, включающее проектирование, строительство и отделку бассейна из монолитного бетона. Такой вариант отличается высокой прочностью, долговечностью и возможностью создания индивидуальной формы и размера.',
  composite: 'Композитные бассейны — это цельные чаши из современных материалов, отличающиеся быстрым монтажом, долговечностью и разнообразием форм. Отличный выбор для тех, кто ценит комфорт и стиль.',
  frame: 'Каркасные бассейны — это сборные конструкции, простые в установке и обслуживании. Идеальны для сезонного использования и семейного отдыха на даче.',
  spa: 'СПА-бассейн — это компактное решение для релаксации и гидромассажа, подходящее для дома или улицы. Позволяет наслаждаться водными процедурами круглый год.',
  fun: 'Каркасные бассейны Fun — это легкие и мобильные бассейны, которые быстро собираются и разбираются. Отличный вариант для летнего отдыха всей семьёй.',
  polymer: 'Бассейны из пластиковых полимерных панелей — это современное и высокотехнологичное решение для создания мест для купания и отдыха как на открытом воздухе, так и в помещении.',
  formwork: 'Бассейн из несъёмной бетонной опалубки — это надежное и долговечное решение для создания индивидуального водоема на вашем участке. Отличается простотой монтажа и высокой прочностью.',
};

const poolImages: Record<string, string[]> = {
  concrete: ['/images/b-pools.png'],
  composite: ['/images/kom-pools.png'],
  frame: ['/images/kar-pools.png'],
  spa: ['/images/spa-pools.png'],
  fun: ['/images/fun-pools.png'],
  polymer: ['/images/pl-pools.png'],
  formwork: ['/images/bo-pools.png'],
};

const poolAdvantages: Record<string, {title: string, text: string}[]> = {
  concrete: [
    { title: 'Прочность и долговечность', text: 'Бетонные бассейны очень прочные и устойчивы к различным воздействиям, включая перепады температур и влажности.' },
    { title: 'Возможность создания различных форм и размеров', text: 'Бетон позволяет создавать бассейны любой формы и размера, как традиционные, так и фигурные.' },
    { title: 'Индивидуальный дизайн', text: 'Бетонный бассейн можно облицевать разными материалами, такими как плитка, мозаика, камень, что позволяет создать уникальный дизайн.' },
    { title: 'Устойчивость к высоким нагрузкам', text: 'Бетон выдерживает большие нагрузки, что делает его подходящим для различных типов бассейнов.' },
  ],
  composite: [
    { title: 'Быстрый монтаж', text: 'Композитные бассейны устанавливаются за считанные дни благодаря цельной чаше.' },
    { title: 'Гладкая поверхность', text: 'Современные материалы обеспечивают приятную на ощупь и безопасную поверхность.' },
    { title: 'Долговечность', text: 'Композит устойчив к химии и ультрафиолету, не требует сложного ухода.' },
    { title: 'Разнообразие форм', text: 'Большой выбор форм и размеров на любой вкус.' },
  ],
  frame: [
    { title: 'Быстрая сборка', text: 'Каркасный бассейн можно собрать самостоятельно без специальных навыков.' },
    { title: 'Доступная цена', text: 'Каркасные бассейны — один из самых бюджетных вариантов для дачи.' },
    { title: 'Мобильность', text: 'Легко разобрать и убрать на зиму, можно перевозить.' },
    { title: 'Безопасность', text: 'Современные материалы и конструкции обеспечивают безопасность для детей.' },
  ],
  spa: [
    { title: 'Гидромассаж', text: 'СПА-бассейны оснащены форсунками для массажа и релаксации.' },
    { title: 'Компактность', text: 'Подходят для установки даже в небольших помещениях или на улице.' },
    { title: 'Круглогодичное использование', text: 'Можно использовать в любое время года.' },
    { title: 'Легкость ухода', text: 'Современные системы фильтрации и очистки.' },
  ],
  fun: [
    { title: 'Легкость и мобильность', text: 'Бассейн Fun легко перемещать и устанавливать в любом месте участка.' },
    { title: 'Яркий дизайн', text: 'Весёлые расцветки и формы понравятся детям и взрослым.' },
    { title: 'Безопасность', text: 'Мягкие борта и дно обеспечивают безопасность для малышей.' },
    { title: 'Быстрая установка', text: 'Собирается за 30-60 минут без инструментов.' },
  ],
  polymer: [
    { title: 'Простота монтажа', text: 'Панельные бассейны быстро собираются и не требуют сложных работ.' },
    { title: 'Долговечность', text: 'Пластиковые панели устойчивы к коррозии и химии.' },
    { title: 'Лёгкость конструкции', text: 'Меньший вес по сравнению с бетонными чашами.' },
    { title: 'Вариативность отделки', text: 'Можно облицевать плиткой, лайнером или мозаикой.' },
  ],
  formwork: [
    { title: 'Прочность', text: 'Несъёмная опалубка обеспечивает дополнительную жёсткость конструкции.' },
    { title: 'Теплоизоляция', text: 'Сохраняет тепло воды дольше, экономит энергию.' },
    { title: 'Быстрый монтаж', text: 'Сборка и заливка чаши занимают меньше времени.' },
    { title: 'Долговечность', text: 'Служит десятилетиями без потери качества.' },
  ],
};

const poolTitle = computed(() => poolTitles[props.type] || props.type);
const poolDescription = computed(() => poolDescriptions[props.type] || '');
const images = computed(() => poolImages[props.type] || ['/images/b-pools.png']);
const advantages = computed(() => poolAdvantages[props.type] || poolAdvantages['concrete']);

const leftAdvantages = computed(() => [advantages.value[0], advantages.value[2]]);
const rightAdvantages = computed(() => [advantages.value[1], advantages.value[3]]);

const currentIndex = ref(0);
const currentImage = computed(() => images.value[currentIndex.value]);

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
}
function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
}

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
.pool-details-page {
  background: #fff;
  min-height: 100vh;
  padding: 40px 0 0 0;
}

.container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}

.pool-main-block {
  display: flex;
  align-items: flex-start;
  gap: 60px;
}

.pool-image-block {
  flex: 1 1 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pool-slider {
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

.pool-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  display: block;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 28px;
  color: #23A3FF;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;
}

.slider-arrow.left {
  left: 16px;
}

.slider-arrow.right {
  right: 16px;
}

.slider-arrow:hover {
  background: #23A3FF;
  color: #fff;
}

.pool-info-block {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
}

.pool-title {
  color: #23A3FF;
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 24px;
}

.pool-description {
  color: #222;
  font-size: 18px;
  margin-bottom: 32px;
  line-height: 1.5;
}

.pool-consult-btn {
  background: transparent;
  color: #23A3FF;
  border: 1.5px solid #23A3FF;
  border-radius: 12px;
  padding: 35px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.pool-consult-btn:hover {
  background: #23A3FF;
  color: #fff;
}

.pool-advantages-block {
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
  color: #23A3FF;
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
  .pool-main-block {
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }
  .pool-info-block {
    margin-top: 0;
    align-items: center;
  }
  .pool-title {
    font-size: 28px;
    text-align: center;
  }
  .pool-description {
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
  .pool-slider {
    max-width: 100%;
    aspect-ratio: 760 / 490;
  }
}
@media (max-width: 600px) {
  .pool-main-block {
    padding: 0 10px;
  }
  .pool-title {
    font-size: 20px;
  }
  .advantage-number {
    font-size: 28px;
    min-width: 28px;
  }
  .pool-slider {
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
</style> 