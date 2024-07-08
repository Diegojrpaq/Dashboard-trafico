import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { urlapi } from '../../utileria/config';
import { globalData } from '../../App';
import SpinnerMain from '../../viewsItems/SpinnerMain';
import TablePlaneacionLlegadas from '../../viewsItems/tables/TablePlaneacionLlegadas';
import { formattedCantidad, totales } from '../../utileria/utils';

export default function PlaneacionLlegadas() {
    const { idDestino } = useParams();
    const { destinosListXllegar } = useContext(globalData);
    const [guiasXllegar, setGuiasXllegar] = useState(null);
    //const [destinosConfigurados, setDestinosConfigurados] = useState(null);
    const [nameDestino, setNameDestino] = useState(null);

    function getNameDestino(idDestino) {
        let nombreDestino;
        destinosListXllegar?.forEach((destino) => {
            if (destino.id === Number(idDestino)) {
                nombreDestino = destino.nombre;
            }
        })
        return nombreDestino;
    }

    const peticiones = async (id) => {
        const urlApiNextpack = urlapi + '/trafico/get_planGrafo/' + id;
        await fetch(urlApiNextpack)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data.catalogoGuiasPlaneadas !== null) {
                    setGuiasXllegar(data.catalogoGuiasPlaneadas);
                    setNameDestino(getNameDestino(id));
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
            //Crear array sin guias repetidas
            const guiasSinRepetir = Array.from(new Set(guiasXllegar.map(guia => guia.numGuia))).map(numGuia => {
                return guiasXllegar.find(guia => guia.numGuia === numGuia);
            });

            const destinosSinRepetir = new Set();
            const dataDestinos = [];
            //Separar las guias por el origen que vienen
            guiasSinRepetir?.forEach((guia) => {
                const idDestino = guia.viaje_ubicacion_id;
                //Verificamos si el destino ya esta en el set de destinos
                if (!destinosSinRepetir.has(idDestino)) {
                    destinosSinRepetir.add(idDestino);
                    dataDestinos.push({
                        id: idDestino,
                        nombre: guia.ubicacionDestino,
                        guias: guiasSinRepetir.filter(guia => (guia.viaje_ubicacion_id === idDestino))
                    });
                }
            });
            return (
                <>
                    <div className="col-12 col-md-12  p-1">
                        <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                            <h2>Planeación de Llegadas {nameDestino}</h2>
                            {/* <div>
                                <ContainerTotales sumas={sumas} />
                            </div> */}
                            <Accordion key={100} className='mb-4'>
                                <Accordion.Item eventKey={100}>
                                    <Accordion.Header>
                                        <HeaderLLegadas
                                            nombre={"Total en general"}
                                            guias={guiasSinRepetir}
                                        />
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <TablePlaneacionLlegadas
                                            guias={guiasSinRepetir}
                                            nombreDestino={"todosLosDestinos"}
                                            volumenTotal={totales(guiasSinRepetir, "volumen")}
                                            pesoTotal={formattedCantidad(totales(guiasSinRepetir, "peso"))}
                                            fleteTotal={totales(guiasSinRepetir, "flete")}
                                            montoSeguroTotal={totales(guiasSinRepetir, "monto_seguro")}
                                            subtotalTotal={totales(guiasSinRepetir, "subtotal")}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <h3>Detalle por Origen</h3>
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
                <div className='col'>Total Guías: {props.guias.length}</div>
                <div className='col'>Peso: {formattedCantidad(totales(props.guias, "peso"))} kg</div>
                <div className='col'>Volumen: {totales(props.guias, "volumen")} mt3</div>
                <div className='col'>Flete: ${formattedCantidad(totales(props.guias, "flete"))}</div>
                <div className='col'>Monto Seg: ${formattedCantidad(totales(props.guias, "monto_seguro"))}</div>
                <div className='col'>Subtotal: ${formattedCantidad(totales(props.guias, "subtotal"))}</div>
            </div>
        </div>
    )
}
