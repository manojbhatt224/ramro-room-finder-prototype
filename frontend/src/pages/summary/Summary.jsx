import React, {lazy, Suspense} from 'react'
import './Summary.css'
import ListPage from '../explore/ListPage';


// const Map= lazy(()=>import('../../components/map/ExploreMap'))
const Summary = () => {
  const location = { lat: 40.7128, lng: -74.006 };
  return (
<ListPage/>
  )
}

export default Summary