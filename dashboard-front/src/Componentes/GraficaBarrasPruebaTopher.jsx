import React from 'react'
import catalogoColores from '../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
import Spinner from 'react-bootstrap/Spinner';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
    Filler,
    ChartDataLabels
);


export default function GraficaBarrasPruebaTopher() {
 const myoptions = {
    responsive: false,
    maintainAspectRatio: false,
    animation: true,
    autoSkip: true,
    // plugins: {
    //     legend: {
    //         display: false
    //     },
    //     datalabels: {
    //       display: true,
    //     }
    // },
    scales: {
      x: {stacked: true},
      y: {stacked: true}
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
          datalabels: {
            display: true,
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      };

//Configuración de los datalabels
const nombre = "EEE"
 const confDataLabels = {
  formatter: function(value) {
return `GUA\n ${value} mt3 \n 10 TN`;
  },
  
  align: 'center',
  display: 'auto',
  rotation: -45,
  labels: {
    title: {
      font: {
        family:'Poppins',
        weight: 'bold',
        size: 16
      }
    }
  }
 }
 const labels= ['Queretaro1','Queretaro2','Queretaro3'];

 const data = {
  labels: labels,
  datasets: [{
    label: "Espacio libre del Contenedor",
    data: [10,20,30],
    backgroundColor:  'rgba(255, 99, 132, 0.5)',
    borderColor:  'rgba(255, 99, 132, 0.5)',
    datalabels: confDataLabels,
    borderWidth: 2
  },
  {
    label: "Espacio libre del Contenedor2",
    data: [15,10,20],
    backgroundColor:  'rgba(255, 0, 132, 0.5)',
    borderColor:  'rgba(255, 99, 132, 0.5)',
    datalabels: confDataLabels,
    borderWidth: 2
  },
  {
    label: "Espacio libre del Contenedor3",
    data: [20,30,10],
    backgroundColor:  'rgba(255, 190, 132, 0.5)',
    borderColor:  'rgba(255, 99, 132, 0.5)',
    datalabels: confDataLabels,
    borderWidth: 2
  }]
};
  return (
   <>
   {
    data.datasets.length > 0 ? <div className="container-graph">
      <Bar
      data={data}
      options={myoptions}
      />
    </div>
    : <div className='text-center'>
      <Spinner animation="border" variant="primary" role="status" >
    <span className="visually-hidden">Loading...</span>
  </Spinner>
    </div>
   }
   
   </>
  )
}
