import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { urlapi } from '../../utileria/config';
import { globalData } from '../../App';
import SpinnerMain from '../../viewsItems/SpinnerMain';
import TablePlaneacionLlegadas from '../../viewsItems/tables/TablePlaneacionLlegadas';
import { formattedCantidad, totales } from '../../utileria/utils';
import ContainerTotales from '../../viewsItems/Cards/CardsTotalesPlaneacionLlegadas/ContainerTotales';

export default function PlaneacionLlegadas() {
    const { idDestino } = useParams();
    const { destPlanLlegada } = useContext(globalData);
    const [guiasXllegar, setGuiasXllegar] = useState(null);
    const [destinosConfigurados, setDestinosConfigurados] = useState(null);
    let nombreDestino;

    destPlanLlegada?.Destinos?.forEach((destino) => {
        if (destino.id === Number(idDestino)) {
            nombreDestino = destino.nombre;
        }
    })

    const peticiones = async (id) => {
        //const urlApiNextpack = urlapi + '/trafico/get_viajeActivo/' + id;
        const urlApiNextpack = "http://192.168.10.211/trafico/get_planLlegada/" + id;
        await fetch(urlApiNextpack)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data.catalogoGuiasPlaneadas !== null) {
                    setGuiasXllegar(data.catalogoGuiasPlaneadas);
                    //setDestinosConfigurados(data.DestinosConfigurados)
                } else {
                    setGuiasXllegar([])
                }
            }).catch(
                () => {
                    setGuiasXllegar([]);
                    console.log('Error al cargar el catalogo de guías planeadas por llegar')
                }
            )
    }

    useEffect(() => {
        peticiones(idDestino);
        return () => {
            setGuiasXllegar(null);
        }
    }, [idDestino])

    if (guiasXllegar !== null) {
        if (guiasXllegar.length > 0) {
            const volumenTotal = totales(guiasXllegar, "volumen");
            const pesoTotal = formattedCantidad(totales(guiasXllegar, "peso"));
            const fleteTotal = formattedCantidad(totales(guiasXllegar, "flete"));
            const montoSeguroTotal = formattedCantidad(totales(guiasXllegar, "monto_seguro"));
            const subtotalTotal = formattedCantidad(totales(guiasXllegar, "subtotal"));
            const sumas = [
                {
                    nombre: "Volumen",
                    suma: volumenTotal,
                    signo: "mt3"
                },
                {
                    nombre: "Peso",
                    suma: pesoTotal,
                    signo: "kg"
                },
                {
                    nombre: "Flete",
                    suma: fleteTotal,
                    signo: "$"
                },
                {
                    nombre: "Monto seguro",
                    suma: montoSeguroTotal,
                    signo: "$"
                },
                {
                    nombre: "Subtotal",
                    suma: subtotalTotal,
                    signo: "$"
                }
            ];

            const destinosSinRepetir = new Set();
            const dataDestinos = [];

            guiasXllegar?.forEach((guia) => {
                const idDestino = guia.viaje_ubicacion_id;
                //Verificamos si el destino ya esta en el set de destinos
                if (!destinosSinRepetir.has(idDestino)) {
                    destinosSinRepetir.add(idDestino);
                    dataDestinos.push({
                        id: idDestino,
                        nombre: guia.ubicacionDestino,
                        guias: guiasXllegar.filter(guia => (guia.viaje_ubicacion_id === idDestino && guia.destino_id === idDestino))
                    });
                }
            });
            return (
                <>
                    <div className="col-12 col-md-12  p-1">
                        <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                            <h2>Planeación de Llegadas {nombreDestino}</h2>
                            <div>
                                <ContainerTotales sumas={sumas} />
                            </div>
                            <Accordion key={100} className='mb-4'>
                                <Accordion.Item eventKey={100}>
                                    <Accordion.Header>
                                        <HeaderLLegadas
                                            nombre={"Total en general"}
                                            guias={guiasXllegar}
                                        />
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <TablePlaneacionLlegadas
                                            guias={guiasXllegar}
                                            nombreDestino={"todosLosDestinos"}
                                            volumenTotal={totales(guiasXllegar, "volumen")}
                                            pesoTotal={formattedCantidad(totales(guiasXllegar, "peso"))}
                                            fleteTotal={totales(guiasXllegar, "flete")}
                                            montoSeguroTotal={totales(guiasXllegar, "monto_seguro")}
                                            subtotalTotal={totales(guiasXllegar, "subtotal")}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <h3>Detalle por Destino</h3>
                            {
                                dataDestinos.map((destino, i) => (
                                    <Accordion key={i} className=''>
                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header>
                                                <HeaderLLegadas
                                                    nombre={destino.nombre}
                                                    guias={destino.guias}
                                                />
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <TablePlaneacionLlegadas
                                                    guias={destino.guias}
                                                    nombreDestino={destino.nombre}
                                                    volumenTotal={totales(destino.guias, "volumen")}
                                                    pesoTotal={formattedCantidad(totales(destino.guias, "peso"))}
                                                    fleteTotal={totales(destino.guias, "flete")}
                                                    montoSeguroTotal={totales(destino.guias, "monto_seguro")}
                                                    subtotalTotal={totales(destino.guias, "subtotal")}
                                                />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))
                            }
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <h1 className='text-dark m-2'>No se encontraron guías</h1>
            )
        }
    } else {
        return (
            <SpinnerMain />
        )
    }
}

function HeaderLLegadas(props) {
    return (
        <div className='container mx-0'>
            <div className="badge mt-1"
                style={{
                    fontWeight: "normal",
                    fontSize: "1.2rem",
                    backgroundColor: "#314051",
                    padding: "7px",
                    borderRadius: "8px",
                    color: "white"
                }}
            >
                {props.nombre}
            </div>
            <div className='row align-items-center mt-2' style={{ fontSize: "1.1rem" }}>
                <div className='col'>Cantidad de Guías: {props.guias.length}</div>
                <div className='col'>Peso: {formattedCantidad(totales(props.guias, "peso"))} kg</div>
                <div className='col'>Volumen: {totales(props.guias, "volumen")} mt3</div>
                <div className='col'>Subtotal: ${formattedCantidad(totales(props.guias, "subtotal"))}</div>
            </div>
        </div>
    )
}
