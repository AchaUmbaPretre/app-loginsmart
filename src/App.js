import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import RightBars from './pages/rightBars/RightBars';

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