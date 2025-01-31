import React, { useEffect, useState } from 'react'
import carburantService from '../../../../../services/carburant.service';

const CarburantTabDetailSiteChart = ({selectedVehicles}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    
    const fetchData = async () =>{
        try {
          setLoading(true);
          const [carburantData] = await Promise.all([
            carburantService.getCarburantRapportDetailSiteSelect(selectedVehicles)
          ])
          setData(carburantData)
    
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
      }
    
      useEffect(()=> {
        fetchData()
      }, [selectedVehicles])

  return (
    <div>CarburantTabDetailSiteChart</div>
  )
}

export default CarburantTabDetailSiteChart