<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <div class="card shadow-sm" style="width: 22rem;">
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
          <button type="submit" class="btn btn-primary w-100">Register</button>
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

onMounted(() => {
  console.log('Register component has been mounted.');
});
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
