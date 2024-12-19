import api from '../utils/api';

const fetchData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

const TypeService = {
    catPermis: () => fetchData('/api/type/cat_permis'),
    typeContrat: () => fetchData('/api/type/type_contrat'),
    etatCivil: () => fetchData('/api/type/etat_civil'),
    typeFonction: () => fetchData('/api/type/type_fonction'),
    typeModele: () => fetchData('/api/type/type_modele'),
    typeMarque: () => fetchData('/api/type/type_marque')};

export default TypeService;
