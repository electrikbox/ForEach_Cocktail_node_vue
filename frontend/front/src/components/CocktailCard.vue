<template>
    <div class="card m-2 shadow-sm cocktail-card" style="width: 18rem;" @click="handleClick">
      <div class="card-body text-center pt-4">
        <h5 class="card-title">{{ nom }}</h5>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    nom: {
      type: String,
      required: true
    }
  });

  const emit = defineEmits(['click']);

  const handleClick = () => {
    emit('click');
  };
  </script>

  <style scoped>
  .cocktail-card {
    cursor: pointer;
  }
  </style>
