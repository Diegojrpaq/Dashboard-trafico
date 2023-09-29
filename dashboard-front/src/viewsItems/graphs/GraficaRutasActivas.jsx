import catalogoColores from '../../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
import React from 'react';
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,

} from 'chart.js';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



export default function GraficaRutasActivas() {
    /* Variables de Estilo  */
    const colorEspacioLibre = catalogoColores.colores[100].color;
    const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
    const colorChillout = catalogoColores.colores[101].color;
    const colorChilloutBorder = catalogoColores.coloresBorder[101].color;
    const colores = catalogoColores.colores
    const coloresBorder = catalogoColores.coloresBorder;
    /* Variables de Estilo fin */
    const Destino = {
        "viajes_activos": [
            {
                "id": 54171,
                "nombre": "GDL-MAZ-CUL-MCH-NAV-OBR",
                "fecha_registro": "20230925",
                "unidad": "JR43",
                "capacidad_mt3": 0,
                "mt3_embarcados_por_destino": [
                    {
                        "name": "CD. OBREGON ",
                        "mt3": 1.399
                    },
                    {
                        "name": "CULIACAN",
                        "mt3": 20.10548
                    },
                    {
                        "name": "GUAMUCHIL",
                        "mt3": 0.027
                    },
                    {
                        "name": "GUASAVE",
                        "mt3": 0.091
                    },
                    {
                        "name": "GUAYMAS",
                        "mt3": 0.501
                    },
                    {
                        "name": "HERMOSILLO",
                        "mt3": 21.1288
                    },
                    {
                        "name": "LOS MOCHIS ",
                        "mt3": 11.957
                    },
                    {
                        "name": "NAVOJOA",
                        "mt3": 9.188
                    }
                ],
                "mt3_embarcados": 64.39728
            },
            {
                "id": 54170,
                "nombre": "GDL-MTY",
                "fecha_registro": "20230925",
                "unidad": "JR33",
                "capacidad_mt3": 0,
                "mt3_embarcados_por_destino": [
                    {
                        "name": "MONTERREY",
                        "mt3": 22.221236
                    },
                    {
                        "name": "SALTILLO",
                        "mt3": 1.555
                    },
                    {
                        "name": "TORREON",
                        "mt3": 14.461
                    }
                ],
                "mt3_embarcados": 38.237236
            },
            {
                "id": 54165,
                "nombre": "(PERI)-MEX-DIRECTO",
                "fecha_registro": "20230925",
                "unidad": "JR41",
                "capacidad_mt3": 0,
                "mt3_embarcados_por_destino": [
                    {
                        "name": "MEXICO",
                        "mt3": 45.057956
                    },
                    {
                        "name": "PACHUCA",
                        "mt3": 1.717
                    }
                ],
                "mt3_embarcados": 46.774956
            },
            {
                "id": 54164,
                "nombre": "(PERI) GDL QRO ",
                "fecha_registro": "20230925",
                "unidad": "VIRTUAL",
                "capacidad_mt3": 0,
                "mt3_embarcados_por_destino": [
                    {
                        "name": "CELAYA",
                        "mt3": 0.027
                    }
                ],
                "mt3_embarcados": 0.027
            },
            {
                "id": 54081,
                "nombre": "(PERI) GDL QRO ",
                "fecha_registro": "20230922",
                "unidad": "VIRTUAL",
                "capacidad_mt3": 0,
                "mt3_embarcados_por_destino": [
                    {
                        "name": "QUERETARO",
                        "mt3": 0.027
                    },
                    {
                        "name": "IRAPUATO",
                        "mt3": 0.054
                    },
                    {
                        "name": "SAN LUIS POTOSI",
                        "mt3": 0.054
                    },
                    {
                        "name": "SAN JUAN DEL RIO",
                        "mt3": 0.027
                    }
                ],
                "mt3_embarcados": 0.162
            },
            {
                "id": 53697,
                "nombre": "GUA-QRO-(BAJIO CENTRO)",
                "fecha_registro": "20230912",
                "unidad": "VIRTUAL",
                "capacidad_mt3": 0,
                "mt3_embarcados_por_destino": [
                    {
                        "name": "MEXICO",
                        "mt3": 0.495
                    }
                ],
                "mt3_embarcados": 0.495
            }
        ]
    }
    /* const Destino = [
        {
            "id": 51165,
            "nombre": "GDL-MTY",
            "fecha_registro": "2023-07-11",
            "unidad": "84",
            "capacidad_mt3": 20,
            "mt3_embarcados": 8,
            "--comentario": "esta seccion al crear la consulta debemos contemplar el orden de escaneo para simular como se suben al camion",
            "mt3_embarcados_por_destino": [
                {
                    "name": "Leon",
                    "mt3": 5
                },
                {
                    "name": "MONTERREY",
                    "mt3": 2
                },
                {
                    "name": "AGUASCALIENTES",
                    "mt3": 1
                }
            ]
        },
        {
            "id": 51167,
            "nombre": "GDL-COL-MAN",
            "fecha_registro": "2023-07-11",
            "unidad": "",
            "capacidad_mt3": 30,
            "mt3_embarcados": 0,
            "mt3_embarcados_por_destino": null
        },
        {
            "id": 51168,
            "nombre": "GDL-OBR",
            "fecha_registro": "2023-07-11",
            "unidad": "",
            "capacidad_mt3": 0,
            "mt3_embarcados": 0,
            "mt3_embarcados_por_destino": null
        }
    ] */


    /* seccion de return  */
    if (Destino.viajes_activos !== null) {
        const labelRutas = [];
        const capacidadesCarga = [];
        const metrosLibres = [];
        let cantiMaydeViajesActivos = 0;
        let label = [];
        Destino.viajes_activos.map((viaje, index) => {
            /* labelRutas[index] = viaje.nombre+ " " + viaje.capacidad_mt3+" Mt3"; */
           /*  labelRutas[index] = viaje.nombre+ " " + viaje.capacidad_mt3+" Mt3 "+ viaje.fecha_registro; */
           label.push(viaje.nombre)
           label.push(viaje.fecha_registro)
           /* label.push("Capacidad camion: "+viaje.capacidad_mt3)
           label.push("embarcados: "+viaje.mt3_embarcados)
           label.push(viaje.unidad) */
           labelRutas[index] = label
           label = [];
            capacidadesCarga[index] = viaje.capacidad_mt3
            metrosLibres[index] = viaje.capacidad_mt3 - viaje.mt3_embarcados
            /*este if es para sacar en la vuelta la posicion con mas elementos */
            if (viaje.mt3_embarcados_por_destino !== null) {
                if (cantiMaydeViajesActivos < viaje.mt3_embarcados_por_destino.length) {
                    cantiMaydeViajesActivos = viaje.mt3_embarcados_por_destino.length-1 
                }
            }
        })
    
        const ConstruirEjeY = () => {
            const dataSetConstruido = [];
            const labelsDestinos=[];
            let dataEjeY = [];
            dataSetConstruido.push({
                label: "Espacio libre del Contenedor",
                data: metrosLibres,
                backgroundColor: colorEspacioLibre,
                borderColor: colorEspacioLibreBorder,
                borderWidth: 2
            })
          
            for(let i =0;i<=cantiMaydeViajesActivos;i++){
               dataEjeY=Destino.viajes_activos.map((viajeActivo)=>{
                    if(viajeActivo.mt3_embarcados_por_destino!==null && i < viajeActivo.mt3_embarcados_por_destino.length ){
                       
                        return  viajeActivo.mt3_embarcados_por_destino[i].mt3
                    }else{
                       return 0
                    }
                })
                /* console.log(Destino)
                console.log(Destino.nombre)
                console.log(Destino.viajes_activos[0].mt3_embarcados_por_destino[i].nombre) */
                dataSetConstruido.push({
                /* label: Destino.viajes_activos[0].mt3_embarcados_por_destino[i].nombre, */ 
                data: dataEjeY,
                backgroundColor: colores[i].color,
                borderColor: coloresBorder[i].color,
                borderWidth: 2
                })
                
            }
            return dataSetConstruido;

        }
        const maximoEjeX = 70 + Math.max(...capacidadesCarga)

        let myoptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: true,
            autoSkip: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    stacked: true,
                    beginAtZero: false, // Asegura que el eje X no empiece en 0
                    min: 0, // Establece el mínimo del eje X en 100
                    max: maximoEjeX,

                },
                y: {
                    stacked: true,
                    min: 0,
                    max: 100,
                },
            },
            indexAxis: 'y',
        };

        let data = {
            labels: labelRutas,
            datasets: ConstruirEjeY()
        }


        return (
            <>
                <div className="container-graph">
                <Bar
                    data={data}
                    options={myoptions}
                />
                </div>

            </>
        )
    } else {
        return <h4>No existen viajes el dia de hoy y activos para este Origen, porfavor activa un viaje</h4>
    }
    /* seccion de return fim */
}
/* [
                {
                    label: "Espacio libre del Contenedor",
                    data: metrosLibres,
                    backgroundColor: colorEspacioLibre,
                    borderColor: colorEspacioLibreBorder,
                    borderWidth: 2
                },
                {
                    label: 'Embarcado',
                    data: null,
                    backgroundColor: colorChillout,
                    borderColor: colorChilloutBorder,
                    borderWidth: 2
                },
    
            ] */