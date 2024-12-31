import api from '../utils/api';

const affectationService = {
    getAffectation: async () => {
        try {
            const res = await api.get('/api/affectation');
            return res.data.data
            
        } catch (error) {
            console.error('Erreur lors de la récupération des chauffeurs:', error);
            throw error;
        }
    },

    postAffectation: async(formData) => {
        try {
            const res = await api.post('/api/affectation', formData);
            return res.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout d affectation:', error);
            throw error;
        }
    }
}

export default affectationService;