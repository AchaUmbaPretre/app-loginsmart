import api from '../utils/api';
import { login, logout } from '../redux/authSlice';
import store from '../redux/store';

const AuthService = {

  register : async (nom, prenom, email, mot_de_passe, img) => {
    await api.post('/auth/register', {nom, prenom, email, mot_de_passe, img})
  },

  login: async (email, mot_de_passe) => {
    const response = await api.post('/auth/login', { email, mot_de_passe });
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
