/* import Swal from 'sweetalert2' */
import { createContext, useEffect, useState } from 'react';
import GraficaMt3PorSucursal from './Componentes/GraficaMt3PorSucursal';
import Navbar from './Componentes/Navbar';
import SideBar from './Componentes/SideBar';
import SideBar2 from './Componentes/SideBar2';
/* import Data from './Data/Data2.json'; */
import SeccionDestino from './Componentes/SeccionDestino';
import MainContainer from './Componentes/MainContainer';




export const dataLogisticContext = createContext()

function App() {


  const [dataLogisticState, setDataLogistic] = useState(null);




  const urlApiNextpack = '/trafico/get_data';
  /*  const urlApiNextpack = 'http://localhost/trafico/get_data'; */


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


  //------------------------------------------------------------------

  /* 
  //rezgurdo de la funcion que ya tenemos para cargar los datos 

  useEffect(() => {
     
    setDataLogistic(Data)

    if(dataLogisticContext){
     const destinos = dataLogisticContext.destinos;
     const arrayIdsDestinos = destinos.map((destino, index )=>{
       return Object.assign({id:destino.id, isSelected:false})
     })

     setArrayRenderizado(arrayIdsDestinos);
    }

   }, [Data]); */

  /* 
     useEffect(() => {
  
      const setData = async () => {
  
      }
  
      setDataLogistic(Data)
  
    }, []);  */

  /*   const  updateRender=(infoupdate)=>{
     setRenderInicial(infoupdate)
    } */

  if (dataLogisticState == null) {
    return (
      <>

        <dataLogisticContext.Provider value={{ dataLogisticState }}>
          {console.log("url server: " + process.env.REACT_APP_SERVER_BACK)}
          <SideBar2 />
          <Navbar/>
          <MainContainer />
         {/*  <div className="container-fluid">
            <div className="row">
              <div className="col-10 col-md-10">
                {dataLogisticState.Destinos.map((Destino) => {
                  return <SeccionDestino key={Destino.nombre} idDestino={Destino.id} />; // Debes devolver algo en cada iteración
                })} */}
                {/*  <SeccionDestino idDestino={1} />
                <SeccionDestino idDestino={21} />
                <SeccionDestino idDestino={2} />
                <SeccionDestino idDestino={3} />
                <SeccionDestino idDestino={4} />
                <SeccionDestino idDestino={17} />
                <SeccionDestino idDestino={6} />
                <SeccionDestino idDestino={8} />
                <SeccionDestino idDestino={13} /> */}
          {/*     </div>
            </div>
          </div> */}
        </dataLogisticContext.Provider>
      </>

    );//fin del return 
  } else {
    console.log("cargando....")
  }
}


export default App;