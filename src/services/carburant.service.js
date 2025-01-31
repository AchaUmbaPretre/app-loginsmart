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
            const response = await api.get(`/api/carburant/one?id_plein=${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des pleins:', error);
            throw error;
        }
    },

    getCarburantOneV: async (id) => {
        try {
            const response = await api.get(`/api/carburant/one_v?id_plein=${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des pleins:', error);
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

    putCarburant: async (formData) => {
        try {
            const response = await api.put('/api/carburant', formData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du carburant:', error);
            throw error;
        }
    },

    deleteCarburant: async (id) => {
        try {
            const response = await api.put(`/api/carburant/delete_carburant?id_plein=${id}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du carburant:', error);
            throw error;
        }
    },

    //Rapport detail carburant vehicule
    getCarburantRapportDetailVehicule: async () => {
        try {
            const response = await api.get('/api/carburant/rapport_detail_vehicule');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },

    getCarburantRapportDetailSite: async () => {
        try {
            const response = await api.get('/api/carburant/rapport_detail_site_SIEGE_KIN');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },

    
    getCarburantRapportDetailSiteSelect: async (selectIds) => {
        try {
            const response = await api.get(`/api/carburant/rapport_detail_site_Select?filter=${selectIds}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },

    getCarburantRapportDetailSiteAll: async () => {
        try {
            const response = await api.get('/api/carburant/rapport_detail_site_all');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },

    getCarburantRapporInfoGen: async (filter) => {
        try {
            const response = await api.get(`/api/carburant/rapport_detail_info_gen?filter=${filter}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },

    getCarburantTypeCarburantSiegeKin: async (filter) => {
        try {
            const response = await api.get(`/api/carburant/rapport_carburant_siege_kin?filter=${filter}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },

    getCarburantTypeCarburantSiegeAutres: async (filter) => {
        try {
            const response = await api.get(`/api/carburant/rapport_carburant_siege_Autres?filter=${filter}`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },

    getConsommattionCarburantLine: async () => {
        try {
            const response = await api.get('/api/carburant/consommation_mensuelle');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },

    getReparationConsommation: async () => {
        try {
            const response = await api.get('/api/carburant/reparation_carburant');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des carburants:', error);
            throw error;
        }
    },
};

export default carburantService;
