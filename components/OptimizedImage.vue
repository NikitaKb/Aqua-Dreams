<template>
  <img
    :src="src"
    :alt="alt"
    :class="imageClass"
    loading="lazy"
    :style="imageStyle"
    @load="onImageLoad"
    @error="onImageError"
  />
</template>

<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
  imageClass?: string;
  imageStyle?: string | Record<string, string | number>;
}

const props = withDefaults(defineProps<Props>(), {
  imageClass: '',
  imageStyle: () => ({})
});

const emit = defineEmits<{
  load: [event: Event];
  error: [event: Event];
}>();

const onImageLoad = (event: Event) => {
  emit('load', event);
};

const onImageError = (event: Event) => {
  emit('error', event);
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.3s ease;
}

img[loading="lazy"] {
  opacity: 0;
}

img[loading="lazy"].loaded {
  opacity: 1;
}
</style> 