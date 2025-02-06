import axios from "axios";
import router from "./router/router.js";
import { jwtDecode } from "jwt-decode";



// Create userApi and cocktailApi
// ============================================================================

const userApi = axios.create({
  baseURL: "http://localhost:8000/users",
  headers: { "Content-Type": "application/json" }
});

const cocktailApi = axios.create({
    baseURL: "http://localhost:8000/cocktails",
    headers: { "Content-Type": "application/json" }
});



// Interceptors for userApi
// ============================================================================

userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        console.log("Token expiré, suppression du token, merci de vous reconnecter");
        localStorage.removeItem("token");
        router.push("/login");
        return Promise.reject(new Error("Token expiré, suppression du token, merci de vous reconnecter"));
      }
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

userApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token invalide ou utilisateur non authentifié");
      localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);



// Interceptors for cocktailApi
// ============================================================================

cocktailApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
        if (isTokenExpired(token)) {
            console.log("Token expiré, suppression du token, merci de vous reconnecter");
            localStorage.removeItem("token");
            router.push("/login");
            return Promise.reject(new Error("Token expiré, suppression du token, merci de vous reconnecter"));
        }
        config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

cocktailApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        console.log("Token invalide ou utilisateur non authentifié");
        localStorage.removeItem("token");
        router.push("/login");
        }
        return Promise.reject(error);
    }
);


// Check if token is expired
// ============================================================================
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    console.log(decoded.exp);
    console.log(Date.now());
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export default {
  userApi,
  cocktailApi
};