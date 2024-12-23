import api from '../utils/api';

const ChauffeurService = {
    getChauffeur: async () => {
        try {
            const response = await api.get('/api/chauffeur');
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des chauffeurs:', error);
            throw error;
        }
    },

    postChauffeur: async (formData) => {
        try {
            const response = await api.post('/api/chauffeur', formData, {
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
};

export default ChauffeurService;
