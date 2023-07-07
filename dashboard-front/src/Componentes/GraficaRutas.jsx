
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
import { dataLogisticContext } from '../App';

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



export default function GraficaRutas(props) {
    /* Variables de Estilo  */
    const color_chillout =
        [
            'rgb(160, 235, 22, 0.5)',
            'rgb(255, 99, 132, 0.5)',
            'rgb(255, 159, 64, 0.5)',
            'rgb(255, 205, 86, 0.5)',
            'rgb(75, 192, 192, 0.5)',
            'rgb(54, 162, 235, 0.5)',
            'rgb(160, 235, 22, 0.5)',
            'rgb(153, 102, 255, 0.5)',
            'rgb(160, 235, 22, 0.5)',
            'rgb(201, 203, 207, 0.5)'
        ];
        const color_chillout_sin_transparencia=
        [
            'rgb(160, 235, 22)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(160, 235, 22)',
            'rgb(153, 102, 255)',
            'rgb(160, 235, 22)',
            'rgb(201, 203, 207)'
        ];

    

    /* Variables de Estilo  */

    const Destino = props.destino;
    const labels= ['Queretaro1','Queretaro2','Queretaro3']
    console.log(labels)
    let myoptions = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            x: {
                stacked: false ,
                beginAtZero: false, // Asegura que el eje X no empiece en 0
                min: 0, // Establece el mínimo del eje X en 100
                max: 50,
               
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
        labels: labels,
        datasets: [{
            label: 'Ronda_1',
            data: [4,5,3],
            backgroundColor: color_chillout[0],
            borderColor: color_chillout_sin_transparencia[0],
            borderWidth: 2
        }]
    }
    return (
        <>
            <Bar
                data={data}
                options={myoptions}
            />

        </>
    )
}
