<template>
  <div class="container mt-5">
    <h2>Ajouter un Cocktail</h2>
    <form @submit.prevent="addCocktail">
      <div class="mb-3">
        <input v-model="cocktail.nom" class="form-control" placeholder="Nom du cocktail" required>
      </div>
      <div class="mb-3">
        <textarea v-model="cocktail.description" class="form-control" placeholder="Description"></textarea>
      </div>
      <div class="mb-3">
        <input v-model="cocktail.verre" class="form-control" placeholder="Type de verre">
      </div>
      <div class="mb-3">
        <input v-model="cocktail.garniture" class="form-control" placeholder="Garniture">
      </div>
      <div class="form-check mb-3">
        <input type="checkbox" v-model="cocktail.alcoolise" class="form-check-input">
        <label class="form-check-label">Alcoolisé</label>
      </div>

      <h3>Ingrédients</h3>
      <div class="mb-3 d-flex align-items-center">
        <input v-model="newIngredient.nom" class="form-control me-2" placeholder="Nom ingrédient">
        <input v-model="newIngredient.quantite" class="form-control me-2" placeholder="Quantité">
        <button @click.prevent="addIngredient" class="btn btn-sm btn-dark-red">Ajouter</button>
      </div>
      <table v-if="cocktail.ingredients.length" class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ing, index) in cocktail.ingredients" :key="index">
            <td>{{ ing.nom }}</td>
            <td>{{ ing.quantite }}</td>
            <td class="text-end">
              <button @click.prevent="removeIngredient(index)" class="btn btn-danger">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Catégories</h3>
      <div class="mb-3 d-flex align-items-center">
        <input v-model="newCategory.nom" class="form-control me-2" placeholder="Nom catégorie">
        <button @click.prevent="addCategory" class="btn btn-sm btn-dark-red">Ajouter</button>
      </div>
      <table v-if="cocktail.categories.length" class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, index) in cocktail.categories" :key="index">
            <td>{{ cat.nom }}</td>
            <td class="text-end">
              <button @click.prevent="removeCategory(index)" class="btn btn-danger">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Étapes</h3>
      <div class="mb-3 d-flex align-items-center">
        <input v-model="newStep" class="form-control me-2" placeholder="Étape">
        <button @click.prevent="addStep" class="btn btn-sm btn-dark-red">Ajouter</button>
      </div>
      <table v-if="cocktail.etapes.length" class="table">
        <thead>
          <tr>
            <th>Étape</th>
            <th class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(etape, index) in cocktail.etapes" :key="index">
            <td>{{ etape }}</td>
            <td class="text-end">
              <button @click.prevent="removeStep(index)" class="btn btn-danger">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit" class="btn btn-dark-red">Créer Cocktail</button>
    </form>
  </div>
</template>



<script setup>
import { ref, toRaw } from 'vue';
import api from '../composables/api';

const cocktail = ref({
  nom: '',
  description: '',
  verre: '',
  garniture: '',
  alcoolise: false,
  ingredients: [],
  categories: [],
  etapes: []
});

const newIngredient = ref({ nom: '', quantite: '' });
const newCategory = ref({ nom: '' });
const newStep = ref('');

const addIngredient = () => {
  if (newIngredient.value.nom && newIngredient.value.quantite) {
    cocktail.value.ingredients.push({ ...newIngredient.value });
    newIngredient.value.nom = '';
    newIngredient.value.quantite = '';
  }
};

const removeIngredient = (index) => cocktail.value.ingredients.splice(index, 1);

const addCategory = () => {
  if (newCategory.value.nom) {
    cocktail.value.categories.push({ ...newCategory.value });
    newCategory.value.nom = '';
  }
};

const removeCategory = (index) => cocktail.value.categories.splice(index, 1);

const addStep = () => {
  if (newStep.value) {
    cocktail.value.etapes.push(newStep.value);
    newStep.value = '';
  }
};

const removeStep = (index) => cocktail.value.etapes.splice(index, 1);

const addCocktail = async () => {
  console.log("addCocktail called");
  const cocktailData = toRaw(cocktail.value);
  cocktailData.etapes = cocktailData.etapes.map((etape, index) => ({ etape, ordre: index + 1 }));
  console.log("Cocktail data:", cocktailData);
  try {
    const response = await api.cocktailApi.post('/insert', cocktailData);
    console.log("Cocktail ajouté :", response.data);
    alert("Cocktail ajouté !");
  } catch (error) {
    console.error("Erreur :", error);
    console.error("Erreur détails:", error.response ? error.response.data : error.message);
  }
};
</script>



<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css";
</style>
