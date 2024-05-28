import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Header } from './AccordionDestinosRegion'
import TablePorRegion from './tables/TablePorRegion'
import { urlapi } from '../utileria/config';
import TableTotalPorDestino from './tables/TableTotalPorDestino';
import TableSkeleton from './tables/TableSkeleton';
import TableAccordionDestinos from './tables/TableAccordionDestinos';
export default function SubAccordionRegion({
    keyId,
    idsRutas,
    nombre,
    volumen,
    peso,
    flete,
    montoSeguro,
    subtotal,
    cantidadGuias,
    cantidadCajas,
    guiasTransbordo,
    guiasSucursal,
    totalInHouse,
    totalTransbordo
}) {

    const [guiasXruta, setGuiasXruta] = useState([]);
    const [peticionRutaState, setPeticionRutaState] = useState(false);
    const [clicAccordion, setClicAccordion] = useState(false);
    const fechaActual = new Date().toLocaleDateString();
    const peticionListRuta = async (idsRutas) => {
        const urlApiGetPlanRutaAcumulado = urlapi + "/trafico/get_planRutaAcumulado/" + idsRutas;
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

    function onClicAccordion(idRuta) {
        const strLimpio = limpiarString(idRuta, "0");
        if (!clicAccordion) {
            setPeticionRutaState(false);
            setGuiasXruta([]);
            peticionListRuta(strLimpio);
        }
        setClicAccordion(!clicAccordion);
    }

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
        <Accordion key={keyId}>
            <Accordion.Item eventKey={keyId}>
                <Accordion.Header onClick={() => onClicAccordion(idsRutas)}>
                    <Header
                        nombre={nombre}
                        volumen={volumen}
                        peso={peso}
                        flete={flete}
                        seguro={montoSeguro}
                        subtotal={subtotal}
                        guias={cantidadGuias}
                        items={cantidadCajas}
                        guiasTransbordo={guiasTransbordo}
                        guiasSucursal={guiasSucursal}
                        paddingSize={1}
                        backgroundBadge={"#838c96"}
                    />
                </Accordion.Header>
                <Accordion.Body>
                    <TablePorRegion
                        enSucursal={totalInHouse}
                        transbordo={totalTransbordo}
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
                                        nombreRuta: nombre,
                                        fecha: fechaActual
                                    }}
                                />
                                :
                                <TableSkeleton cols={cols} />
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
