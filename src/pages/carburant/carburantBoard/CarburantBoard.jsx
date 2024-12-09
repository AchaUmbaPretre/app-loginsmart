import { Divider } from 'antd'
import './carburantBoard.scss'

const CarburantBoard = () => {
  return (
    <>
        <div className="carburantBord">
            <div className="carburantBord-wrapper">
                <div className="carburantBord_top">
                    TOP BAR
                </div>
                <Divider className='title_row'></Divider>
                <div className="carburantBord_bottom">
                    BOTTOM BAR
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantBoard