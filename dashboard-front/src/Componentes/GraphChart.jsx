
import { Bar} from 'react-chartjs-2';
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

let color_chillout = 'rgb(160, 235, 22, 0.5)';
let color_danger= 'rgb(217, 25, 0, .8)';

let beneficios = ["40","50","27", "5","15","25"];
let meses = ["Perisur","Lazaro Cardenas", "Gonzales Gallo", "Colli","Zapopan", "Cruz del sur"];
let myoptions = {
    responsive: true,
    animation: true,
    plugins: {
        legend: {
            display: true
        }
    },
    scales: {
        y: {
            min: -25,
            max: 100
        },
        x: {
            ticks: {
                color: 'rgb(0,220.195)'
            }
        }
    }
};

let dataset = {
    labels: meses,
    datasets: [
        {
            label: 'Beneficios',
            data: beneficios,
            backgroundColor: color_chillout
        }
    ]
}

export default function GraphChart() {
    return (
       <>
        {
           console.log(dataset) 
        }
            <Bar
                data={dataset}
                Options={myoptions}
            />

       </>
    )
}
 