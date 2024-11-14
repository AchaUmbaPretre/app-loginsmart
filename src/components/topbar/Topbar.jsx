import './topbar.scss';
import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const Topbar = () => {
  return (
    <div className="topBar">
      <div className="search-bar">
        <input type="text" placeholder="Recherche..." />
      </div>
      <div className="user-profile">
        <BellOutlined className="icon" />
        <SettingOutlined className="icon" />
        <UserOutlined className="icon" />
      </div>
    </div>
  );
};

export default Topbar;
