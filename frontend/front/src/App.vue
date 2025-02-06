<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>
