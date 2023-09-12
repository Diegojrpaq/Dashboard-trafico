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
          text: 'Ruta: '+'GUA-QRO-1',
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
  labels: ['PLANEADO', 'EMBARCADOS'],
  datasets: [{
    label: "Espacio libre del Contenedor",
    data: [15,45],
    backgroundColor:  'rgb(114,176,228, .5)',
    borderColor:  'rgb(114,176,228)',
    borderWidth: 2
  },
  {
    label: "GONZALEZ GALLO",
    data: [15,10],
    backgroundColor:  'rgb(160, 235, 22, .6)',
    borderColor:  'rgb(160, 235, 22)',
    borderWidth: 2
  },
  {
    label: "PABLO VALDEZ",
    data: [20, 15],
    backgroundColor:  'rgb(255, 79, 13)',
    borderColor:  'rgb(255, 79, 13)',
    borderWidth: 2
  },
 
  {
    label: "CRUZ DEL SUR",
    data: [20,10],
    backgroundColor:  'rgba(7, 158, 232)',
    borderColor:  'rgba(7, 158, 232)',
    borderWidth: 2
  },

  {
    label: "PATRIA",
    data: [20,10],
    backgroundColor:  'rgba(188, 0, 255 )',
    borderColor:  'rgba(188, 0, 255)',
    borderWidth: 2
  },
  {
    label: "PLAN DE SAN LUIS",
    data: [10,10],
    backgroundColor:  'rgba(26, 13, 255)',
    borderColor:  'rgba(26, 13, 255)',
    borderWidth: 2
  }
]
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
