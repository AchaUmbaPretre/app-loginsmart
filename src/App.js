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
            path: '/chauffeur', 
            element: <Chauffeur /> 
          },
          {
            path: '/vehicule', 
            element: <Vehicule /> 
          },
          {
            path: '/generateur', 
            element: <Generateur /> 
          },
          {
            path: '/personnel', 
            element: <Personnel /> 
          }
        ]
      }
  ])

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;