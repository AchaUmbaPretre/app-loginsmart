import api from '../utils/api';

const fetchData = async (endpoint, params = {}) => {
    try {
        const response = await api.get(endpoint, { params });
        return response.data.data; 
    } catch (error) {
        console.error(`Erreur lors de la récupération des données depuis ${endpoint}:`, error);
        throw new Error(`Impossible de récupérer les données depuis ${endpoint}`);
    }
};

// Service regroupant les appels API
const TypeService = {
    catPermis: () => fetchData('/api/type/cat_permis'),

    typeContrat: () => fetchData('/api/type/type_contrat'),

    etatCivil: () => fetchData('/api/type/etat_civil'),

    typeFonction: () => fetchData('/api/type/type_fonction'),

    typeModele: (id) => fetchData('/api/type/type_modele', { id_marque: id }),

    typeMarque: () => fetchData('/api/type/type_marque'),

    typeCouleur: () => fetchData('/api/type/couleur'),

    catVehicule: () => fetchData('/api/type/cat_vehicule'),

};

export default TypeService;
