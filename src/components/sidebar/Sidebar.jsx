import { Layout, Menu, message } from 'antd';
import './sidebar.scss';
import {
  HomeOutlined,
  ApartmentOutlined,
  LogoutOutlined,
  TagOutlined,
  DashboardOutlined,
  BankOutlined,
  DropboxOutlined,
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
        LOGINSMART
      </div>
      <Sider style={{ backgroundColor: '#2d3a4b' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['/']}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            height: '100%',
            borderRight: 0,
            width: '100%',
            backgroundColor: '#2d3a4b', // Fond personnalisé
          }}
        >
          <Item key="/" icon={<HomeOutlined style={{ fontSize:'16px'}} />} onClick={toggleMenu}>
            <Link to="/">Accueil</Link>
          </Item>
          <Item key="1" icon={<ApartmentOutlined style={{ fontSize:'16px'}} />} onClick={toggleMenu}>
            <Link to='/departement'>Département</Link>
          </Item>
          <Item key="2" icon={<DashboardOutlined style={{ fontSize:'16px'}} />} onClick={toggleMenu}>
            <Link to='/controle'>Contrôle de base</Link>
          </Item>
          <SubMenu key="sub1" icon={<BankOutlined style={{ fontSize:'16px'}} />} title="Bâtiment">
            <Item key="3" onClick={toggleMenu}>
              <Link to='/batiment'>Liste des Bâtiments</Link>
            </Item>
            <Item key="4" onClick={toggleMenu}>
              <Link to='/liste_bins'>Liste des Bins</Link>
            </Item>
          </SubMenu>
          <Item key="1" icon={<ApartmentOutlined style={{ fontSize:'16px'}} />} onClick={toggleMenu}>
            <Link to='/departement'>Département</Link>
          </Item>
          <Item key="2" icon={<DashboardOutlined style={{ fontSize:'16px'}} />} onClick={toggleMenu}>
            <Link to='/controle'>Contrôle de base</Link>
          </Item>
          <SubMenu key="sub1" icon={<BankOutlined style={{ fontSize:'16px'}} />} title="Bâtiment">
            <Item key="3" onClick={toggleMenu}>
              <Link to='/batiment'>Liste des Bâtiments</Link>
            </Item>
            <Item key="4" onClick={toggleMenu}>
              <Link to='/liste_bins'>Liste des Bins</Link>
            </Item>
          </SubMenu>

          <Item key="logout" icon={<LogoutOutlined style={{ fontSize:'16px'}}/>} className="logout-item">
            <Link>Déconnecter</Link>
          </Item>
        </Menu>
      </Sider>
{/*       <div className="upgrade-section">
        <div className="upgrade-text">Gain in-depth insights, track performance, and optimize your strategies.</div>
        <div className="upgrade-button">Upgrade to Pro</div>
      </div> */}
    </div>
  );
};

export default Sidebar;
