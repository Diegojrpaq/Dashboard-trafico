import React from 'react'
import catalogoColores from '../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
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


export default function GraficaBarrasPrueba() {
 const myoptions = {
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
          text: 'Ruta: '+'QRO-GUA-1',
          font: {
            size: 25
          }
        },
        datalabels: {
          display: false,
        },
    },
    scales:{
      x:{
        stacked: true,
                beginAtZero: false, // Asegura que el eje X no empiece en 0
                min: 0, // Establece el mínimo del eje X en 100
      },
      y: { 
        stacked: true,
        min: 0,
      }
    },
    
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
       
      };



 const data = {
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: "Espacio libre del Contenedor",
    data: [10,20,30],
    backgroundColor:  'rgba(255, 99, 132, 0.5)',
    borderColor:  'rgba(255, 99, 132, 0.5)',
    borderWidth: 2
  },
  {
    label: "Espacio libre del Contenedor2",
    data: [10,20,30],
    backgroundColor:  'rgba(255, 0, 132, 0.5)',
    borderColor:  'rgba(255, 99, 132, 0.5)',
    borderWidth: 2
  },
  {
    label: "Espacio libre del Contenedor3",
    data: [10,20,30],
    backgroundColor:  'rgba(255, 190, 132, 0.5)',
    borderColor:  'rgba(255, 99, 132, 0.5)',
    borderWidth: 2
  }]
};

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
}
