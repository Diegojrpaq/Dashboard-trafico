import React from 'react'
import { guiasFilter } from '../../utileria/utils'
import catalogoColores from '../../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
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


export default function GraficaHistorico(props) {

    if (props.info.catalogoGuias != null) {
        const listParadas = props.listParadas
        const viaje = props.info
        const colorEspacioLibre = catalogoColores.colores[100].color;
        const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
        const metrosLibres = [];
        const metrosEmbarcados = [];
        const metrosDesembarcados = [];
        const metrosTransito = [];
        const labels = [];
        let mt3Transito = 0;

        listParadas.forEach((parada) => {
            const listGuiasEmbarca = guiasFilter(viaje.catalogoGuias, 17, parada.id)
            const mt3Embarcados = listGuiasEmbarca.reduce((total, guia) => total + guia.volumen, 0);
            const listGuiasDesmbarca = guiasFilter(viaje.catalogoGuias, 18, parada.id)
            const mt3Desembarcados = listGuiasDesmbarca.reduce((total, guia) => total + guia.volumen, 0);
            mt3Transito = (mt3Transito - mt3Desembarcados)
            metrosTransito.push(mt3Transito)
            metrosEmbarcados.push(mt3Embarcados)
            metrosLibres.push(viaje.Volumen_carga_maxima - mt3Transito - mt3Embarcados - mt3Desembarcados)
            metrosDesembarcados.push(mt3Desembarcados)
            labels.push(parada.nombre)
            mt3Transito = (mt3Transito + mt3Embarcados)
        })

        const confDataLabels = {
            formatter: function (value, context) {
                const index = context.dataIndex
                const nombre = context.dataset.label
                const peso = context.dataset.peso
                const volumen = value?.toFixed(2)
                const val = value / 100;
                if (val > 0.08) {
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

        const ConstruirEjeY = () => {
            const dataSetConstruido = [];

            dataSetConstruido.push(
                {
                    label: "Espacio libre",
                    data: metrosLibres,
                    backgroundColor: colorEspacioLibre,
                    borderColor: colorEspacioLibreBorder,
                    borderWidth: 2,
                    datalabels: confDataLabels,
                },
                {
                    label: "Embarcado",
                    data: metrosEmbarcados,
                    backgroundColor: catalogoColores.colores[101].color,
                    borderColor: catalogoColores.coloresBorder[101].color,
                    borderWidth: 2,
                    datalabels: confDataLabels,
                },

                {
                    label: "Transito",
                    data: metrosTransito,
                    backgroundColor: catalogoColores.colores[80].color,
                    borderColor: catalogoColores.coloresBorder[80].color,
                    borderWidth: 2,
                    datalabels: confDataLabels,
                },
                {
                    label: "Desembarcado",
                    data: metrosDesembarcados,
                    backgroundColor: catalogoColores.colores[102].color,
                    borderColor: catalogoColores.coloresBorder[102].color,
                    borderWidth: 2,
                    datalabels: confDataLabels,
                })

            return dataSetConstruido;
        }



        let myoptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: true,
            autoSkip: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: `Viaje: ${viaje.nombre + '    Fecha: ' + viaje.fecha_registro}`,
                    font: {
                        size: 25
                    }
                }
            },
            //barPercentage: porcentajeAnchoBarra,
            scales: {
                x: {
                    stacked: true,
                    beginAtZero: false, // Asegura que el eje X no empiece en 0
                    min: 0, // Establece el mínimo del eje X en 100
                    max: viaje.Volumen_carga_maxima + 4,

                },
                y: {
                    stacked: true,
                    min: 0,
                    max: 100,
                },
            },
            indexAxis: 'y',
        };


        const data = {
            labels: labels,
            datasets: ConstruirEjeY()
        };

        listParadas.forEach((destinoParada) => {

        })
        return (
            <>
                <div className="container-graph" style={{ height: "460px" }}>
                    <Bar
                        data={data}
                        options={myoptions}
                    />
                </div>

            </>
        )
    } else {
        <></>
    }
}
