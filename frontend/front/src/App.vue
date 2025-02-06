<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <transition name="zoom" mode="out-in">
      <RouterView></RouterView>
    </transition>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style>
.zoom-enter-active, .zoom-leave-active {
  transition: all 0.3s ease;
}
.zoom-enter-from, .zoom-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>