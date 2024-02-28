import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { urlapi } from '../../utileria/config';
import SpinnerMain from '../../viewsItems/SpinnerMain';
import TablePlaneacionLlegadas from '../../viewsItems/tables/TablePlaneacionLlegadas';
import { formattedCantidad, totales } from '../../utileria/utils';
import ContainerTotales from '../../viewsItems/Cards/CardsTotalesPlaneacionLlegadas/ContainerTotales';

export default function PlaneacionLlegadas() {
    const { idDestino } = useParams();
    const [guiasXllegar, setGuiasXllegar] = useState(null);

    const catalogoGuiasEjemplo2 = [
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

    const catalogoGuiasEjemplo = [
        {
            "numGuia": "GUA-423580",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240201",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.045994,
            "peso": 31,
            "flete": 306.87,
            "monto_seguro": 30,
            "subtotal": 439.1,
            "empaque_id": 19,
            "Empaque": "CONTENEDOR",
            "cantidad_caja": 1,
            "idCliente": 20920,
            "clienteOrigen": "FRUTI MEXI CO"
        },
        {
            "numGuia": "GUA-425217",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240212",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 5.782,
            "peso": 252,
            "flete": 5340.31,
            "monto_seguro": 30,
            "subtotal": 6830.37,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 42,
            "idCliente": 121945,
            "clienteOrigen": "OVALCOM"
        },
        {
            "numGuia": "GUA-427605",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240224",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.16,
            "peso": 36.05,
            "flete": 412.28,
            "monto_seguro": 30,
            "subtotal": 2239.52,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 6,
            "idCliente": 280592,
            "clienteOrigen": "GRUPO COME VERDE"
        },
        {
            "numGuia": "GUA-427670",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240224",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.25,
            "peso": 49.2,
            "flete": 324.82,
            "monto_seguro": 33.6,
            "subtotal": 385.41,
            "empaque_id": 20,
            "Empaque": "PIEZAS",
            "cantidad_caja": 3,
            "idCliente": 246529,
            "clienteOrigen": "GRUPO COMERCIAL CLICKEROS "
        },
        {
            "numGuia": "GUA-427672",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240224",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.902,
            "peso": 131.2,
            "flete": 686.08,
            "monto_seguro": 77.31,
            "subtotal": 812.05,
            "empaque_id": 20,
            "Empaque": "PIEZAS",
            "cantidad_caja": 6,
            "idCliente": 246529,
            "clienteOrigen": "GRUPO COMERCIAL CLICKEROS "
        },
        {
            "numGuia": "GUA-427759",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.074,
            "peso": 277.5,
            "flete": 1049.69,
            "monto_seguro": 59.76,
            "subtotal": 1179.93,
            "empaque_id": 22,
            "Empaque": "ATADO",
            "cantidad_caja": 15,
            "idCliente": 908,
            "clienteOrigen": "FORJA METAL"
        },
        {
            "numGuia": "GUA-427766",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.03,
            "peso": 23.2,
            "flete": 306.87,
            "monto_seguro": 30,
            "subtotal": 439.1,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 1,
            "idCliente": 4833,
            "clienteOrigen": "INDUSTRIAS DUEÑAS"
        },
        {
            "numGuia": "GUA-427707",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 2.8177,
            "peso": 823,
            "flete": 1592,
            "monto_seguro": 0,
            "subtotal": 1695.02,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 42,
            "idCliente": 121367,
            "clienteOrigen": "ESPECIALIZACION TEXTIL"
        },
        {
            "numGuia": "GUA-427711",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.621,
            "peso": 105.2,
            "flete": 674.78,
            "monto_seguro": 30,
            "subtotal": 895.82,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 6,
            "idCliente": 121945,
            "clienteOrigen": "OVALCOM"
        },
        {
            "numGuia": "GUA-427728",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.786,
            "peso": 114.8,
            "flete": 640.55,
            "monto_seguro": 0,
            "subtotal": 877.3,
            "empaque_id": 22,
            "Empaque": "ATADO",
            "cantidad_caja": 10,
            "idCliente": 130,
            "clienteOrigen": "AUTOPARTES TRACTO DE MEXICO "
        },
        {
            "numGuia": "GUA-427757",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.512,
            "peso": 168.4,
            "flete": 573.3,
            "monto_seguro": 30,
            "subtotal": 645.2,
            "empaque_id": 20,
            "Empaque": "PIEZAS",
            "cantidad_caja": 7,
            "idCliente": 2681,
            "clienteOrigen": "MANUEL ESPINOSA ZARATE"
        },
        {
            "numGuia": "GUA-427735",
            "sucursal_principal_id": 1,
            "sucursal_principal": "Gonzalez Gallo",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 1,
            "sucursal_ubicacion": "Gonzalez Gallo",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.76,
            "peso": 133.8,
            "flete": 743.23,
            "monto_seguro": 30,
            "subtotal": 825.32,
            "empaque_id": 5,
            "Empaque": "HUACAL",
            "cantidad_caja": 2,
            "idCliente": 143877,
            "clienteOrigen": "SOLUCIONES NEUMATICAS CBS"
        },
        {
            "numGuia": "LAC-82900",
            "sucursal_principal_id": 2,
            "sucursal_principal": "Lazaro Cardenas",
            "fecha_registro": "20240222",
            "sucursal_ubicacion_id": 2,
            "sucursal_ubicacion": "Lazaro Cardenas",
            "sucursal_destino_id": 61,
            "sucursal_destino": "Cuernavaca",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 39,
            "destino_final": "GUADALAJARA",
            "volumen": 1.791,
            "peso": 482.5,
            "flete": 1654.16,
            "monto_seguro": 30,
            "subtotal": 2141.59,
            "empaque_id": 2,
            "Empaque": "TARIMAS ",
            "cantidad_caja": 4,
            "idCliente": 3146,
            "clienteOrigen": "PRO SIL"
        },
        {
            "numGuia": "LAC-82986",
            "sucursal_principal_id": 2,
            "sucursal_principal": "Lazaro Cardenas",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 2,
            "sucursal_ubicacion": "Lazaro Cardenas",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.097,
            "peso": 26,
            "flete": 317.61,
            "monto_seguro": 30,
            "subtotal": 374.17,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 2,
            "idCliente": 853,
            "clienteOrigen": "WINTEK"
        },
        {
            "numGuia": "ZAP-51858",
            "sucursal_principal_id": 4,
            "sucursal_principal": "Zapopan",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 4,
            "sucursal_ubicacion": "Zapopan",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.021,
            "peso": 4,
            "flete": 352.9,
            "monto_seguro": 30,
            "subtotal": 496.37,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 2,
            "idCliente": 329,
            "clienteOrigen": "SISTEMAS INTEGRALES DE ALTURA"
        },
        {
            "numGuia": "PER-89073",
            "sucursal_principal_id": 5,
            "sucursal_principal": "Perisur",
            "fecha_registro": "20240224",
            "sucursal_ubicacion_id": 5,
            "sucursal_ubicacion": "Perisur",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.12,
            "peso": 79,
            "flete": 471.75,
            "monto_seguro": 30,
            "subtotal": 537.56,
            "empaque_id": 6,
            "Empaque": "ROLLOS",
            "cantidad_caja": 2,
            "idCliente": 93887,
            "clienteOrigen": "COMERCIALIZADORA DE BRINCOLINES INFLABLES MEXICO"
        },
        {
            "numGuia": "PER-89065",
            "sucursal_principal_id": 5,
            "sucursal_principal": "Perisur",
            "fecha_registro": "20240224",
            "sucursal_ubicacion_id": 5,
            "sucursal_ubicacion": "Perisur",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.067,
            "peso": 34,
            "flete": 306.87,
            "monto_seguro": 30,
            "subtotal": 362.78,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 1,
            "idCliente": 196,
            "clienteOrigen": "HERRAMIENTAS Y EQUIPOS PARA LLANTERAS"
        },
        {
            "numGuia": "PER-89098",
            "sucursal_principal_id": 5,
            "sucursal_principal": "Perisur",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 5,
            "sucursal_ubicacion": "Perisur",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.065,
            "peso": 100,
            "flete": 410.22,
            "monto_seguro": 30,
            "subtotal": 548.65,
            "empaque_id": 21,
            "Empaque": "LARGUERO",
            "cantidad_caja": 1,
            "idCliente": 6525,
            "clienteOrigen": "DISTRIBUIDORA ORLI"
        },
        {
            "numGuia": "GJA-34292",
            "sucursal_principal_id": 9,
            "sucursal_principal": "Cd Granja",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 9,
            "sucursal_ubicacion": "Cd Granja",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 3.69,
            "peso": 933.6,
            "flete": 3207.64,
            "monto_seguro": 30,
            "subtotal": 4117.62,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 65,
            "idCliente": 22364,
            "clienteOrigen": "PMF ACABADOS METALICOS"
        },
        {
            "numGuia": "GJA-34290",
            "sucursal_principal_id": 9,
            "sucursal_principal": "Cd Granja",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 9,
            "sucursal_ubicacion": "Cd Granja",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.975,
            "peso": 16.8,
            "flete": 1059.44,
            "monto_seguro": 30,
            "subtotal": 1385.1,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 2,
            "idCliente": 248085,
            "clienteOrigen": "MOBILIARIA PURPURA "
        },
        {
            "numGuia": "GJA-34291",
            "sucursal_principal_id": 9,
            "sucursal_principal": "Cd Granja",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 9,
            "sucursal_ubicacion": "Cd Granja",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 3.529,
            "peso": 110.5,
            "flete": 3834.61,
            "monto_seguro": 30,
            "subtotal": 4915.12,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 3,
            "idCliente": 248085,
            "clienteOrigen": "MOBILIARIA PURPURA "
        },
        {
            "numGuia": "GCR-14833",
            "sucursal_principal_id": 56,
            "sucursal_principal": "Cruz Del Sur",
            "fecha_registro": "20240224",
            "sucursal_ubicacion_id": 56,
            "sucursal_ubicacion": "Cruz Del Sur",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.267,
            "peso": 30,
            "flete": 453.29,
            "monto_seguro": 30,
            "subtotal": 676.99,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 3,
            "idCliente": 3146,
            "clienteOrigen": "PRO SIL"
        },
        {
            "numGuia": "GCR-14835",
            "sucursal_principal_id": 56,
            "sucursal_principal": "Cruz Del Sur",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 56,
            "sucursal_ubicacion": "Cruz Del Sur",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.087,
            "peso": 110,
            "flete": 868.98,
            "monto_seguro": 30,
            "subtotal": 958.62,
            "empaque_id": 20,
            "Empaque": "PIEZAS",
            "cantidad_caja": 10,
            "idCliente": 123061,
            "clienteOrigen": "DELIA LORENA GARCIA SALINAS"
        },
        {
            "numGuia": "PSL-3515",
            "sucursal_principal_id": 68,
            "sucursal_principal": "Plan de San Luis",
            "fecha_registro": "20240224",
            "sucursal_ubicacion_id": 68,
            "sucursal_ubicacion": "Plan de San Luis",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.523,
            "peso": 90,
            "flete": 454.63,
            "monto_seguro": 30,
            "subtotal": 519.41,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 15,
            "idCliente": 264703,
            "clienteOrigen": "CRUNCHYMEX"
        },
        {
            "numGuia": "PSL-3518",
            "sucursal_principal_id": 68,
            "sucursal_principal": "Plan de San Luis",
            "fecha_registro": "20240226",
            "sucursal_ubicacion_id": 68,
            "sucursal_ubicacion": "Plan de San Luis",
            "sucursal_destino_id": 6,
            "sucursal_destino": "Vallejo",
            "origen_id": 1,
            "origen": "GUADALAJARA",
            "destino_id": 2,
            "destino_final": "GUADALAJARA",
            "volumen": 0.099,
            "peso": 7.4,
            "flete": 306.87,
            "monto_seguro": 30,
            "subtotal": 439.1,
            "empaque_id": 1,
            "Empaque": "CAJAS",
            "cantidad_caja": 1,
            "idCliente": 10686,
            "clienteOrigen": "TALABARTERIA HIPODROMO"
        }
    ];

    const peticiones = async (id) => {
        const urlApiNextpack = urlapi + '/trafico/get_viajeActivo/' + id;
        await fetch(urlApiNextpack)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data) {
                    setGuiasXllegar(data);
                }
            }).catch(
                () => console.log('Error al cargar los destinos')
            )
    }

    useEffect(() => {
        peticiones(idDestino);
        return () => {
            setGuiasXllegar(null);
        }
    }, [idDestino])

    const volumenTotal = totales(catalogoGuiasEjemplo, "volumen");
    const pesoTotal = formattedCantidad(totales(catalogoGuiasEjemplo, "peso"));
    const fleteTotal = totales(catalogoGuiasEjemplo, "flete");
    const montoSeguroTotal = totales(catalogoGuiasEjemplo, "monto_seguro");
    const subtotalTotal = totales(catalogoGuiasEjemplo, "subtotal");

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
    ]

    //console.log(guiasXllegar, "Por llegar")
    const destinosSinRepetir = new Set();
    const dataDestinos = [];

    catalogoGuiasEjemplo.forEach((guia) => {
        const idDestino = guia.sucursal_ubicacion_id;
        //Verificamos si el destino ya esta en el set de destinos
        if (!destinosSinRepetir.has(idDestino)) {
            destinosSinRepetir.add(idDestino);
            dataDestinos.push({
                id: idDestino,
                nombre: guia.sucursal_ubicacion,
                guias: catalogoGuiasEjemplo.filter(guia => guia.sucursal_ubicacion_id === idDestino)
            });
        }
    });

    //console.log(dataDestinos, "SinRep")


    if (guiasXllegar !== null) {
        return (
            <>
                <div className="col-12 col-md-12  p-1">
                    <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                        <h2>Planeación de Llegadas</h2>
                        <div>
                            <ContainerTotales sumas={sumas} />
                        </div>
                        <Accordion key={100} className='mb-4'>
                            <Accordion.Item eventKey={100}>
                                <Accordion.Header>
                                    <HeaderLLegadas
                                        nombre={"Total en general"}
                                        guias={catalogoGuiasEjemplo}
                                    />
                                </Accordion.Header>
                                <Accordion.Body>
                                    <TablePlaneacionLlegadas
                                        guias={catalogoGuiasEjemplo}
                                        nombreDestino={"todosLosDestinos"}
                                        volumenTotal={totales(catalogoGuiasEjemplo, "volumen")}
                                        pesoTotal={formattedCantidad(totales(catalogoGuiasEjemplo, "peso"))}
                                        fleteTotal={totales(catalogoGuiasEjemplo, "flete")}
                                        montoSeguroTotal={totales(catalogoGuiasEjemplo, "monto_seguro")}
                                        subtotalTotal={totales(catalogoGuiasEjemplo, "subtotal")}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <h3>Total por Destino</h3>
                        {
                            dataDestinos.map((destino, i) => (
                                <>
                                    <Accordion key={i}>
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
                                </>
                            ))
                        }
                    </div>
                </div>
            </>
        )
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
