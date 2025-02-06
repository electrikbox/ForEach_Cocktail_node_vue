<template>
  <div class="card m-2 shadow-sm" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ nom }}</h5>
      <p class="card-text">{{ email }}</p>
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
</script>
