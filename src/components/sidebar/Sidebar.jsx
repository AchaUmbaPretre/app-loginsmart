import { Layout, Menu, message } from 'antd';
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
  ThunderboltOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthService from '../../services/auth.service';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const Logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('persist:root');
      message.success('Déconnexion réussie !');
      navigate('/login');
      window.location.reload();
    } catch (error) {
      message.error('Erreur lors de la déconnexion.');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
{/*               <img src={logo} alt="" className="sidebar-logo_v" />
 */}    <h1 className="sidebar-h1" onClick={()=>navigate('/')}><span className='title'>L</span>OGINSMART</h1>
      </div>
      <Sider width={240} style={{ backgroundColor: 'transparent' }}>
        <Menu
          mode="inline"
          selectedKeys={[window.location.pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            backgroundColor: 'transparent',
            fontSize: '18px',
          }}
        >
          <Item key="/" icon={<HomeOutlined className='icon_sidebar' style={{ fontSize: '18px'}} />} onClick={toggleMenu}>
            <Link to="/">Accueil</Link>
          </Item>
          <SubMenu key="sub1" icon={<AppstoreAddOutlined style={{ fontSize: '18px'}} />} title="Carburant" onClick={toggleMenu}>
            <Item key="/carburant" >
              <Link to="/carburant">Liste carburant</Link>
            </Item>
            <Item key="/generateur_carburant" >
              <Link to="/generateur_carburant">Génerateurs</Link>
            </Item>
            <Item key="/rapport_carburant" >
              <Link to="/rapport_carburant">Rapport</Link>
            </Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ToolOutlined style={{ fontSize: '18px'}} />} title="Maintenance">
            <Item key="/vehicule_maintenance">
              <Link to="/vehicule_maintenance">Véhicule</Link>
            </Item>
            <Item key="/controle_technique">
              <Link to="/controle_technique">Controle technique</Link>
            </Item>
            <Item key="/generateur_maintenance">
              <Link to="/generateur_maintenance">Génerateur</Link>
            </Item>
            <Item key="/rapport_maintenance">
              <Link to="/vehicule_maintenance">Rapport</Link>
            </Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<CarOutlined style={{ fontSize: '18px' }} />} title="Véhicule">
            <Item key="/vehicule">
              <Link to="/vehicule">Liste des véhicules</Link>
            </Item>
            <Item key="/new_vehicule">
              <Link to="/new_vehicule">Créer un nouveau vehicule</Link>
            </Item>
{/*             <Item key="/affectations">
              <Link to="/affectations">Affectations</Link>
            </Item> */}
            <Item key="/assurance">
              <Link to="/assurance">Assurances</Link>
            </Item>
            <Item key="/sinistres_inspection">
              <Link to="/sinistres_inspection">Sinistres & Inspection</Link>
            </Item>
          </SubMenu>
{/*           <SubMenu key="sub4" icon={<ThunderboltOutlined style={{ fontSize: '18px'}} />} title="Générateur">
            <Item key="/generateur">
              <Link to="/generateur">Liste des générateurs</Link>
            </Item>
          </SubMenu> */}
          <SubMenu key="sub5" icon={<TeamOutlined style={{ fontSize: '18px'}} />} title="Personnel">
            <Item key="/chauffeur">
              <Link to="/chauffeur">Liste des chauffeurs</Link>
            </Item>
            <Item key="/personnel">
              <Link to="/personnel">Liste des Personnels</Link>
            </Item>
{/*             <Item key="/liste_conge">
              <Link>Liste de congé</Link>
            </Item> */}
            <Item key="/liste_affectation">
              <Link to="/liste_affectation">Liste d'affectations</Link>
            </Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<BankOutlined style={{ fontSize: '18px' }} />} title="Approvisionnement">
            <Item key="/approvisionnement">
              <Link to="/approvisionnement">Acheté</Link>
            </Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<SettingOutlined style={{ fontSize: '18px' }} />} title="Parametre">
            <Item key="/localisation">
              <Link to="/localisation">Localisation</Link>
            </Item>
            <Item key="/sites">
              <Link to="/sites">Sites</Link>
            </Item>
            <Item key="/fournisseur">
              <Link to="/fournisseur">Fournisseurs</Link>
            </Item>
          </SubMenu>
          <Item key="logout" icon={<LogoutOutlined style={{ fontSize: '18px' }} />} onClick={Logout} className="logout-item">
            <Link>Déconnexion</Link>
          </Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
