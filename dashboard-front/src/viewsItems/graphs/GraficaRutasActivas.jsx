import catalogoColores from '../../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
import React from 'react';
import { CalcularAnchoBarra } from '../../utileria/utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
    Filler,
    ChartDataLabels
);

function formatearFecha(fechaSinFormato) {
    const año = fechaSinFormato.slice(0, 4);
    const mes = fechaSinFormato.slice(4, 6);
    const día = fechaSinFormato.slice(6, 8);

    return `${día}/${mes}/${año}`;
}


export default function GraficaRutasActivas(props) {
    /* Variables de Estilo  */
    const viajesList = props.viajesList
    const catalogoDestinoFinal = props.catalogoDestinoFinal
    const colorEspacioLibre = catalogoColores.colores[100].color;
    const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
    const colorChillout = catalogoColores.colores[101].color;
    const colorChilloutBorder = catalogoColores.coloresBorder[101].color;
    const colores = catalogoColores.colores
    const coloresBorder = catalogoColores.coloresBorder;
    /* Variables de Estilo fin */

    //Configuración de los datalabels
    const confDataLabels = {
        formatter: function (value, context) {
            const index = context.dataIndex
            const nombre = context.dataset.label
            const peso = context.dataset.peso
            const volumen = value.toFixed(2)
            if (value > 4) {
                return `${nombre}\n${volumen} mt3 ${peso === undefined ? "" : "\n" + peso[index] + " Kg"}`
            } else {
                return ""
            }
        },
        align: 'center',
        display: 'auto',
        rotation: 0,
        labels: {
            title: {
                color: '#3c3c3d',
                font: {
                    family: 'Poppins',
                    weight: 'bold',
                    size: 13
                }
            }
        }
    }
    /* seccion de return  */
    if (viajesList.length !== 0) {
        const labelRutas = [];
        const capacidadesCarga = [];
        const metrosLibres = [];
        let cantiMaydeViajesActivos = 0;
        let label = [];
        let mt3_embarcados;

        viajesList.map((viaje, index) => {
            if (viaje.catalogoGuias !== null) {
                mt3_embarcados = viaje.catalogoGuias.reduce((total, guia) => total + guia.volumen, 0)
            } else {
                mt3_embarcados = 0
                viaje.catalogoGuias = [];
            }
            /* labelRutas[index] = viaje.nombre+ " " + viaje.capacidad_mt3+" Mt3"; */

            /*  labelRutas[index] = viaje.nombre+ " " + viaje.capacidad_mt3+" Mt3 "+ viaje.fecha_registro; */
            label.push(viaje.nombre)
            label.push(formatearFecha(viaje.fecha_registro))
            label.push(viaje.Clave_vehiculo)
            viaje.Caja && label.push(viaje.Caja)
            labelRutas.push(label)
            label = [];
            capacidadesCarga.push(viaje.Volumen_carga_maxima)
            metrosLibres.push(viaje.Volumen_carga_maxima - mt3_embarcados)

        })
        
        const ConstruirEjeY = () => {
            const dataSetConstruido = [];
            const labelsDestinos = [];
            let dataEjeY = [];
            let pesoXDestino = [];
            dataSetConstruido.push({
                label: "Espacio libre del Contenedor",
                data: metrosLibres,
                backgroundColor: colorEspacioLibre,
                borderColor: colorEspacioLibreBorder,
                borderWidth: 2,
                datalabels: confDataLabels,
            })
            catalogoDestinoFinal?.map((destinoFinal, index) => {
                viajesList.map((viaje) => {
                    const guiasXDestino = viaje.catalogoGuias.filter(guia => guia.destino === destinoFinal.nombre)
                    const volumenXDestino = guiasXDestino.reduce((total, guia) => total + guia.volumen, 0)
                    const pesoGuia = guiasXDestino.reduce((total, guia) => total + guia.peso, 0)
                    dataEjeY.push(volumenXDestino)
                    pesoXDestino.push(pesoGuia)
                })
                dataSetConstruido.push({
                    label: destinoFinal.nombre,
                    data: dataEjeY,
                    backgroundColor: colores[index].color,
                    borderColor: coloresBorder[index].color,

                    borderWidth: 2,
                    datalabels: confDataLabels,
                    peso: pesoXDestino

                })
                dataEjeY = []
                pesoXDestino = []
            })
            return dataSetConstruido;

        }
        const maximoEjeX = 10 + Math.max(...capacidadesCarga)

        const { porcentajeAnchoBarra, heightGraph } = CalcularAnchoBarra(viajesList.length)

        let myoptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: true,
            autoSkip: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            barPercentage: porcentajeAnchoBarra,
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
                <div className="container-graph" style={{ height: heightGraph }}>
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
