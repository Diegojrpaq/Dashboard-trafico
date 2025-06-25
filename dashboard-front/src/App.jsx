/* import Swal from 'sweetalert2' */
import { Suspense, createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { routes_primary } from './routes';
import { Spinner } from 'react-bootstrap';
import { urlapi } from './utileria/config';
import { Swal } from 'sweetalert2';



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
  const [destinosPlanRuta, setDestinosPlanRuta] = useState(null);
  const [destPlanLlegada, setDestPlanLlegada] = useState(null);
  const [destConfigLlegadas, setDestConfigLlegadas] = useState(null);

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
   // const tokenUser = urlParams.get('id');
    const tokenUser = 1591;


    const peticionSidebar = async (tokenUser) => {
      const urlApiNextpackSidebar = urlapi + '/trafico/get_destinos/' + tokenUser;
      await fetch(urlApiNextpackSidebar)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          if (data) {
            setDestinosList(data.Destinos)
            setDestinosListXllegar(data.DestinosXllegar)
            setDestinosPlanRuta(data.DestinosPlanRuta)
            setDestConfigLlegadas(data.DestinosConfiguracionLlegadas)
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
          }
        }).catch(
          () => console.log('Error al cargar los destinos')
        )
    }

    const peticionDestinosPlanLlegada = async () => {
      const urlApiNextpack = urlapi + "/trafico/get_destinosPlanLlegada";
      await fetch(urlApiNextpack)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          if (data) {
            setDestPlanLlegada(data);
          }
        }).catch(
          () => console.log('Error al cargar los destinos plan llegada')
        )
    }
    tokenUser ? peticiones(tokenUser) : window.location.href = 'http://216.250.126.250/jrpaqueteria';
    tokenUser ? peticionSidebar(tokenUser) : console.log('cargando...')
    tokenUser ? peticionDestinosPlanLlegada() : console.log("Cargando destinos plan llegada");

  }, []);

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
          destinosListXllegar,
          destinosPlanRuta,
          destPlanLlegada,
          destConfigLlegadas
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