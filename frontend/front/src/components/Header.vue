<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light mb-4">
      <div class="container">
        <ul class="navbar-nav flex-row justify-content-center w-100">
          <li class="nav-item mx-2"><RouterLink class="btn btn-link colo" to="/home">User List</RouterLink></li>
          <li class="nav-item mx-2"><RouterLink class="btn btn-link" to="/cocktails">Cocktails List</RouterLink></li>
          <li v-if="!token" class="nav-item mx-2"><RouterLink class="btn btn-link" to="/register">Register</RouterLink></li>
          <li v-if="!token" class="nav-item mx-2"><RouterLink class="btn btn-link" to="/login">Login</RouterLink></li>
          <li v-if="token" class="nav-item mx-2"><button class="btn btn-link" @click="logout">Logout</button></li>
        </ul>
      </div>
    </nav>
  </header>
</template>



<script setup>
import { token, removeToken } from '../composables/useAuth'
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  removeToken()
  router.push('/login')
}
</script>



<style scoped lang="scss">
  header {
    background-color: #f8f9fa;
    border-radius: 5px;
  }
  .navbar-nav {
    flex-direction: row;
  }
  .nav-item {
    margin: 0;
  }
  .btn-link {
    color: #4f4f4f;
    font-weight: 600;
    text-decoration: none;
    &::after {
      color: #761f1f;
      content: '';
      display: block;
      width: 0;
      height: 2px;
      background: #761f1f;
      transition: width 0.3s;
    }
    &:hover {
      color: #761f1f;
      &::after {
        width: 100%;
      }
    }
  }
</style>