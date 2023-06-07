import { Line } from 'react-chartjs-2';
import React from 'react';
import{
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,

} from 'chart.js';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



let beneficios =[0, 56, 20, 36, 80, 40, 30, -20, 35];
let meses=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"];
let myoptions=null;

let dataset={
    labels:meses,
    datasets:[
        {
            label: '',
            data: beneficios,
            tension: .4,
            fill: true, 
            borderColor: 'rgb(160, 235, 22)',
            backgroundColor: 'rgb(160, 235, 22, 0.5)',
            pointRadius: 5,
            pointBorderColor:'rgb(45, 214, 4)',
            pointBackgrounColor: 'rgb(45, 214, 4)'
        
        }
    ]
}

export default function Linechart() {
  return (
     <Line data={dataset} options={myoptions}>Linechart</Line> 
  )
}

/*  */