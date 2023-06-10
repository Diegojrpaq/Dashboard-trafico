
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

let beneficios = [10, 5, 25 , 2 , 12];
let meses = ["Colli", "Cruz del Sur", "Perisur", "Tesistan", "Zapopan"];
let myoptions = {
    
    responsive: true,
    animation: true,
    plugins: {
        legend: {
            display: true
        }
    },
    indexAxis: 'y',
    scales: {
        horizontal:true,
        
        y: {
            min: 0,
            max: 70
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
            label: 'mt3',
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
                options={myoptions}
            />

       </>
    )
}
 