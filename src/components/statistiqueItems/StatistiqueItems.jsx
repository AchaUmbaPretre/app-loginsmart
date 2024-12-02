import './statistiqueItems.scss'
import { CarOutlined, MoreOutlined } from '@ant-design/icons';


const StatistiqueItems = () => {
  return (
    <>
        <div className="statistique_item">
            <div className="static_wrapper">
                <div className="static_row" style={{background:'#2196F3'}}>
                    <div className="static_row_title">
                        <h2 className="static_h2">Title</h2>
                        <MoreOutlined />
                    </div>
                    <hr className="static_hr" />
                    <div className="static_center">
                        <h1 className="static_h1">100</h1>
                        <div className="static_left">
                            <CarOutlined className='static_icon'/>
                        </div>
                    </div>
                    <hr className="static_hr" />
                    <div className="static-bottom">
                        <span className="static_desc">Description</span>
                    </div>
                </div>
                <div className="static_row" style={{background:'#f50'}}>
                    <div className="static_row_title">
                        <h2 className="static_h2">Title</h2>
                        <MoreOutlined />
                    </div>
                    <hr className="static_hr" />
                    <div className="static_center">
                        <h1 className="static_h1">100</h1>
                        <div className="static_left">
                            <CarOutlined className='static_icon'/>
                        </div>
                    </div>
                    <hr className="static_hr" />
                    <div className="static-bottom">
                        <span className="static_desc">Description</span>
                    </div>
                </div>
                <div className="static_row" style={{background:'#FF9800'}}>
                    <div className="static_row_title">
                        <h2 className="static_h2">Title</h2>
                        <MoreOutlined />
                    </div>
                    <hr className="static_hr" />
                    <div className="static_center">
                        <h1 className="static_h1">100</h1>
                        <div className="static_left" >
                            <CarOutlined className='static_icon'/>
                        </div>
                    </div>
                    <hr className="static_hr" />
                    <div className="static-bottom">
                        <span className="static_desc">Description</span>
                    </div>
                </div>
                <div className="static_row" style={{background:'#4CAF50'}}>
                    <div className="static_row_title">
                        <h2 className="static_h2">Title</h2>
                        <MoreOutlined />
                    </div>
                    <hr className="static_hr" />
                    <div className="static_center">
                        <h1 className="static_h1">100</h1>
                        <div className="static_left">
                            <CarOutlined className='static_icon' />
                        </div>
                    </div>
                    <hr className="static_hr" />
                    <div className="static-bottom">
                        <span className="static_desc">Description</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default StatistiqueItems