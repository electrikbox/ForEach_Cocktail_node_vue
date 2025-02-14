<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <router-view v-slot="{ Component }">
      <transition name="zoom" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>



<script setup>
import Header from './components/Header.vue';
</script>



<style>
.zoom-enter-active, .zoom-leave-active {
  transition: all 0.1s ease;
}
.zoom-enter-from, .zoom-leave-to {
  transform: scale(0.99);
  opacity: 0;
}
</style>