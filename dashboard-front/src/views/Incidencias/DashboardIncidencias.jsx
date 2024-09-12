import React from 'react'
import '../../Css/CssIncidencias/Dashboard.css'
import GraficaPai from '../../Componentes/GraficaPai'
import Graficalinea from '../../Componentes/Graficalinea'

export default function DashboardIncidencias() {
  return (
    <>
      <div className="row">
        <h3 className='m-2'>Dashboard Incidencias</h3>
        <div className="col-8">
          <div className="card-box m-2 p-3 shadow-lg">
            <h2 className='my-3'>Bienvenida, Ameli Flores</h2>
            <p>Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sapiente placeat ea
              consectetur officiis hic, itaque perspiciatis
              eum nihil reiciendis tempora natus nulla,
              pariatur atque veritatis corporis perferendis rerum?
              Atque voluptatem dignissimos expedita saepe odit.
              Earum, suscipit est labore, ab modi consectetur quod
              perspiciatis quae impedit architecto obcaecati inventore quibusdam delectus?
            </p>
          </div>
        </div>
        <div className="col-2">
          <div className="card-box m-1 p-3 shadow-lg">
            <h2>23</h2>
            <p>Incidencias abiertas</p>
          </div>
        </div>
        <div className="col-2">
          <div className="card-box m-1 p-3 shadow-lg">
          <h2>4</h2>
          <p>Incidencias Resuletas</p>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-4">
          <div className="card-box shadow p-3">
            <h3>Grafica de evaluacion destinos</h3>
            <GraficaPai/>
          </div>
        </div>
        <div className="col-4">
          <div className="card-box shadow p-2">
            <h2>Incidencia por sucursal</h2>
            <Graficalinea/>
          </div>
        </div>
        <div className="col-4">
          <div className="card-box shadow p-2">
            <h2>Actividad reciente</h2>
          </div>
        </div>
      </div>
    </>
  )
}
