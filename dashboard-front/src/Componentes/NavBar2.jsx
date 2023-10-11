import React, { useContext } from 'react'
import '../Css/Navbar.css'
import { globalData } from '../App'


export default function Navbar() {

    const { sessionUserState, rutaActual, btnSwitch, setBtnSwitch } = useContext(globalData);
    const userData = sessionUserState.User;
    let tituloNav = "";
    if (rutaActual === "Trafico" || rutaActual === null) {
        tituloNav = rutaActual;
    } else {
        tituloNav = `Trafico/${rutaActual}`;
    }

    const handleClic = () => {
        setBtnSwitch(!btnSwitch)
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
                        <div className="col-1 form-check form-switch d-flex justify-content-center align-items-center fs-4 me-5">
                            <input onClick={handleClic} className="form-check-input align-self-center" type="checkbox" id="flexSwitchCheckDefault" />
                            <span className='fs-6 align-self-center text-light ps-2 pt-1 '>{btnSwitch ? "ON" : "OFF"}</span>
                        </div>
                        <div className='col-1 d-flex justify-content-center align-items-center'>
                            <i className="bi bi-person-circle fs-2 text-light"></i>
                        </div>
                        <div className='col d-none d-lg-flex flex-column justify-content-center align-items-start'>
                            <span className='spanUser' style={{"color":"white"}}>
                                {userData ? userData.nombre : ""}
                            </span>
                            <span className='spanPuesto'>
                                {userData ? userData.puesto : ""}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
