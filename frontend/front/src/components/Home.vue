<template>
  <div>
    <h1>Liste des utilisateurs</h1>
    <div class="d-flex flex-wrap">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :nom="user.nom"
        :email="user.email"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserCard from "./UserCard.vue";

export default {
  name: "Home",
  components: {
    UserCard,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`http://localhost:8000/users/all`);
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
</style>