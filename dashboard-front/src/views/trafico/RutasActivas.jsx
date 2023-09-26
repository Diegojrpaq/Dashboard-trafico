import React from 'react'
import { useState } from 'react'
import GraficaRutasActivas from '../../viewsItems/graphs/GraficaRutasActivas'


export default function RutasActivas() {

  const [idDestino, setIdDestino] = useState(null)
  return (
    <>
            <div className="col-12 col-md-12">
                <div className="col-item shadow p-3 mb-4 rounded">
                    <h1 className="mb-0">Trafico</h1>
                    <p className="mb-4">Rutas Activas</p>
                    <GraficaRutasActivas/>
                  
                   
                    
                </div>
            </div>
        </>
  )
}
