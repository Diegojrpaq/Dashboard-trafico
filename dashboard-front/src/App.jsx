/* import Swal from 'sweetalert2' */
import { createContext, useEffect, useState } from 'react';
import Graficalinea from './Componentes/Graficalinea';
import GraficaMt3PorSucursal from './Componentes/GraficaMt3PorSucursal';
import Navbar from './Componentes/Navbar';
import SideBar from './Componentes/SideBar';
/* import Data from './Data/Data2.json'; */
import SeccionDestino from './Componentes/SeccionDestino';

import Swal from 'sweetalert2'

export const dataLogisticContext = createContext()

function App() {


  const [dataLogisticState, setDataLogistic] = useState(null);




  const urlApiNextpack = '/trafico/get_data';
 /*  const urlApiNextpack = 'http://localhost/trafico/get_data'; */



  useEffect(() => {
  const peticiones= async()=>{
   await fetch(urlApiNextpack)
    .then((resp) => {
      return resp.json();
    }).then((data) => {
      setDataLogistic(data)
      if (data) {
        console.log(data)
        Swal.fire(
          'Good job!',
          'Se recibio la informacion correctamente Nextpack',
          'success'
        )
      }
    }).catch(
      () => console.log('Error al cargar el rastreo ')
    )
  }

  peticiones();

  }, []);

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

  if (dataLogisticState != null) {
    return (
      <>
        <dataLogisticContext.Provider value={{ dataLogisticState }}>

          {/* navbar bootstrap */}
          <Navbar></Navbar>
          {/* navbar bootstrap */}
          {/* contenedor principal */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-2">
                <SideBar>
                </SideBar>
              </div>
              <div className="col-10">


               {/*  <SeccionDestino idDestino={1} />
                <SeccionDestino idDestino={} /> */}
                <SeccionDestino idDestino={27} />
                <SeccionDestino idDestino={17} />
              {/*   <SeccionDestino idDestino={21} />
                <SeccionDestino idDestino={17} /> */}
               





                <div className="row">
                  <div className="col-xl-6 col-12">
                    <div className="contenedordechart">
                      {/*  <Graficalinea></Graficalinea> */}
                    </div>
                  </div>
                  <div className="col-xl-6 col-12">
                    <div className="contenedordechart">
                      {/* <GraphChart></GraphChart> */}
                    </div>
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>
            </div>
          </div>
          {/* contenedor principal */}




        </dataLogisticContext.Provider>

      </>

    );//fin del return 
  }

}



export default App;