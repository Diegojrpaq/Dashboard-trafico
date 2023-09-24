/* import Swal from 'sweetalert2' */
import { Suspense, createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { routes_primary } from './routes';
import { Spinner } from 'react-bootstrap';



export const globalData = createContext()

function App() {


  /*   const [dataLogisticState, setDataLogistic] = useState(null); */
  const [sessionUserState, setSessionUser] = useState(null);
  /* const [sessionUserState, setSessionUser] = useState({"id":"649", "nombre":"Diego Iran Gutierrez Contreras"}); */
  const [destinosListState, setDestinosList] = useState(null);
  const [tokenUserState, setTokenUser] = useState(null);




  /*  const urlApiNextpack = 'http://localhost/trafico/get_data'; */
  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenUser = urlParams.get('token');
    
    const peticiones = async (tokenUser) => {
      const urlApiNextpack = '/trafico/get_session_user/' + tokenUser;
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
    tokenUser ? peticiones(tokenUser): window.location.href = 'http://216.250.126.250/jrpaqueteria';
    

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
    console.log(sessionUserState)
            console.log(tokenUserState)
  if (sessionUserState !== null && (tokenUserState !== null || typeof tokenUserState !== 'undefined')) {
 
    return (
      <>
       {console.log(sessionUserState)}
      {console.log(tokenUserState)}
        <globalData.Provider value={{ destinosListState, sessionUserState }}>
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
     
        <Spinner></Spinner>
      </>
    )
  }
}


export default App;