
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



export default function GraficaMt3PorSucursal(props) {
    /* Variables de Estilo  */
    let color_chillout =
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
        let color_chillout_sin_transparencia=
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

    
    let color_danger = 'rgb(217, 25, 0, .8)';

    /* Variables de Estilo  */

    const Destino = props.destino;
    let nameSucursales = [];
    let totalVentaMt3 = [];

    Destino.sucursales.map((Sucursal, index) => {
        nameSucursales[index] = Sucursal.nombre;
        totalVentaMt3[index] = Sucursal.total_mt3_sucursal;
    })

    const ConstruirEjeY = () => {
        const dataSetConstruido = [];
        let dataEjeY;
        for (let i = 0; i < Destino.mt3_vendidos_por_destino.length; i++) {
            dataEjeY = Destino.sucursales.map((Sucursal, index) => {
                //console.log('Ciclo for: '+ i + ' ciclo map: '+index +', '+Sucursal.mt3_por_destino[i].Mt3_vendido)
                return Sucursal.mt3_por_destino[i].Mt3_vendido
            })
            dataSetConstruido.push({
                label: Destino.mt3_vendidos_por_destino[i].Destino,
                data: dataEjeY,
                backgroundColor: color_chillout[i],
                borderColor: color_chillout_sin_transparencia[i],
                borderWidth: 2
            })
          
        }
        return dataSetConstruido;
    }


    /* let maximoGrafica = Math.max(totalVentaMt3); */
    let maximoEjeY =10+ Math.max(...totalVentaMt3);
    console.log(maximoEjeY)
    ConstruirEjeY()
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
                max: maximoEjeY,
               
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
        datasets: ConstruirEjeY()
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
