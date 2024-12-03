import './topbar.scss';
import { BellOutlined, SettingOutlined, MailOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

const Topbar = () => {
  return (
    <div className="topBar">
      <MenuFoldOutlined />
      <div className="search-bar">
        <input type="text" placeholder="Recherche..." />
      </div>
      <div className="user-profile">
        <MailOutlined className="icon" />
        <BellOutlined className="icon" />
        <SettingOutlined className="icon" />
        <UserOutlined className="icon" />
      </div>
    </div>
  );
};

export default Topbar;
