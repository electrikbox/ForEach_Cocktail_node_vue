import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Cocktails from '../components/Cocktails.vue'
import Register from '../components/Register.vue'
import Login from '@/components/Login.vue'
import api from "../api.js";


export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'home', component: Home, meta: { requiresAuth: true } },
    { path: '/cocktails', name: 'cocktails', component: Cocktails, meta: { requiresAuth: true } },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
  ],
})



router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth) {
    if (!token) {
      console.log("Token manquant, redirection vers /login");
      return next("/login");
    }

    try {
      const response = await api.userApi.post("/check-token");
      console.log("Utilisateur valide :", response.data);
      if (next === "/login") {
        res.send.json({ message: "Vous êtes déjà connecté" });
        setTimeout(() => { res.redirect("/home"); }, 3000);
      }
      return next();
    } catch (error) {
      console.log("Utilisateur introuvable, suppression du token");
      localStorage.removeItem("token");
      return next("/login");
    }
  }

  next();
});

export default router;
