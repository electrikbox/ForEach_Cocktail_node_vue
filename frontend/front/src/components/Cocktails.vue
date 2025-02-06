<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Liste des Cocktails</h1>
    <div class="position-relative mb-3" style="width: 300px;">
      <input v-model="searchQuery" type="text" placeholder="Rechercher par nom ou catégorie" class="form-control pr-5">
      <i v-if="searchQuery" @click="resetSearch" class="fas fa-times position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;"></i>
    </div>

    <div class="d-flex flex-wrap justify-content-center">
      <CocktailCard
        v-for="cocktail in filteredCocktails"
        :key="cocktail.id"
        :nom="cocktail.nom"
        :image="`/images/${cocktail.id}.jpg`"
        @click="showModal(cocktail)"
      />
    </div>

    <Modal v-if="isModalVisible" @close="isModalVisible = false">
      <template v-slot:header>
        <h5>{{ selectedCocktail.nom }}</h5>
      </template>

      <template v-slot:body>
        <div class="d-flex justify-content-center">
          <img :src="`/images/${selectedCocktail.id}.jpg`" class="img-fluid mb-3" alt="Cocktail Image" @error="handleError">
        </div>

        <p>{{ selectedCocktail.description }}</p>
        <p class="m-0 p-0"><strong>Verre: </strong>{{ selectedCocktail.verre }}</p>
        <p class="m-0 p-0"><strong>Garniture:</strong> {{ selectedCocktail.garniture }}</p>
        
        <hr>
        
        <p class="m-0 p-0"><strong>Ingredients:</strong></p>
        <ul>
          <li v-for="ingredient in selectedCocktail.ingredients">{{ ingredient.nom }}: <strong>{{ ingredient.quantite }}</strong></li>
        </ul>

        <hr>

        <div class="d-flex flex-wrap">
          <p class="m-0 p-0"><strong>Categories:</strong> </p>
          <span v-for="cat in selectedCocktail.categories" :key="cat.id" class="badge bg-dark-red m-1">{{ cat.nom }}</span>
        </div>
      </template>
    </Modal>
  </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import api from "../composables/api";
import Modal from "./Modal.vue";
import CocktailCard from "./CocktailCard.vue";

const cocktails = ref([]);
const toast = useToast();
const isModalVisible = ref(false);
const selectedCocktail = ref(null);
const searchQuery = ref('');

const fetchCocktails = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Token is missing. Please log in.");
    return;
  }

  try {
    const response = await api.cocktailApi.get("/all");
    cocktails.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const showModal = (cocktail) => {
  selectedCocktail.value = cocktail;
  isModalVisible.value = true;
};

const handleError = (event) => event.target.src = '/images/default.png';

const resetSearch = () => {
  searchQuery.value = '';
};

const filteredCocktails = computed(() => {
  return cocktails.value.filter(cocktail => 
    cocktail.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (cocktail.categories && cocktail.categories.some(cat => cat.nom.toLowerCase().includes(searchQuery.value.toLowerCase())))
  );
});

onMounted(() => fetchCocktails());
</script>



<style scoped>
.position-relative {
  width: 100%;
  max-width: 300px;
}
</style>
