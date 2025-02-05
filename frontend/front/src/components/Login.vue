<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div class="card shadow-sm" style="width: 22rem;">
      <div class="card-body">
        <h3 class="card-title text-center mb-3">Login</h3>
        <form @submit.prevent="login">
          <div class="mb-3">
            <input type="email" class="form-control input-custom" id="email" v-model="email" required placeholder="Email"/>
          </div>
          <div class="mb-3">
            <input type="password" class="form-control input-custom" id="password" v-model="password" required placeholder="Password" />
          </div>
          <button type="submit" class="btn btn-primary w-100">Se connecter</button>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const email = ref("");
const password = ref("");
const router = useRouter();
const toast = useToast();

const login = async () => {
  try {
    const response = await axios.post("http://localhost:8000/users/login", {
      email: email.value,
      mot_de_passe: password.value
    });
    const token = response.data.token || response.headers.authorization;
    localStorage.setItem("token", token);
    router.push('/home');
    toast.success("Login successful.");
  } catch (error) {
    console.error(error);
    toast.error("Login failed. Please check your credentials and try again.");
  }
};
</script>



<style scoped>
.input-custom {
  border: 1px solid #ccc;
  padding: 0.5rem;
}

.input-custom:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}
</style>