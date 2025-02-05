<template>
  <Header></Header>
  <div class="d-flex justify-content-center">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header.vue'; // Assurez-vous que le chemin est correct
</script>
