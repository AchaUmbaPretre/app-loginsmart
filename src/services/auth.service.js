import api from '../utils/api';
import { login } from '../redux/authSlice';
import store from '../redux/store';

const AuthService = {
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
