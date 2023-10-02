import React from 'react';
import { Spinner } from 'react-bootstrap';

const Grafica = React.lazy(() => import('../src/Componentes/Trafico'));
const DefaultLayout = React.lazy(() => import('../src/layout/DefaultLayout'))
const PlaneacionRutas = React.lazy(() => import('../src/views/trafico/PlaneacionRutas'))

const routes_secondary = [
   /*  {path: '/trafico/:id', name: 'Hola', element: Grafica}, */
    {path: '/trafico/planeacion/:idDestino', name: 'Planeacion', element: PlaneacionRutas},
    {path: '/trafico/viajesactivos/:idDestino', name: 'Rutas_Activas', element: RutasActivas },
    {path: '/trafico/viajesxllegar/:idDestino', name: 'Rutas_por_llegar', element: RutasXLlegar}
]

const routes_primary = [
    {path: '*', name: 'Trafico', element: DefaultLayout},
]

export {
    routes_secondary,
    routes_primary,
}