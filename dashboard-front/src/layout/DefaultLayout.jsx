import React from 'react'
import Navbar from '../Componentes/NavBar2'
import SideBar2 from '../Componentes/SideBar2'
import MainContainer from '../Componentes/MainContainer'
import { Routes, Route } from 'react-router-dom';
import { routes_secondary, routes_primary } from '../routes'


export default function DefaultLayout() {
    return (
        <>
            <Navbar />
            <SideBar2 />
            <MainContainer>
                <Routes>
                    {
                        routes_secondary.map((route, idx) => {
                            return (
                                route.element && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        name={route.name}
                                        element={<route.element />}
                                    />
                                )
                            )
                        })
                    }
                </Routes>
            </MainContainer>
        </>
    )
}
