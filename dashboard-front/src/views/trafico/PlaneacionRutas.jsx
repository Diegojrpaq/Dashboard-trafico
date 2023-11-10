import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Accordion, Spinner } from 'react-bootstrap';
import GraficaPlaneacion from '../../viewsItems/graphs/GraficaPlaneacion';
import TablePlaneacion from '../../viewsItems/tables/TablePlaneacion';
import { globalData } from '../../App'
import { urlapi } from '../../utileria/config';
import TablaArbol from '../../viewsItems/tables/TablaArbol';

export default function PlaneacionRutas() {
    const { idSucursal, idRuta } = useParams();
    const navigate = useNavigate();
    const [planRuta, setPlanRuta] = useState(null);
    const { destinosListState, btnSwitch } = useContext(globalData);
    const destinosList = destinosListState;
    const timer = 300000 // Duración de 1min, para 5 min son 300,000
    const peticiones = async (id) => {
        const urlApiNextpack = urlapi + '/trafico/get_planRuta/' + id;
        await fetch(urlApiNextpack)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data) {
                    //console.log(data)
                    setPlanRuta(data)
                }
            }).catch(
                () => console.log('Error al cargar los destinos')
            )
    }

    useEffect(() => {
        peticiones(idRuta)
        if(!btnSwitch) {
            const interval = setInterval(() => {
                //console.log("Interval", idRuta)
                peticiones(idRuta)
            }, timer)
            return () => {
                clearInterval(interval)
                setPlanRuta(null)
            };
        }
        return () => {
            setPlanRuta(null)
        };
       
    }, [idRuta, btnSwitch]);

    // //Obtener las sucursales que tengan rutas
    let sucursalesConRutas = [];
    destinosList.map((destino) => {
        for (let i = 0; i < destino.sucursales.length; i++) {
            const sucursal = destino.sucursales[i];
            if (sucursal.rutas_configuradas != null) {
                sucursalesConRutas.push(sucursal)
            }
        }
    })
    //Iterar las rutas de cada sucursal
    const idRutas = []
    const [indexAct, setIndexAct] = useState(0);

    sucursalesConRutas?.map((sucursal) => {
        const idSuc = Number(idSucursal);
        if (sucursal.id_sucursal === idSuc) {
            sucursal.rutas_configuradas.map((ruta) => {
                idRutas.push(ruta.id_ruta)
            })
        }
    })
    useEffect(() => {
        if (idRutas[indexAct] !== undefined) {
            if (btnSwitch && idRutas.length > 1) {
                const intervalId = setInterval(() => {
                    navigate(`/trafico/planeacion/${idSucursal}/${idRutas[indexAct]}`);
                    setIndexAct((prevIndex) =>
                        prevIndex === idRutas.length - 1 ? 0 : prevIndex + 1
                    );
                }, timer);
                return () => clearInterval(intervalId)
            }
        } else {
            setIndexAct(0)
        }
    }, [navigate, indexAct, idRutas, btnSwitch])

    return (
        <>
            {
                planRuta ? <div className="col-12 col-md-12 p-1">
                    <div className="col-item shadow p-3 mb-4 mx-0 rounded"> 
                        <GraficaPlaneacion
                            planRuta={planRuta}
                        />
                        <h3>Detalles</h3>
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>METRICAS</Accordion.Header>
                                <Accordion.Body>
                                    <TablePlaneacion
                                        guiasPlaneadas={planRuta?.rutas[0]?.catalogoGuiasPlaneadas}
                                        guiasEmbarcadas={planRuta?.rutas[0]?.catalogoGuiasEmbarcadas}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>HISTORIAL DE GUIAS PLANEADAS</Accordion.Header>
                                <Accordion.Body>
                                    <TablaArbol 
                                        guias={planRuta?.rutas[0]?.catalogoGuiasPlaneadas}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                            {
                                planRuta?.rutas[0]?.catalogoGuiasEmbarcadas != null ?
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>HISTORIAL DE GUIAS EMBARCADAS</Accordion.Header>
                                        <Accordion.Body>
                                            <TablaArbol
                                                guias={planRuta?.rutas[0]?.catalogoGuiasEmbarcadas}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    : <></>
                            }
                        </Accordion>
                    </div>
                </div>
                    :
                    <Spinner className='text-dark' />
            }
        </>
    )
}
