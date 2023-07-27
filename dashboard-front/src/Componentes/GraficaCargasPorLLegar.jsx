
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



export default function GraficaRutasPorLlegar(props) {
    /* Variables de Estilo  */
        const colorSinEmbarcar= 'rgb(230,1,15, .5)'
        const colorSinEmbarcarBorder= 'rgb(230,1,15)'
      /*   const colorEspacioLibre='rgb(175,203,246,.2)'
        const colorEspacioLibreBorder='rgb(175,203,246)' */

    

    /* Variables de Estilo  fin */
   
    /* Ejecucion de la lista si esque existe variables */
    if(props.destino.viajes_por_llegar !== null){
        const listaViajes = props.destino.viajes_por_llegar;
        const etiquetaNomViajes= [];
         listaViajes.map((viajeActivo, index)=>{
            etiquetaNomViajes.push(viajeActivo.nombre)
            console.log(viajeActivo.orden_parada_directa)
         })

         



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
            labels: etiquetaNomViajes,
            datasets: [
                {
                    label: "" ,
                    data: [40, 20, 40],
                    backgroundColor: catalogoColores.colores[100].color,
                    borderColor: catalogoColores.coloresBorder[100].color,
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
        );

    }else{
       /*  console.log('no tenemos registro de viajes'); */
       <h1>No tenemos informacion a representar</h1>
    }
    /* Ejecucion de la lista si esque existe variables */
}
