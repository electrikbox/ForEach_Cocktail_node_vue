<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/main.css'; // Assurez-vous que ce fichier est importé
</script>

<template>
  <!-- Ajouter classes d-flex flex-column pour forcer l'orientation verticale -->
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- Menu toujours en haut -->
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
          <ul class="navbar-nav flex-row justify-content-center w-100">
            <li class="nav-item mx-2">
              <RouterLink class="btn btn-link" to="/home">User List</RouterLink>
            </li>
            <li class="nav-item mx-2">
              <RouterLink class="btn btn-link" to="/register">Register</RouterLink>
            </li>
            <li class="nav-item mx-2">
              <RouterLink class="btn btn-link" to="/login">Login</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Centrage complet du contenu -->
    <main class="d-flex justify-content-center">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
</style>