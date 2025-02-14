<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Liste des utilisateurs</h1>
    <div class="d-flex flex-wrap justify-content-center">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :nom="user.nom"
        :email="user.email"
        @delete-user="removeUser(user.id)"
      />
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import api from "../composables/api";
import UserCard from "./UserCard.vue";
import { useHead } from '@vueuse/head'

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Liste des utilisateurs'
    }
  ]
})

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

const removeUser = async (userId) => {
  try {
    await api.userApi.delete(`/delete/${userId}`);
    users.value = users.value.filter(user => user.id !== userId);
    toast.success("User deleted successfully.");
  } catch (error) {
    console.error(error);
    if (error.status === 403) return toast.error("You are not authorized to delete this user.");
    if (error.status === 404) return toast.error("User not found.");
  }
};

onMounted(() => fetchUsers());
</script>
