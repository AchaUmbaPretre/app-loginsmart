import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import RightBars from './pages/rightBars/RightBars';
import Chauffeur from './pages/chauffeur/Chauffeur';
import Vehicule from './pages/vehicule/Vehicule';
import Generateur from './pages/generateur/Generateur';
import Personnel from './pages/personnel/Personnel';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Carburant from './pages/carburant/Carburant';
import Approvisionnement from './pages/approvisionnement/Approvisionnement';
import VehiculeForm from './pages/vehicule/vehiculeForm/VehiculeForm';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import ConsomCarburant from './pages/carburant/consomCarburant/ConsomCarburant';
import CarburantSearch from './pages/carburant/carburantSearch/CarburantSearch';
import CarburantGenerateur from './pages/carburantGenerateur/CarburantGenerateur';
import CarburantRapport from './pages/carburant/carburantRapport/CarburantRapport';
import Maintenance from './pages/maintenance/Maintenance';
import ControleTechnique from './pages/maintenance/controleTechnique/ControleTechnique';
import GenerateurMaintenance from './pages/maintenance/generateurMaintenance/GenerateurMaintenance';
import AffectationVehicule from './pages/vehicule/affectationVehicule/AffectationVehicule';
import AssuranceVehicule from './pages/vehicule/assuranceVehicule/AssuranceVehicule';
import SinistreVehicule from './pages/vehicule/sinistreVehicule/SinistreVehicule';
import ChauffeurAffect from './pages/chauffeur/chauffeurAffect/ChauffeurAffect';
import Conge from './pages/chauffeur/conge/Conge';
import ListeConge from './pages/chauffeur/conge/listeConge/ListeConge';
import ListeChauffeurAffect from './pages/chauffeur/chauffeurAffect/listeChauffeurAffect/ListeChauffeurAffect';
import Fournisseur from './pages/fournisseur/Fournisseur';
import Localisation from './pages/localisation/Localisation';
import Sites from './pages/sites/Sites';
import CorbeilleAffect from './pages/chauffeur/chauffeurAffect/corbeilleAffect/CorbeilleAffect';

function App() {
  const [loading, setLoading] = useState(true);

  const Layout = () => (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <RightBars /> },
        {
          path: '/carburant',
          element: <PrivateRoute element={Carburant} />
        },
        {
          path: '/consommation_carburant',
          element: <PrivateRoute element={ConsomCarburant} />
        },
        {
          path: '/generateur_carburant',
          element: <PrivateRoute element={CarburantGenerateur} />
        },
        {
          path: '/rapport_carburant',
          element: <PrivateRoute element={CarburantRapport} />
        },
        {
          path: '/vehicule_maintenance',
          element: <PrivateRoute element={Maintenance} />
        },
        {
          path: '/controle_technique',
          element: <PrivateRoute element={ControleTechnique} />
        },
        {
          path: '/generateur_maintenance',
          element: <PrivateRoute element={GenerateurMaintenance} />
        },
        {
          path: '/chauffeur',
          element: <PrivateRoute element={Chauffeur} />
        },
        {
          path: '/affectation',
          element: <PrivateRoute element={ChauffeurAffect} />
        },
        {
          path: '/conge',
          element: <PrivateRoute element={Conge} />
        },
        {
          path: '/vehicule',
          element: <PrivateRoute element={Vehicule} />
        },
        {
          path: '/liste_conge',
          element: <PrivateRoute element={ListeConge} />
        },
        {
          path: '/new_vehicule',
          element: <PrivateRoute element={VehiculeForm} />
        },
        {
          path: '/affectations',
          element: <PrivateRoute element={AffectationVehicule} />
        },
        {
          path: '/liste_affectation',
          element: <PrivateRoute element={ListeChauffeurAffect} />
        },
        {
          path: '/corbeille_affectation',
          element: <PrivateRoute element={CorbeilleAffect} />
        },
        {
          path: '/assurance',
          element: <PrivateRoute element={AssuranceVehicule} />
        },
        {
          path: '/sinistres_inspection',
          element: <PrivateRoute element={SinistreVehicule} />
        },
        {
          path: '/seach_carburant',
          element: <PrivateRoute element={CarburantSearch} />
        },
        {
          path: '/personnel',
          element: <PrivateRoute element={Personnel} />
        },
        {
          path: '/approvisionnement',
          element: <PrivateRoute element={Approvisionnement} />
        },
        {
          path: '/localisation',
          element: <PrivateRoute element={Localisation} />
        },
        {
          path: '/sites',
          element: <PrivateRoute element={Sites} />
        },
        {
          path: '/fournisseur',
          element: <PrivateRoute element={Fournisseur} />
        },
      ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
