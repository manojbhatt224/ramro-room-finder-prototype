import React from 'react'
import { Oval } from "react-loader-spinner"



const DLoader = () => {
  return (

    <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Oval visible={true} height="200" color="#000000" ariaLabel="oval-loading" />
    </div>
  )
  }

export default DLoader