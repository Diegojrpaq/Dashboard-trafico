import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Skeleton } from 'primereact/skeleton';
import { formattedCantidad } from '../utileria/utils';
import { urlapi } from '../utileria/config';
import TableAccordionDestinos from './tables/TableAccordionDestinos';
import TableSkeleton from './tables/TableSkeleton';
import TablePorRegion from './tables/TablePorRegion';
import TableTotalPorDestino from './tables/TableTotalPorDestino';
export default function AccordionDestinosRegion({ idDestino, nombreDestino }) {
    const [destinosList, setDestinosList] = useState([]);
    const [guiasXruta, setGuiasXruta] = useState([]);
    const [clicAccordion, setClicAccordion] = useState(false);
    const [peticionRutaState, setPeticionRutaState] = useState(false);
    const [primerPeticion, setPrimerPeticion] = useState(false);
    const peticionDataDestinos = async (id) => {
        const urlApiGetPlanXdestino = urlapi + "/trafico/get_planxDestino/" + id;
        //const urlApiNextpackSidebar = "http://192.168.10.113/trafico/get_planxDestino/" + id;
        await fetch(urlApiGetPlanXdestino)
            .then((resp) => {
                setPrimerPeticion(true)
                return resp.json();
            }).then((data) => {
                if (data) {
                    setDestinosList(data?.rutaAcumulada);
                    return data
                }
            }).catch(
                () => console.log('Error los datos del destino: ' + id)
            )
    }

    const peticionListRuta = async (idsRutas) => {
        const urlApiGetPlanRutaAcumulado = urlapi + "/trafico/get_planRutaAcumulado/" + idsRutas;
        //const urlApiNextpackSidebar = "http://192.168.10.113/trafico/get_planRutaAcumulado/" + idsRutas;
        await fetch(urlApiGetPlanRutaAcumulado)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data?.rutas?.catalogoGuiasPlaneadas !== undefined) {
                    setGuiasXruta(data?.rutas?.catalogoGuiasPlaneadas);
                    return data
                } else {
                    setPeticionRutaState(true);
                }
            }).catch(
                () => {
                    setPeticionRutaState(true);
                    console.log('Error los datos de la ruta: ' + idsRutas)
                }
            )
    }
    useEffect(() => {
        peticionDataDestinos(idDestino);
    }, [idDestino])

    function onClicAccordion(idRuta) {
        const strLimpio = limpiarString(idRuta, "0");
        if (!clicAccordion) {
            setPeticionRutaState(false);
            setGuiasXruta([]);
            peticionListRuta(strLimpio);
        }
        setClicAccordion(!clicAccordion);
    }
    function limpiarString(str, charDelete) {
        if (typeof str === 'string') {
            let partesStr = str?.split(',');
            if (partesStr[partesStr.length - 1] === charDelete) {
                partesStr.pop();
            }

            let cadenaLimpia = partesStr.join(',');
            return cadenaLimpia;
        } else {
            return str;
        }
    }
    function sumarPropiedad(array, propiedad, propiedad2) {
        return array?.reduce((suma, elemento) => {
            return suma + elemento[propiedad][propiedad2]
        }, 0);
    }

    if (destinosList !== null && primerPeticion) {
        let sumaVolumen;
        let sumaPeso;
        let sumaFlete;
        let sumaMontoSeg;
        let sumaSubtotal;
        let sumaGuias;
        let sumaItems;
        let sumaGuiasTransbordo;
        let sumaGuiasSucursal;
        if (destinosList?.length === 0) {
            return <></>
        }
        const regiones = destinosList;
        sumaVolumen = Number(sumarPropiedad(regiones, 'total', 'volumen')?.toFixed(2));
        sumaPeso = sumarPropiedad(regiones, 'total', 'peso')?.toFixed(2);
        sumaFlete = sumarPropiedad(regiones, 'total', 'flete');
        sumaMontoSeg = sumarPropiedad(regiones, 'total', 'montoSeguro');
        sumaSubtotal = sumarPropiedad(regiones, 'total', 'subtotal');
        sumaGuias = sumarPropiedad(regiones, 'total', 'cantidadGuias');
        sumaItems = sumarPropiedad(regiones, 'total', 'cantidadCajas');
        sumaGuiasTransbordo = sumarPropiedad(regiones, 'totalTransbordo', 'cantidadGuias');
        sumaGuiasSucursal = sumarPropiedad(regiones, 'totalInHouse', 'cantidadGuias');
        const fechaActual = new Date().toLocaleDateString();
        //Columnas de la tabla
        const cols = [
            { field: "numGuia", header: "Numero Guía" },
            { field: 'sucursal_principal', header: 'Suc. origen' },
            { field: 'sucursal_destino', header: 'Suc. destino' },
            { field: 'volumen', header: 'Volumen' },
            { field: 'peso', header: 'Peso' },
            { field: 'flete', header: 'Flete' },
            { field: 'monto_seguro', header: 'Monto seguro' },
            { field: 'subtotal', header: 'Subtotal' },
            { field: 'cantidad_caja', header: 'Items' }
        ];

        return (
            <Accordion key={idDestino} style={{ margin: "7px 0" }}>
                <Accordion.Item eventKey={idDestino}>
                    <Accordion.Header>
                        <Header
                            nombre={nombreDestino}
                            volumen={sumaVolumen}
                            peso={sumaPeso}
                            flete={sumaFlete}
                            seguro={sumaMontoSeg}
                            subtotal={sumaSubtotal}
                            guias={sumaGuias}
                            items={sumaItems}
                            guiasTransbordo={sumaGuiasTransbordo}
                            guiasSucursal={sumaGuiasSucursal}
                            backgroundBadge={"#314051"}
                        />
                    </Accordion.Header>
                    <Accordion.Body>
                        {
                            destinosList?.map((region, i) => (
                                <Accordion key={i}>
                                    <Accordion.Item eventKey={i}>
                                        <Accordion.Header onClick={() => onClicAccordion(region.listIdRutas)}>
                                            <Header
                                                nombre={region?.nombre}
                                                volumen={region.total.volumen}
                                                peso={region.total.peso}
                                                flete={region.total.flete}
                                                seguro={region.total.montoSeguro}
                                                subtotal={region.total.subtotal}
                                                guias={region.total.cantidadGuias}
                                                items={region.total.cantidadCajas}
                                                guiasTransbordo={region.totalTransbordo.cantidadGuias}
                                                guiasSucursal={region.totalInHouse.cantidadGuias}
                                                paddingSize={1}
                                                backgroundBadge={"#838c96"}
                                            />
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <TablePorRegion
                                                enSucursal={region.totalInHouse}
                                                transbordo={region.totalTransbordo}
                                            />

                                            {
                                                peticionRutaState ?
                                                    <h3 className='m-2'>No hay datos</h3>
                                                    :
                                                    guiasXruta?.length > 0 ?
                                                        <TableTotalPorDestino guias={guiasXruta} />
                                                        :
                                                        <div className='mb-3'>
                                                            <TableSkeleton cols={cols} />
                                                        </div>
                                            }

                                            {
                                                peticionRutaState ?
                                                    <h3 className='m-2'>No hay datos</h3>
                                                    :
                                                    guiasXruta?.length > 0 ?
                                                        <TableAccordionDestinos
                                                            guias={guiasXruta}
                                                            infoRuta={{
                                                                nombreRuta: region.nombre,
                                                                fecha: fechaActual
                                                            }}
                                                        />
                                                        :
                                                        <TableSkeleton cols={cols} />
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    } else {
        return (
            <div className='d-flex column m-2 justify-content-center'>
                <div className="w-100" style={{
                    border: "1px solid #bec3bc",
                    borderRadius: "8px",
                    height: "120px",
                    padding: "20px"
                }}>
                    <div>
                        <Skeleton width="7rem" height='28px'></Skeleton>
                    </div>
                    <div className='d-flex justify-content-around mt-3'>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                        <Skeleton width="5rem" height='25px'></Skeleton>
                    </div>
                </div>
            </div>
        )
    }

}

function Header({ nombre, volumen, peso, flete, seguro, subtotal, guias, items, guiasTransbordo, guiasSucursal, paddingSize, backgroundBadge }) {
    const padd = paddingSize ? paddingSize : '2';
    return (
        <div className={`container p-${padd}`}>
            <div className='col badge mb-2' style={{
                fontWeight: "normal",
                fontSize: "1.2rem",
                backgroundColor: backgroundBadge,
                padding: "7px",
                borderRadius: "8px",
                color: "white"
            }}>{nombre}</div>
            <div className='row'>

                <div className='col'>Peso: {formattedCantidad(peso)}Kg</div>
                <div className='col'>Volumen: {formattedCantidad(volumen)}</div>
                <div className='col'>Flete: ${formattedCantidad(flete)}</div>
                <div className='col'>Seguro: ${formattedCantidad(seguro)}</div>
                <div className='col'>Subtotal: ${formattedCantidad(subtotal)}</div>
                <div className='col'>Items: {items}</div>
                <div className='col'>Guias: {guias}</div>
                <div className='col'>Guias Transbordo: {guiasTransbordo}</div>
                <div className='col'>Guias Sucursal: {guiasSucursal}</div>
            </div>
        </div>
    )
}