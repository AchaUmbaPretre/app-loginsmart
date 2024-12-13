import { Breadcrumb, Button, Input, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';

const Generateur = ({ onAddChauffeur }) => {

    const columns = [
        { 
            title: '#', 
            dataIndex: 'id', 
            key: 'id', 
            render: (text, record, index) => index + 1, 
            width: "3%" 
        },
        {
          title: 'Code',
          dataIndex: 'code',
        },
        {
          title: 'Marque',
          dataIndex: 'marque'
        },
        {
          title: 'Carburant',
          dataIndex: 'carburant'
        },
        {
          title: 'Puissance',
          dataIndex: 'puissance'
        },
        {
          title: 'Dimension',
          dataIndex: 'dimension'
        },
        {
          title: 'Mise en service',
          dataIndex: 'mise_en_service'
        },
        {
          title: 'Reservoir',
          dataIndex: 'reservoir'
        },
        {
          title: 'Affectation',
          dataIndex: 'affectation'
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
                <h2 className="chauffeur_h2">Liste des génerateurs</h2>
                <Breadcrumb
                separator=">"
                items={[
                    { title: 'Accueil', href: '/' },
                    { title: 'Gestion', href: '/gestion' },
                    { title: 'Génerateur' },
                ]}
                className="chauffeur_breadcrumb"
                />
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher un génerateur"
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
                    Nouveau chauffeur
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

export default Generateur;
