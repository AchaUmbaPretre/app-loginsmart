import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
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
import Approvisionnement from './pages/approvisionnement/Approvisionnement'
import VehiculeForm from './pages/vehicule/vehiculeForm/VehiculeForm';

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
          { 
            path: '/', 
            element: <RightBars /> 
          },
          {
            path: '/carburant', 
            element: <Carburant /> 
          },
          {
            path: '/chauffeur', 
            element: <Chauffeur /> 
          },
          {
            path: '/vehicule', 
            element: <Vehicule /> 
          },
          {
            path: '/new_vehicule', 
            element: <VehiculeForm /> 
          },
          {
            path: '/generateur', 
            element: <Generateur /> 
          },
          {
            path: '/personnel', 
            element: <Personnel /> 
          },
          {
            path: '/approvisionnement', 
            element: <Approvisionnement /> 
          }
        ]
      },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
  ])

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;