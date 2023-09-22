/* import Swal from 'sweetalert2' */
import { Suspense, createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes_primary } from './routes';
import { Spinner } from 'react-bootstrap';



export const destinosListContext = createContext()

function App() {


/*   const [dataLogisticState, setDataLogistic] = useState(null); */
  const [sessionUser, setSessionUser] = useState({"id":"649", "nombre":"Diego Iran Gutierrez Contreras"});
  const [destinosListState, setDestinosList] = useState(null);




  /*  const urlApiNextpack = 'http://localhost/trafico/get_data'; */
  const urlApiNextpack = '/trafico/get_destinos';
     
    useEffect(() => {
      const peticiones = async () => {
        await fetch(urlApiNextpack)
          .then((resp) => {
            return resp.json();
          }).then((data) => {
            setDestinosList(data)
            if (data) {
              console.log(data)
              //     Swal.fire(
                //   'Good job!',
                  // 'Se recibio la informacion correctamente Nextpack',
                   //'success'
                 //) 
  
            }
          }).catch(
            () => console.log('Error al cargar los destinos')
          )
      }
  
      peticiones();

    }, []);




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

  if (destinosListState !== null) {
    return (
      <>

        <destinosListContext.Provider value={{destinosListState, sessionUser}}>
          <BrowserRouter>
            <Suspense>
              <Routes>
                {
                  routes_primary.map((route, index) => {
                    return (
                      route.element && (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          element={<route.element />}
                        />
                      )
                    )
                  })
                }
              </Routes>
            </Suspense>
          </BrowserRouter>
        </destinosListContext.Provider>
      </>

    );//fin del return 
  } else {
   return(
    <>
    <Spinner></Spinner>
    </>
   )
  }
}


export default App;