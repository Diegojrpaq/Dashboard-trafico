/* import Swal from 'sweetalert2' */
import { createContext, useEffect, useState } from 'react';
/* import Graficalinea from './Componentes/Graficalinea';
import GraphChart from './Componentes/GraphChart'; */
import Navbar from './Componentes/Navbar';
import SideBar from './Componentes/SideBar';
import Data from './Data/Data2.json';
/* import Swal from 'sweetalert2' */


export const dataLogisticContext = createContext()



function App() {

  
  const [dataLogisticState, setDataLogistic] = useState(null);
  

  /*  const urlApiJrTrafico = 'https://pokeapi.co/api/v2/pokemon/snorlax'; */

  /*   useEffect(() => {
   */

  /*  fetch(urlApiJrTrafico).then((resp) => {
     return resp.json();
   }).then((data) => {
     setDataTraficoState(data)
     if (data) {
       Swal.fire(
         'Good job!',
         'Se recibio la informacion correctamente',
         'success'
       )
     }
   }).catch(
     () => console.log('Error al cargar el rastreo ')
   ) */


    useEffect(() => {
      
     setDataLogistic(Data)
    }, [Data]);



    if(dataLogisticState!=null){
      return (
        <>
          <dataLogisticContext.Provider value={dataLogisticState}>

            {/* navbar bootstrap */}
            <Navbar></Navbar>
            {/* navbar bootstrap */} 
            {/* contenedor principal */}
            <div className="container-fluid g-0">
              <div className="row">
                <div className="col-2">
                  <SideBar></SideBar>
                </div>
                <div className="col-10">
                  <div className="row"><h1>tabla</h1></div>
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
    }else{console.log("cargando los datos de la api")
    }
  
}


function apartadocodigo(){
 return(
  <div className="container">
  <div className="row">
    <div className="col-2">

    </div>
    <div className="col-10">
      <div>
        <h1>graficas charts</h1>
        <div>
          <p className='m-2'><b>ejemplo #1 :</b> Grafico de lineas basicas</p>
          <div className="bg-ligth mx-auto px-2 border border-2 border-primary container-chart">
            {/*  <Graficalinea></Graficalinea> */}
          </div>
        </div>
        <hr />
        <div>
          <p className='m-2'><b>ejemplo #1 :</b> Grafico de barras basicas</p>
          <div className="bg-ligth mx-auto px-2 border border-2 border-primary  container-chart">
            {/*   <GraphChart></GraphChart> */}
          </div>
        </div>
        <hr />
        <div>
          <p className='m-2'><b>ejemplo #1 :</b> Grafico circular basicas</p>
          <div className="bg-ligth mx-auto px-2 border border-2 border-primary container-chart">
          </div>
        </div>
        <hr />
      </div>


    </div>
  </div>
</div>
 );
}

export default App;
