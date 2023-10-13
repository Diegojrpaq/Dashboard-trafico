import React, { Children, useContext } from 'react'
import { globalData } from '../App';
import '../Css/MainContainer.css'
export default function MainContainer(props) {
  const { toggleSidebar } = useContext(globalData)
  return (
    <>
      <div className="container-rigth d-flex">
        {/*  <!-- Contenedor principal --> */}
        <div className={toggleSidebar ? "toggle-main-container toggle-container-fluid" : "main-container container-fluid"}>
          {/*   <!-- Dos filas y tres columnas --> */}
          <div className="row">
                {props.children}
          </div>
        </div>
      </div>
    </>
  )
}
