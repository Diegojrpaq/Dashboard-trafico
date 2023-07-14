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
    const colorEspacioLibre = catalogoColores.colores[100].color;
    const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
    const colorChillout = catalogoColores.colores[101].color;
    const colorChilloutBorder = catalogoColores.coloresBorder[101].color;


    /* Variables de Estilo  */
    const Destino= props.destino

    if (Destino.viajes_activos !== null) {
        

        const labelRutas=[];
        const Cargasporruta=[];
        const metros3Embarcados=[];
        const metrosLibres=[]
         Destino.viajes_activos.map((viaje, index)=>{
            labelRutas[index]=viaje.nombre
            Cargasporruta[index]=viaje.capacidad_mt3
            metros3Embarcados[index]=viaje.mt3_embarcados
            metrosLibres[index]=viaje.capacidad_mt3-viaje.mt3_embarcados
        })
         const maximoEjeX=10+ Math.max(...Cargasporruta)
         console.log(metrosLibres)

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
                    max: maximoEjeX,
    
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
            labels: labelRutas,
            datasets: [
                {
                    label: "Espacio libre del Contenedor",
                    data: metrosLibres,
                    backgroundColor: colorEspacioLibre,
                    borderColor: colorEspacioLibreBorder,
                    borderWidth: 2
                },
                {
                    label: 'Embarcado_Queretaro',
                    data: metros3Embarcados,
                    backgroundColor: colorChillout,
                    borderColor: colorChilloutBorder,
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
    } else {
        return <h4>No existen viajes el dia de hoy y activos para este Origen, porfavor activa un viaje</h4>
    }
}
