<template>
  <!-- Centrage vertical et horizontal -->
  <div class="d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div class="card shadow-lg" style="width: 22rem;">
      <div class="card-body">
        <h3 class="card-title text-center mb-3">Login</h3>
        <form @submit.prevent="login">
          <div class="mb-3">
            <input type="email" class="form-control" id="email" v-model="email" required placeholder="Email"/>
          </div>
          <div class="mb-3">
            <input type="password" class="form-control" id="password" v-model="password" required placeholder="Password" />
          </div>
          <button type="submit" class="btn btn-primary w-100">Se connecter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const response = await axios.post("http://localhost:8000/users/login", {
      email: email.value,
      mot_de_passe: password.value,
    });
    localStorage.setItem("token", response.headers.authorization);
  } catch (error) {
    console.error(error);
  }
};
</script>