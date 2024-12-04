import { Layout, Menu } from 'antd';
import './sidebar.scss';
import {
  HomeOutlined,
  CarOutlined,
  TeamOutlined,
  ToolOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
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
            color: '#a4b2c2',
            fontSize: '18px',
          }}
        >
          <Item key="/" icon={<HomeOutlined style={{ fontSize: '19px', color: '#a4b2c2' }} />} onClick={toggleMenu}>
            <Link to="/">Accueil</Link>
          </Item>
          <Item key="/carburant" icon={<AppstoreAddOutlined style={{ fontSize: '19px', color: '#a4b2c2' }} />} onClick={toggleMenu}>
            <Link to="/carburant">Carburant</Link>
          </Item>
          <SubMenu key="sub1" icon={<CarOutlined style={{ fontSize: '19px', color: '#a4b2c2' }} />} title="Véhicule">
            <Item key="/vehicule">
              <Link to="/vehicule">Liste des véhicules</Link>
            </Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ToolOutlined style={{ fontSize: '19px', color: '#a4b2c2' }} />} title="Générateur">
            <Item key="/generateur">
              <Link to="/generateur">Liste des générateurs</Link>
            </Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<TeamOutlined style={{ fontSize: '19px', color: '#a4b2c2' }} />} title="Personnel">
            <Item key="/chauffeur">
              <Link to="/chauffeur">Liste des chauffeurs</Link>
            </Item>
            <Item key="/personnel">
              <Link to="/personnel">Liste des Personnels</Link>
            </Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<BankOutlined style={{ fontSize: '19px', color: '#a4b2c2' }} />} title="Approvisionnement">
            <Item key="/approvisionnement">
              <Link to="/approvisionnement">Suivi Approvisionnement</Link>
            </Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<SettingOutlined style={{ fontSize: '19px', color: '#a4b2c2' }} />} title="Administrateur">
            <Item key="/administrateur">
              <Link to="/administrateur">Gestion des Admins</Link>
            </Item>
          </SubMenu>
          <Item key="logout" icon={<LogoutOutlined style={{ fontSize: '20px', color: '#a4b2c2' }} />} className="logout-item">
            <Link>Déconnexion</Link>
          </Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
