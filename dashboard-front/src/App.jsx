/* import Swal from 'sweetalert2' */
import { createContext, useEffect, useState } from 'react';
import Graficalinea from './Componentes/Graficalinea';
import GraphChart from './Componentes/GraphChart';
import Navbar from './Componentes/Navbar';
import SideBar from './Componentes/SideBar';
import Data from './Data/Data.json';
/* import Swal from 'sweetalert2' */


const contextDataLogistic = createContext()



function App() {

 /*  const urlApiJrTrafico = 'https://pokeapi.co/api/v2/pokemon/snorlax'; */
  const [dataTraficoState, setDataTraficoState] = useState(null);

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

/*     if(Data){
      setDataTraficoState(Data)//esta linea es el harcodeo de cargar los datos hacia el estado lo correcto es cargarlo de la api
    }else{
      console.log('cargando...')
    }

    console.log(dataTraficoState)
  }, [dataTraficoState]); */



  return (
    <>
      <contextDataLogistic.Provider value= {dataTraficoState}>
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

      </contextDataLogistic.Provider>

    </>

  );
}

export default App;
