<template>
  <div class="d-flex justify-content-center">
    <div class="card shadow-sm credentials-card">
      <div class="card-body">
        <h3 class="card-title text-center mb-3">Login</h3>

        <form @submit.prevent="login">
            <input
              type="email"
              class="form-control input-custom mb-3"
              id="email"
              v-model="email"
              required
              placeholder="Email"
            />
            <input
              type="password"
              class="form-control input-custom mb-3"
              id="password"
              v-model="password"
              required
              placeholder="Password"
            />
          <button type="submit" class="w-100 btn btn-dark-red">Se connecter</button>
        </form>

      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { jwtDecode } from 'jwt-decode';
import { setToken } from '../composables/useAuth';
import api from '../composables/api';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Login',
  meta: [
    {
      name: 'description',
      content: 'Login page'
    }
  ]
})

const email = ref("");
const password = ref("");
const router = useRouter();
const toast = useToast();

const login = async () => {
  try {
    const credentials = {
      email: email.value,
      mot_de_passe: password.value
    };

    const response = await api.userApi.post("/login", credentials);
    const tokenValue = response.headers.authorization;

    setToken(tokenValue);

    const decodedToken = jwtDecode(tokenValue);
    const userName = decodedToken.nom;

    router.push('/home');
    toast.success(`Login successful. Welcome ${userName}`);
  } catch (error) {
    console.error(error);
    toast.error("Login failed. Please check your credentials and try again.");
  }
};
</script>



<style scoped>

</style>