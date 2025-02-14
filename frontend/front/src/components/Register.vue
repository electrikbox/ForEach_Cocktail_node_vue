<template>
  <div class="d-flex justify-content-center">
    <div class="card shadow-sm credentials-card">
      <div class="card-body">
        <h3 class="card-title text-center mb-3">Register</h3>

        <form @submit.prevent="register">
          <div class="mb-3">
            <input
              type="text"
              class="form-control input-custom"
              id="name"
              v-model="name"
              required
              placeholder="Name"
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control input-custom"
              id="email"
              v-model="email"
              required
              placeholder="Email"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control input-custom"
              id="password"
              v-model="password"
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-dark-red w-100">Register</button>

        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Register',
  meta: [
    {
      name: 'description',
      content: 'Register page'
    }
  ]
})

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const toast = useToast();

const register = async () => {
  try {
    const response = await axios.post("http://localhost:8000/users/create", {
      nom: name.value,
      email: email.value,
      mot_de_passe: password.value
    });
    toast.success("Registration successful.");
    router.push('/login');
  } catch (error) {
    console.error(error);
    toast.error("Registration failed. Please try again.");
  }
};
</script>
