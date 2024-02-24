import React from 'react';
import { useParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import TablePlaneacionLlegadas from '../../viewsItems/tables/TablePlaneacionLlegadas';

export default function PlaneacionLlegadas() {
    const { idDestino } = useParams();
    const catalogoGuiasEjemplo = [
        {
            "numGuia": "MEX-127443",
            "sucursal_principal_id": 6,
            "sucursal_principal": "Vallejo",
            "fecha_registro": "20240221",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 40,
            "sucursal_destino": "Tepic",
            "origen_id": 2,
            "origen": "MEXICO",
            "destino_id": 24,
            "destino_final": "MEXICO",
            "volumen": 0.152,
            "peso": 22.2,
            "flete": 454.05,
            "monto_seguro": 195.84,
            "subtotal": 748.23,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 1,
            "idCliente": 272151,
            "clienteOrigen": "CASA VEERKAMP"
        },
        {
            "numGuia": "MTH-39153",
            "sucursal_principal_id": 10,
            "sucursal_principal": "Tabla Honda",
            "fecha_registro": "20240222",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 46,
            "sucursal_destino": "Bucerias",
            "origen_id": 2,
            "origen": "MEXICO",
            "destino_id": 29,
            "destino_final": "MEXICO",
            "volumen": 1.254,
            "peso": 485,
            "flete": 2850.61,
            "monto_seguro": 30,
            "subtotal": 3059.14,
            "empaque_id": 2,
            "Empaque": "TARIMAS ",
            "cantidad_caja": 1,
            "idCliente": 270776,
            "clienteOrigen": "IATICA"
        },
        {
            "numGuia": "REV-21315",
            "sucursal_principal_id": 7,
            "sucursal_principal": "Revolucion",
            "fecha_registro": "20240222",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 38,
            "sucursal_destino": "Puerto Vallarta",
            "origen_id": 2,
            "origen": "MEXICO",
            "destino_id": 20,
            "destino_final": "MEXICO",
            "volumen": 0.142,
            "peso": 28,
            "flete": 460.94,
            "monto_seguro": 30,
            "subtotal": 589.7,
            "empaque_id": 23,
            "Empaque": "PAQUETE",
            "cantidad_caja": 2,
            "idCliente": 98123,
            "clienteOrigen": "DAVID ULISES AMADOR JUAREZ"
        },
        {
            "numGuia": "MEX-127563",
            "sucursal_principal_id": 6,
            "sucursal_principal": "Vallejo",
            "fecha_registro": "20240222",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 40,
            "sucursal_destino": "Tepic",
            "origen_id": 2,
            "origen": "MEXICO",
            "destino_id": 24,
            "destino_final": "MEXICO",
            "volumen": 3.243,
            "peso": 465,
            "flete": 5270.46,
            "monto_seguro": 30,
            "subtotal": 5624.19,
            "empaque_id": 2,
            "Empaque": "TARIMAS ",
            "cantidad_caja": 1,
            "idCliente": 205,
            "clienteOrigen": "PROVEEDORA DE CLIMAS "
        },
        {
            "numGuia": "GUA-427394",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240223",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 40,
            "sucursal_destino": "Tepic",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 24,
            "destino_final": "GUADALAJARA",
            "volumen": 0.165,
            "peso": 101,
            "flete": 530.83,
            "monto_seguro": 30,
            "subtotal": 600.18,
            "empaque_id": 9,
            "Empaque": "BULTOS",
            "cantidad_caja": 4,
            "idCliente": 92625,
            "clienteOrigen": "PICEX CHEMICALS"
        },
        {
            "numGuia": "GUA-427397",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240223",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 38,
            "sucursal_destino": "Puerto Vallarta",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 20,
            "destino_final": "GUADALAJARA",
            "volumen": 0.075,
            "peso": 41.5,
            "flete": 313.11,
            "monto_seguro": 30,
            "subtotal": 369.4,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 1,
            "idCliente": 129580,
            "clienteOrigen": "GUILLERMO GONZALEZ GONZALEZ"
        },
        {
            "numGuia": "LAC-82920",
            "sucursal_principal_id": 2,
            "sucursal_principal": "Lazaro Cardenas",
            "fecha_registro": "20240223",
            "sucursal_ubicacion_id": 2,
            "sucursal_ubicacion": "Lazaro Cardenas",
            "sucursal_destino_id": 38,
            "sucursal_destino": "Puerto Vallarta",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 20,
            "destino_final": "GUADALAJARA",
            "volumen": 10.22,
            "peso": 220,
            "flete": 9536.79,
            "monto_seguro": 30,
            "subtotal": 11662.85,
            "empaque_id": 23,
            "Empaque": "PAQUETE",
            "cantidad_caja": 10,
            "idCliente": 283434,
            "clienteOrigen": "ALBERTO SILVA CASTELLANOS "
        },
        {
            "numGuia": "LAC-82913",
            "sucursal_principal_id": 2,
            "sucursal_principal": "Lazaro Cardenas",
            "fecha_registro": "20240223",
            "sucursal_ubicacion_id": 2,
            "sucursal_ubicacion": "Lazaro Cardenas",
            "sucursal_destino_id": 38,
            "sucursal_destino": "Puerto Vallarta",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 20,
            "destino_final": "GUADALAJARA",
            "volumen": 2.23,
            "peso": 169,
            "flete": 2080.92,
            "monto_seguro": 30,
            "subtotal": 2243.28,
            "empaque_id": 2,
            "Empaque": "TARIMAS ",
            "cantidad_caja": 7,
            "idCliente": 205,
            "clienteOrigen": "PROVEEDORA DE CLIMAS "
        },
        {
            "numGuia": "LAC-82919",
            "sucursal_principal_id": 2,
            "sucursal_principal": "Lazaro Cardenas",
            "fecha_registro": "20240223",
            "sucursal_ubicacion_id": 2,
            "sucursal_ubicacion": "Lazaro Cardenas",
            "sucursal_destino_id": 40,
            "sucursal_destino": "Tepic",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 24,
            "destino_final": "GUADALAJARA",
            "volumen": 1.189,
            "peso": 184,
            "flete": 914.4,
            "monto_seguro": 30,
            "subtotal": 1152.15,
            "empaque_id": 2,
            "Empaque": "TARIMAS ",
            "cantidad_caja": 1,
            "idCliente": 132345,
            "clienteOrigen": "FILTROS DE OCCIDENTE"
        },
        {
            "numGuia": "PER-89027",
            "sucursal_principal_id": 5,
            "sucursal_principal": "Perisur",
            "fecha_registro": "20240223",
            "sucursal_ubicacion_id": 5,
            "sucursal_ubicacion": "Perisur",
            "sucursal_destino_id": 46,
            "sucursal_destino": "Bucerias",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 29,
            "destino_final": "GUADALAJARA",
            "volumen": 0.213,
            "peso": 60,
            "flete": 360.1,
            "monto_seguro": 30,
            "subtotal": 419.21,
            "empaque_id": 9,
            "Empaque": "BULTOS",
            "cantidad_caja": 2,
            "idCliente": 284345,
            "clienteOrigen": "ARIANA HUERTA"
        }
    ];

    const sucursalesSinRepetir = new Set();

    const sucursalesId = [];

    catalogoGuiasEjemplo.forEach((guia) => {
        const valor = guia.sucursal_ubicacion_id;

        if (!sucursalesSinRepetir.has(valor)) {
            sucursalesSinRepetir.add(valor);
            sucursalesId.push({ 
                id: valor,
                nombre: guia.sucursal_ubicacion,
                guias: catalogoGuiasEjemplo.filter(guia => guia.sucursal_ubicacion_id === valor)
            });
        }
    });

    console.log(sucursalesId, "SinRep")

    if (sucursalesId !== null) {
        //sucursalesId
        return (
            <>
                <div className="col-12 col-md-12  p-1">
                    <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                        {
                        
                            sucursalesId.map((sucursal, i) => (
                                <Accordion key={i}>
                                    <Accordion.Item eventKey={i}>
                                        <Accordion.Header>
                                           <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", }}>
                                            <div style={{marginRight: "12px", fontWeight: "bold", fontSize: "1.1rem"}}>{sucursal.nombre}</div>
                                            <div>Guias totales: {sucursal.guias.length}</div>
                                           </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <TablePlaneacionLlegadas  guias={sucursal.guias} />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))
                        }
                    </div>
                </div>
            </>
        )
    }
}
