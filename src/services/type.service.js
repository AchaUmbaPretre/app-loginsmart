import api from '../utils/api';

const TypeService = {
    catPermis: async () =>{
        try {
            const response = await api.get('/api/type/cat_permis');
          return response.data; 
        } catch (error) {
            throw error;
        }
    },

    type_contrat : async () =>{
        try {
            const response = await api.get('/api/type/type_contrat');
          return response.data; 
        } catch (error) {
            throw error;
        }
    },

    etatCivil: async () =>{
        try {
            const response = await api.get('/api/type/etat_civil');
          return response.data; 
        } catch (error) {
            throw error;
        }
    }
}

export default TypeService;