
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



export default function GraphChart(props) {
    /* Variables de Estilo  */
    let color_chillout = 'rgb(160, 235, 22, 0.5)';

    let color_chillout_sin_transparencia = 'rgb(160, 235, 22)';
    let color_danger = 'rgb(217, 25, 0, .8)';

    /* Variables de Estilo  */

    const Destino = props.destino;
    let nameSucursales = [];
    let totalVentaMt3 = [];

    Destino.sucursales.map((Sucursal, index) => {
        nameSucursales[index] = Sucursal.nombre;
        totalVentaMt3[index] = Sucursal.total_mt3_sucursal;
    })

    const ConstruirEjeY=(Destino)=>{
        let dataEjeY=[];
        for(let i=1; i <= Destino.mt3_vendidos_por_destino.length; i++){
            dataEjeY=Destino.sucursales.map((Sucursal)=>{
             return Sucursal.mt3_por_destino[i]
            })
            console.log('Dentro del ciclo'+ dataEjeY)
        }
    }

   
    /* let maximoGrafica = Math.max(totalVentaMt3); */
    let maximoGrafica = 50;
    ConstruirEjeY(Destino)
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
                stacked: true,
                beginAtZero: false, // Asegura que el eje X no empiece en 0
                min: 0, // Establece el mínimo del eje X en 100
                max: 200,
                ticks: {
                    color: 'rgb(0,220,195)',
                },
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
        labels: nameSucursales,
        datasets: [
            {
                label: 'Leon',
                data: totalVentaMt3,
                backgroundColor: color_chillout,
                borderColor: color_chillout_sin_transparencia,
                borderWidth: 2
            },
            {
                label: 'Dataset 2',
                data: totalVentaMt3,
                backgroundColor: color_chillout,
                borderColor: color_chillout_sin_transparencia,
                borderWidth: 2
            },
            {
                label: 'Dataset 3',
                data: totalVentaMt3,
                backgroundColor: color_chillout,
                borderColor: color_chillout_sin_transparencia,
                borderWidth: 2
            },
        ]
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
