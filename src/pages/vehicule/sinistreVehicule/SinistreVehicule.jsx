import { Breadcrumb, Button, Input, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';

const SinistreVehicule = ({ onAddChauffeur }) => {

    const columns = [
        { 
            title: '#', 
            dataIndex: 'id', 
            key: 'id', 
            render: (text, record, index) => index + 1, 
            width: "3%" 
          },
        {
          title: 'N°',
          dataIndex: 'numero',
        },
        {
          title: 'Vehicule',
          dataIndex: 'vehicule'
        },
        {
          title: 'Par',
          dataIndex: 'par'
        },
        {
            title: 'Date',
            dataIndex: 'date'
        },
        {
            title: 'Carte verte',
            dataIndex: 'carte_verte'
        },
        {
            title: 'Commentaire',
            dataIndex: 'commentaire'
        },
        {
            title: 'Actions',
            dataIndex: 'actions'
        }
      ];
      const data = [];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      }; 

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">LISTE D'INSPECTIONS</h2>
                <Breadcrumb
                separator=">"
                items={[
                    { title: 'Accueil', href: '/' },
                    { title: 'Gestion', href: '/gestion' },
                    { title: 'Personnel' },
                ]}
                className="chauffeur_breadcrumb"
                />
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher un personnel"
                    prefix={<SearchOutlined />}
                    className="chauffeur_search"
                />
                <Button icon={<FilterOutlined />} className="chauffeur_filter">
                    Filtres
                </Button>
                <Button
                    className="chauffeur_btn"
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={onAddChauffeur}
                >
                    Nouvel assurancne
                </Button>
                </Space>
            </div>
        </div>
        <div className="chauffeur_bottom">
            <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChange} 
            />
        </div>
    </div>
  );
};

export default SinistreVehicule;
