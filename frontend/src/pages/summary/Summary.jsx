import React, {lazy, Suspense} from 'react'
import './Summary.css'
import ListingDetail from '../../components/listing/ListingDetail';

// const Map= lazy(()=>import('../../components/map/Map'))
const Summary = () => {
  const location = { lat: 40.7128, lng: -74.006 };
  return (
<div>

<ListingDetail/>
{/* <div className="map">
<Suspense fallback={<h1>Loading...</h1>}>
<Map/>
</Suspense>
</div> */}
</div>
  )
}

export default Summary