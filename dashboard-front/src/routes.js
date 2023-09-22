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

//Arreglo de rutas
const routes_secondary = [
    {path: '/trafico/:id', name: 'Hola', element: Grafica},
    {path: '/planeacion', name: 'Planeacion', element: PlaneacionRutas}
]
//-------------------------------------Fin segundo menu de rutas--------------------------------







export {
    routes_secondary,
    routes_primary,
}