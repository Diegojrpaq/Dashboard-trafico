import React from 'react';
//En este archivo se definen las rutas de las dos secciones de ruteo con las que contamos
//Se utiliza la funcion react.Lazy para importar los componentes una vez solicitados por el link,
//esto mejora el rendimiento de la aplicacion.
//para dicho efecto se requiere agregar la importacion del componente y setearlo en una constante
//ademas de agregar la constante al arreglo para poder ser utilizado.

//-------------------------------------Inicio primer menu de rutas--------------------------------
//importaciones
const DefaultLayout = React.lazy(() => import('../src/layout/DefaultLayout'))


//Arreglo de rutas
const routes_primary = [
    {path: '*', name: 'Trafico', element: DefaultLayout},

]
//-------------------------------------Fin primer menu de rutas--------------------------------



//-------------------------------------Inicio segundo menu de rutas--------------------------------
//importaciones
const Grafica = React.lazy(() => import('../src/Componentes/Trafico'));
const PlaneacionRutas = React.lazy(()=> import('./views/trafico/PlaneacionRutas'))
const RutasActivas = React.lazy(()=> import('./views/trafico/RutasActivas'))
const RutasXLlegar = React.lazy(()=> import('./views/trafico/RutasXLlegar'))
const Rutaprueba = React.lazy(()=> import('./Componentes/GraficaBarrasPruebaTopher'))
const planRutas = React.lazy(()=> import('./views/trafico/PlaneacionRutas'))

//Arreglo de rutas
const routes_secondary = [
   /*  {path: '/trafico/:id', name: 'Hola', element: Grafica}, */
    {path: '/trafico/planeacion/:idDestino', name: 'Planeacion', element: PlaneacionRutas},
    {path: '/trafico/viajesactivos/:idDestino', name: 'Rutas_Activas', element: RutasActivas },
    {path: '/trafico/viajesxllegar/:idDestino', name: 'Rutas_por_llegar', element: RutasXLlegar},
    {path: '/prueba', name: 'Rutas_por_llegar', element: Rutaprueba},
    {path: '/trafico/planeacion/:idSucursal/:idRuta', name: 'Planeacion', element: planRutas},
]
//-------------------------------------Fin segundo menu de rutas--------------------------------







export {
    routes_secondary,
    routes_primary,
}