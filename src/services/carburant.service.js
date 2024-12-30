import api from '../utils/api';

const carburantService = {
    getCarburant: async () => {
        try {
            const response = await api.get('/api/carburant');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des chauffeurs:', error);
            throw error;
        }
    },

    getCarburantConsommation: async (targetKeys, selectedDates) => {
        try {
            const response = await api.get(`/api/carburant/consommation?targetKeys=${targetKeys}&selectedDates=${selectedDates}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des consommation:', error);
            throw error;
        }
    },

    getCarburantConsommationOne: async (id_vehicule, selectedDates) => {
        try {
            const response = await api.get(`/api/carburant/consommationOne?id_vehicule=${id_vehicule}&selectedDates=${selectedDates}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des consommation:', error);
            throw error;
        }
    },

    getCarburantOne: async (id) => {
        try {
            const response = await api.get(`/api/carburant/one?id_vehicule=${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des chauffeurs:', error);
            throw error;
        }
    },

    getCarburantCinq: async () => {
        try {
            const response = await api.get('/api/carburant/cinq_derniers');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des chauffeurs:', error);
            throw error;
        }
    },

    postCarburant: async (formData) => {
        try {
            const response = await api.post('/api/carburant', formData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du chauffeur:', error);
            throw error;
        }
    },
};

export default carburantService;
