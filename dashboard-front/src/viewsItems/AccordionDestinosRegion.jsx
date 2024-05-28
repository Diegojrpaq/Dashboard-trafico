import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Skeleton } from 'primereact/skeleton';
import { formattedCantidad } from '../utileria/utils';
import { urlapi } from '../utileria/config';
import SubAccordionRegion from './SubAccordionRegion';
export default function AccordionDestinosRegion({ idDestino, nombreDestino }) {
    const [destinosList, setDestinosList] = useState([]);
    const [primerPeticion, setPrimerPeticion] = useState(false);
    const peticionDataDestinos = async (id) => {
        const urlApiGetPlanXdestino = urlapi + "/trafico/get_planxDestino/" + id;
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

    useEffect(() => {
        peticionDataDestinos(idDestino);
    }, [idDestino])

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
                                <SubAccordionRegion
                                    keyId={i}
                                    idsRutas={region.listIdRutas}
                                    nombre={region?.nombre}
                                    volumen={region.total.volumen}
                                    peso={region.total.peso}
                                    flete={region.total.flete}
                                    montoSeguro={region.total.montoSeguro}
                                    subtotal={region.total.subtotal}
                                    cantidadGuias={region.total.cantidadGuias}
                                    cantidadCajas={region.total.cantidadCajas}
                                    guiasTransbordo={region.totalTransbordo.cantidadGuias}
                                    guiasSucursal={region.totalInHouse.cantidadGuias}
                                    totalInHouse={region.totalInHouse}
                                    totalTransbordo={region.totalTransbordo}
                                />
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

export function Header({ nombre, volumen, peso, flete, seguro, subtotal, guias, items, guiasTransbordo, guiasSucursal, paddingSize, backgroundBadge }) {
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