import React, { useContext } from 'react'
import '../Css/Navbar.css'
import { globalData } from '../App'


export default function Navbar() {

    const { sessionUserState, rutaActual } = useContext(globalData);
    const userData = sessionUserState.User;
    let tituloNav = "";
    if (rutaActual === "Trafico" || rutaActual === null) {
        tituloNav = rutaActual;
    } else {
        tituloNav = `Trafico/${rutaActual}`;
    }

    return (
        <>
            {/* <!-- Navbar en la parte superior --> */}
            <nav className="navbar navbar-expand-lg navbar-dark row fixed-top">
                <div className='col d-flex align-items-center'>
                    <button className='btn btn-primary m-2'>
                        <i className="bi bi-list"></i>
                    </button>
                    <a className="navbar-brand" href="#">{tituloNav}</a>
                </div>

                <div className='col-7 d-none d-lg-flex flex-column justify-content-center align-items-end'>
                    <div className='row'>
                        <div className='col-1 d-flex justify-content-center align-items-center'>
                            <i className="bi bi-person-circle fs-2 text-light"></i>
                        </div>
                        <div className='col d-none d-lg-flex flex-column justify-content-center align-items-start'>
                            <span style={{ "color": "rgb(194 202 230)", "fontSize": "14px", "fontWeight": "500", "marginBottom": "3px", "borderBottom": "1px solid #ffc107" }}>
                                {userData ? userData.nombre : ""}
                            </span>
                            <span style={{ "color": "#a7b5e4", "fontSize": "13px", "marginBottom": "4px" }}>
                                {userData ? userData.puesto : ""}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
