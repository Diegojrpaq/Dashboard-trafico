import React, { Children } from 'react'
import '../Css/MainContainer.css'
export default function MainContainer(props) {
  return (
    <>
      <div className="container-rigth d-flex">
        {/*  <!-- Contenedor principal --> */}
        <div className="main-container container-fluid">
          {/*   <!-- Dos filas y tres columnas --> */}
          <div className="row">
                {props.children}
          </div>
        </div>
      </div>
    </>
  )
}
