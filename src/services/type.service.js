import api from '../utils/api';

const fetchData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
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
};

export default TypeService;
