<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Liste des utilisateurs</h1>
    <div class="d-flex flex-wrap justify-content-center">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :nom="user.nom"
        :email="user.email"
      />
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import api from "../api.js";
import UserCard from "./UserCard.vue";

const users = ref([]);
const toast = useToast();

const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Token is missing. Please log in.");
    return;
  }


  try {
    const response = await api.userApi.get("/all");
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
