import { Table } from 'antd'
import moment from 'moment';

const AssuranceListeGaranti = () => {

    const handleDateChange = (id, date) => {
        console.log(id, date)
    }

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
          render: (text, record) => {
            return (
                <input
                    style={{border:"none", padding:'8px', color:'#555', fontSize:'12px'}}
                    type="date"
                    onChange={(e) => handleDateChange(record.key, moment(e.target.value, 'YYYY-MM-DD'))}
                />
            );
          }
        },
        {
          title: 'Echeance(mois)',
          dataIndex: 'echeance',
          key: 'echeance',
          render: (text, record) => {
            return (
                <input
                    style={{border:"none", padding:'8px', color:'#555', fontSize:'12px'}}
                    type="date"
                    onChange={(e) => handleDateChange(record.key, moment(e.target.value, 'YYYY-MM-DD'))}
                />
            );
          }
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
                    <Table columns={columns} bordered dataSource={dataSource} onChange={onChange} />
                </div>
            </div>
        </div>
    </>
  )
}

export default AssuranceListeGaranti;