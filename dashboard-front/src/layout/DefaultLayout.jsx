import React from 'react'
import Navbar from '../Componentes/Navbar'
import SideBar2 from '../Componentes/SideBar2'
import MainContainer from '../Componentes/MainContainer'
import { useParams } from 'react-router'

export default function DefaultLayout() {
    // const {id} = useParams();
    // console.log(id)
    return (
        <>
            <Navbar />
            <SideBar2 />
            <MainContainer>
            </MainContainer>
        </>
    )
}
