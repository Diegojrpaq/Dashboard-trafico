/* import Swal from 'sweetalert2' */
import { createContext, useEffect, useState } from 'react';
 import Graficalinea from './Componentes/Graficalinea';
import GraphChart from './Componentes/GraphChart'; 
import Navbar from './Componentes/Navbar';
import SideBar from './Componentes/SideBar';
import Data from './Data/Data2.json';

/* import Swal from 'sweetalert2' */
console.log("Aqui ya esta listo el archivo ? " + Data);

export const dataLogisticContext = createContext()

function App() {

  
  const [dataLogisticState, setDataLogistic] = useState(null);
  const [renderInicial, setRenderInicial ]=useState("hello word");
 
  

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


    useEffect(() => {
      console.log("impresion desde el efecto " + Data);
      const setData= async()=>{

      }
      
     setDataLogistic(Data)
     
    }, [Data]);

 /*   const  updateRender=(infoupdate)=>{
    setRenderInicial(infoupdate)
   } */

    if(dataLogisticState!=null){
      return (
        <>
          <dataLogisticContext.Provider value={{dataLogisticState, renderInicial, setRenderInicial}}>

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
                  <Pruebacheck></Pruebacheck>
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