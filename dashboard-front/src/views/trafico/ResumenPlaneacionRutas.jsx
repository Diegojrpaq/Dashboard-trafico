import React, { useContext } from 'react';
import { globalData } from '../../App';
import AccordionDestinosRegion from '../../viewsItems/AccordionDestinosRegion';

export default function ResumenPlaneacionRutas() {
    const { destinosPlanRuta } = useContext(globalData);

    //Obtener los destinos que su sucural tiene al menos una ruta configurada
    const destinosConRutasConfiguradas = destinosPlanRuta.filter(destino => {
        return destino.sucursales.some(sucursal => sucursal.rutas_configuradas !== null);
    });
    //Crea objeto con el destino y sus rutas configuradas
    const destinosRutas = destinosConRutasConfiguradas.map(destino => {
        const rutas = destino.sucursales
            .filter(sucursal => sucursal.rutas_configuradas !== null)
            .flatMap(sucursal => sucursal.rutas_configuradas);

        return {
            id: destino.id,
            nombre: destino.nombre,
            rutas: rutas
        }
    })

    return (
        <>
            {
                destinosRutas.map((destino, i) => {
                    return (
                        <AccordionDestinosRegion key={i} idDestino={destino.id} nombreDestino={destino.nombre} />
                    )
                })
            }
        </>
    );
}