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
};

export default maintenanceService;