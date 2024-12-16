import { Table } from 'antd'

const AssuranceListeGaranti = () => {

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (_, __, index) => index + 1, width: "5%" },
        {
          title: 'Garanti',
          dataIndex: 'garanti',
          key: 'garanti',
        },
        {
          title: 'Date effet',
          dataIndex: 'date_effet',
          key: 'date',
        },
        {
          title: 'Echeance(mois)',
          dataIndex: 'echeance',
          key: 'echeance',
        },
      ];

      const dataSource = [
        {
          key: '1',
          garanti: 'DM',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          garanti: 'RC',
          age: 42,
        },
        {
            key: '3',
            garanti: 'INC',
            age: 42,
        },
        {
            key: '4',
            garanti: 'VOL',
            age: 42,
        },
      ];
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <>
        <div className="carburantBord">
            <div className="carburantBord-wrapper">
                <div className="carburantBord_top">
                    <h2 className="carburantBord-h2">Tableau de bord</h2>
                    <Table columns={columns} size="small" dataSource={dataSource} onChange={onChange} />
                </div>
            </div>
        </div>
    </>
  )
}

export default AssuranceListeGaranti