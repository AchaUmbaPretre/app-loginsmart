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

    getVehiculeOne : async (id) => {
        try {
            const response = await api.get(`/api/vehicule/one?id_vehicule=${id}`)
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des vehicules:', error);
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
    },

    putVehicule : async (formData) => {
        try {
            const response = await api.put('/api/vehicule', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du chauffeur:', error);
            throw error;
        }
    },

    deleteVehicule : async (id) => {
        try {
            const response = await api.put(`/api/vehicule/delete_vehicule?id_vehicule=${id}`);
              
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du chauffeur:', error);
            throw error;
        }
    }
}

export default vehiculeService;
