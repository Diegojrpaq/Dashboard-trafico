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
    responsive: false,
    animation: true,
    autoSkip: true,
    plugins: {
        legend: {
            display: true
        }
    },
    
    
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
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
    data: [30,10,20],
    backgroundColor:  'rgba(255, 0, 132, 0.5)',
    borderColor:  'rgba(255, 99, 132, 0.5)',
    borderWidth: 2
  },
  {
    label: "Espacio libre del Contenedor3",
    data: [20,30,10],
    backgroundColor:  'rgba(255, 190, 132, 0.5)',
    borderColor:  'rgba(255, 99, 132, 0.5)',
    borderWidth: 2
  }]
};

  return (
   <>
   <Bar
   data={data}
   options={myoptions}
   />
   </>
  )
}
