import React from 'react';
import { Spinner } from 'react-bootstrap';

const Grafica = React.lazy(() => import('../src/Componentes/Trafico'));
const DefaultLayout = React.lazy(() => import('../src/layout/DefaultLayout'))
const PlaneacionRutas = React.lazy(() => import('../src/views/trafico/PlaneacionRutas'))

const routes_secondary = [
    {path: '/trafico', name: 'Hola', element: Grafica},
    {path: '/planeacion', name: 'Planeacion', element: PlaneacionRutas}
]

const routes_primary = [
    {path: '*', name: 'Trafico', element: DefaultLayout},
]

export {
    routes_secondary,
    routes_primary,
}