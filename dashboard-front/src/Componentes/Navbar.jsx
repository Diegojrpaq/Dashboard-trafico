import React, { Component } from 'react'
import '../Css/Navbar.css'

export default class Navbar extends Component {

 /*   //Este es el use efect original donde se genera la peticion sobre de todos los datos 
   //correspondientes al json data2.json y pasar por props cada uno de los destinos a la seccion 
   useEffect(() => {
     const peticiones = async () => {
       await fetch(urlApiNextpack)
         .then((resp) => {
           return resp.json();
         }).then((data) => {
           setDataLogistic(data)
           if (data) {
             console.log(data)
             //     Swal.fire(
               //   'Good job!',
                 // 'Se recibio la informacion correctamente Nextpack',
                  //'success'
                //) 
 
           }
         }).catch(
           () => console.log('Error al cargar el rastreo ')
         )
     }
 
     peticiones();
 
   }, []); */




  render() {
    return (
      <>
        {/* <!-- Navbar en la parte superior --> */}
        <nav className="navbar navbar-expand-lg navbar-dark  fixed-top">
          <button className="btn btn-primary">hola</button>
          <a className="navbar-brand" href="#">Navbar</a>
          {/*   <!-- Agrega elementos del navbar aquí --> */}
        </nav>
      </>
       /*  <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000">Nextpack</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="http://localhost:3000">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://localhost:3000" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Acciones
                </a>
                <ul className="dropdown-menu-end dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="http://localhost:3000">Action</a></li>
                  <li><a className="dropdown-item" href="http://localhost:3000">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="http://localhost:3000">Something else here</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav> */
    )
  }
}
