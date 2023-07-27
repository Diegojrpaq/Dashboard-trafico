
import catalogoColores from '../Data/CatalogoColores.json'
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
   
        const colorSinEmbarcar= 'rgb(230,1,15, .5)'
        const colorSinEmbarcarBorder= 'rgb(230,1,15)'
      /*   const colorEspacioLibre='rgb(175,203,246,.2)'
        const colorEspacioLibreBorder='rgb(175,203,246)' */

    

    /* Variables de Estilo  fin */
   
    const Destino = props.destino;
    const labels= ['Queretaro1','Queretaro2','Queretaro3']
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
                stacked: true ,
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
        datasets: [
            {
                label: "No Embarcado" ,
                data: [10, 20, 30],
                backgroundColor: colorSinEmbarcar,
                borderColor: colorSinEmbarcarBorder,
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
