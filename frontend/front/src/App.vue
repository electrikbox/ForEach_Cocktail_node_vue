<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <ul class="navbar-nav flex-row justify-content-center w-100">
        <li class="nav-item mx-2">
          <RouterLink class="btn btn-link" to="/home">User List</RouterLink>
        </li>
        <li class="nav-item mx-2">
          <RouterLink class="btn btn-link" to="/register">Register</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped>
</style>