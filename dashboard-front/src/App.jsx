/* import Swal from 'sweetalert2' */
import { Suspense, createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { routes_primary } from './routes';
import { Spinner } from 'react-bootstrap';
import { urlapi } from './utileria/config';



export const globalData = createContext()

function App() {


  /*   const [dataLogisticState, setDataLogistic] = useState(null); */
  const [sessionUserState, setSessionUser] = useState(null);
  /* const [sessionUserState, setSessionUser] = useState({"id":"649", "nombre":"Diego Iran Gutierrez Contreras"}); */
  const [destinosListState, setDestinosList] = useState(null);
  const [tokenUserState, setTokenUser] = useState(null);
  const [rutaActual, setRutaActual] = useState(null);
  const [btnSwitch, setBtnSwitch] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [destinosListXllegar, setDestinosListXllegar] = useState(null);



  /*  const urlApiNextpack = 'http://localhost/trafico/get_data'; */
  

  useEffect(() => {
    
  /*   const urlParams = new URLSearchParams(window.location.search);
    const tokenUser = urlParams.get('id');  */
    const tokenUser = 649;
  

    const peticionSidebar = async (tokenUser) => {
      /* const urlApiNextpackSidebar = '/trafico/get_destinos/' + tokenUser; */
      const urlApiNextpackSidebar = urlapi+'/trafico/get_destinos/' + tokenUser;
      await fetch(urlApiNextpackSidebar)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          if (data) {

            setDestinosList(data.Destinos)
            setDestinosListXllegar(data.DestinosXllegar)
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
    
    const peticiones = async (tokenUser) => {
      const urlApiNextpack = urlapi + '/trafico/get_session_user/' + tokenUser;
      await fetch(urlApiNextpack)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          /* setDestinosList(data) */
          if (data) {
            setSessionUser(data)
            setTokenUser(tokenUser)
           
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
    tokenUser ? peticiones(tokenUser) : window.location.href = 'http://216.250.126.250/jrpaqueteria';
    tokenUser ? peticionSidebar(tokenUser) : console.log('cargando...')
    
    


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
  if (sessionUserState !== null && destinosListState !== null) {
 
    return (
      <>
        <globalData.Provider value={{ 
          destinosListState, 
          sessionUserState, 
          setDestinosList, 
          rutaActual, 
          setRutaActual, 
          btnSwitch, 
          setBtnSwitch, 
          toggleSidebar, 
          setToggleSidebar,
          destinosListXllegar
        }}>
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
        </globalData.Provider>
      </>

    );//fin del return 
  } else {
    return (
      <>
     
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col-2">
            <Spinner className='Spinner-Graph'></Spinner>
            </div>
          </div>
        
        </div>
      </>
    )
  }
}


export default App;