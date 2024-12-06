import api from '../utils/api';
import { login, logout } from '../redux/authSlice';
import store from '../redux/store';

const AuthService = {

 register: async (formData) => {
        try {
          const response = await api.post('/api/auth/register', formData);
          return response.data; // Retourne la réponse ou effectue une action supplémentaire si nécessaire
        } catch (error) {
          throw error; // Lance l'erreur pour être capturée dans le composant
        }
      },
  login: async (email, mot_de_passe) => {
    const response = await api.post('/api/auth/login', { email, mot_de_passe });
    const { accessToken, user } = response.data;
    store.dispatch(login({ accessToken, user }));
    return response.data;
  },

  logout: () => {
    api.post('/auth/logout', {});
    store.dispatch(logout());
  },
};

export default AuthService;
