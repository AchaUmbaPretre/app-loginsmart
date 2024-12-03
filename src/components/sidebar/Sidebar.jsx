import { Layout, Menu } from 'antd';
import './sidebar.scss';
import {
  HomeOutlined,
  ApartmentOutlined,
  LogoutOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState([]);

  const toggleMenu = () => {
    // Fonction de gestion de l'ouverture des menus
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-h1"><span className='title'>L</span>OGINSMART</h1>
      </div>
      <Sider width={240} style={{ backgroundColor: 'transparent' }}>
        <Menu
          mode="inline"
          selectedKeys={[window.location.pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            backgroundColor: 'transparent',
            color: '#a4b2c2', // Couleur personnalisée pour le texte
            fontSize: '18px',
          }}
        >

          <Item key="/" icon={<HomeOutlined style={{ fontSize: '22px', color: '#a4b2c2' }}/>} onClick={toggleMenu}>
            <Link to="/">Accueil</Link>
          </Item>
          <Item key="/departement" icon={<ApartmentOutlined style={{ fontSize: '22px', color: '#a4b2c2' }} />} onClick={toggleMenu}>
            <Link to="/departement">Carburant</Link>
          </Item>
          <SubMenu key="sub1" icon={<BankOutlined style={{ fontSize: '22px', color: '#a4b2c2' }} />} title="Véhicule">
            <Item key="/batiment">
              <Link to="/batiment">Liste des véhicules</Link>
            </Item>
          </SubMenu>
          <Item key="logout" icon={<LogoutOutlined style={{ fontSize: '22px', color: '#a4b2c2' }} />} className="logout-item">
            <Link>Déconnexion</Link>
          </Item>
        </Menu>
      </Sider>

    </div>
  );
};

export default Sidebar;
