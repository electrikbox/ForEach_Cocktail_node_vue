<template>
    <div 
      :class="['card', 'm-2', 'cocktail-card', isHovered ? 'shadow-lg' : 'shadow-sm']"
      style="width: 18rem;" 
      @click="handleClick"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <img :src="imageSrc" class="card-img-top h-100" alt="Cocktail Image" @error="handleError">
      <div v-if="isHovered" class="delete-icon" @click.stop="deleteCocktail">
        <i class="fas fa-trash"></i>
      </div>
      <div class="card-body text-center pt-4">
        <h5 class="card-title">{{ nom }}</h5>
      </div>
    </div>
  </template>
  


  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps({
    nom: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['click', 'delete']);
  const imageSrc = ref(props.image);
  const isHovered = ref(false);
  
  const handleClick = () => emit('click');
  const handleError = () => imageSrc.value = '/images/default.png';
  const deleteCocktail = () => emit('delete');
  </script>
  

  
  <style lang="scss" scoped>
  .cocktail-card {
    cursor: pointer;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    position: relative;
    &:hover {
      transform: scale(1.03);
    }
  }
  
  .card-img-top {
    object-fit: cover;
  }

  .delete-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: rgba(255, 0, 0, 0.8);
    }
  }
  </style>
