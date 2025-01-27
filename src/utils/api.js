import axios from 'axios';
import { store} from '../redux/store';
import { logout, refreshAccessToken, updateRefreshToken } from '../redux/authSlice';

const api = axios.create({
  baseURL: 'https://apilog.loginsmart-cd.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour rafraîchir le token si une requête échoue avec un 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si la réponse est 401 (non autorisé) et qu'on n'a pas encore essayé de renouveler le token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken; // Récupérer le refreshToken de Redux

        if (!refreshToken) {
          store.dispatch(logout()); // Si pas de refreshToken, déconnecter l'utilisateur
          return Promise.reject(error);
        }

        // Envoyer une requête pour rafraîchir le token avec le refreshToken
/*         const response = await axios.post(
          'http://localhost:8080/api/auth/refresh',
          { refreshToken },
          { withCredentials: true } // On envoie le refreshToken dans la requête
        ); */

        const response = await axios.post(
          'https://apilog.loginsmart-cd.com/api/auth/refresh',
          { refreshToken },
          { withCredentials: true } // On envoie le refreshToken dans la requête
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        store.dispatch(refreshAccessToken(accessToken)); // Mettre à jour le accessToken dans Redux
        store.dispatch(updateRefreshToken(newRefreshToken)); // Mettre à jour le refreshToken dans Redux

        // Réessayer la requête initiale avec le nouveau accessToken
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout()); 
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
