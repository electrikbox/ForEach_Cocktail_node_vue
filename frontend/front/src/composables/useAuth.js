import { ref } from 'vue';

export const token = ref(localStorage.getItem("token"));

export const setToken = (value) => {
  token.value = value;
  localStorage.setItem("token", value);
};

export const removeToken = () => {
  token.value = null;
  localStorage.removeItem("token");
};
