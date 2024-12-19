import api from '../utils/api';

const vehiculeService = {
    getVehicule : async () => {
        try {
            const response = await api.get('/api/vehicule')
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des chauffeurs:', error);
            throw error;
        }
    },

    postVehicule : async (formData) => {
        try {
            const response = await api.post('/api/vehicule', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du chauffeur:', error);
            throw error;
        }
    }
}

export default vehiculeService;
