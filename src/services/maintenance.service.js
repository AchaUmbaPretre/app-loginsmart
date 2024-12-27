import api from '../utils/api';

const maintenanceService = {
    getMaintenance: async () => {
        try {
            const response = await api.get('/api/maintenance/reparation');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des maintenances :', error);
            throw error;
        }
    },

    getReparationOne: async (id) => {
        try {
            const response = await api.get(`/api/maintenance/reparation/one?id_reparation=${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des chauffeurs:', error);
            throw error;
        }
    },

    getMaintenanceOne: async (id) => {
        try {
            const response = await api.get(`/api/maintenance/reparation?id_reparation=${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des chauffeurs:', error);
            throw error;
        }
    },

    postMaintenance: async (formData) => {
        try {
            const response = await api.post('/api/maintenance/reparation', formData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de reparation:', error);
            throw error;
        }
    },

    getSuivi: async () => {
        try {
            const response = await api.get('/api/maintenance/suivi');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des suivi :', error);
            throw error;
        }
    },

    getSuiviOneReparation: async (id) => {
        try {
            const response = await api.get(`/api/maintenance/suivi/one_reparation?id_reparation=${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des suivi :', error);
            throw error;
        }
    },

    postSuivi: async (formData) => {
        try {
            const response = await api.post('/api/maintenance/suivi', formData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de suivi:', error);
            throw error;
        }
    },

    getControle: async () => {
        try {
            const response = await api.get('/api/maintenance/controle');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de controle :', error);
            throw error;
        }
    },

    postControle: async (formData) => {
        try {
            const response = await api.post('/api/maintenance/controle', formData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de controle:', error);
            throw error;
        }
    },
};

export default maintenanceService;
