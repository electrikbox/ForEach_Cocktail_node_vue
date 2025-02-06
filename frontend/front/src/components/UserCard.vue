<template>
  <div class="card m-2 shadow-sm" style="width: 18rem;">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>
        <h5 class="card-title">{{ nom }}</h5>
        <p class="card-text">{{ email }}</p>
      </div>
      <button @click="deleteUser" class="btn btn-link text-danger">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['delete-user']);
const deleteUser = () => emit('delete-user');
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
