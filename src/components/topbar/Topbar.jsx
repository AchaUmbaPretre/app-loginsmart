import './topbar.scss';
import {
  BellOutlined,
  SettingOutlined,
  MailOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Tooltip } from 'antd';
import { useSelector } from 'react-redux';


const Topbar = () => {
  const userName = useSelector((state) => state.auth.user.nom);

  const menu = (
    <Menu
      items={[
        { key: '1', label: 'Profil', icon: <UserOutlined /> },
        { key: '2', label: 'Paramètres', icon: <SettingOutlined /> },
        { key: '3', label: 'Déconnexion', icon: <MailOutlined /> },
      ]}
    />
  );

  return (
    <div className="topBar">
      <div className="menu-icon">
        <Tooltip title="Menu">
          <MenuFoldOutlined />
        </Tooltip>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Recherche..." />
      </div>
      <div className="user-profile">
        <Tooltip title="Messages">
          <MailOutlined className="icon mail-icon" />
        </Tooltip>
        <Tooltip title="Notifications">
          <BellOutlined className="icon bell-icon" />
        </Tooltip>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <div className="user-info">
            <Avatar size="small" style={{ backgroundColor: '#6c63ff' }}>
              {userName[0]}
            </Avatar>
            <div className="user-details">
              <span className="user-name">{userName}</span>
              <DownOutlined className="down-icon" />
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
