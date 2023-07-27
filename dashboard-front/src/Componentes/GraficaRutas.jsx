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
    const colores = catalogoColores.colores
    const coloresBorder = catalogoColores.coloresBorder;
    /* Variables de Estilo fin */
    const Destino = props.destino


    /* seccion de return  */
    if (Destino.viajes_activos !== null) {
        const labelRutas = [];
        const capacidadesCarga = [];
        const metrosLibres = []
        let cantiMaydeViajesActivos = 0;
        Destino.viajes_activos.map((viaje, index) => {
            labelRutas[index] = viaje.nombre+ " " + viaje.capacidad_mt3+" Mt3";
            capacidadesCarga[index] = viaje.capacidad_mt3
            metrosLibres[index] = viaje.capacidad_mt3 - viaje.mt3_embarcados
            /*este if es para sacar en la vuelta la posicion con mas elementos */
            if (viaje.mt3_embarcados_por_destino !== null) {
                if (cantiMaydeViajesActivos < viaje.mt3_embarcados_por_destino.length) {
                    cantiMaydeViajesActivos = viaje.mt3_embarcados_por_destino.length-1 
                }
            }
        })
    
        const ConstruirEjeY = () => {
            const dataSetConstruido = [];
            const labelsDestinos=[];
            let dataEjeY = [];
            dataSetConstruido.push({
                label: "Espacio libre del Contenedor",
                data: metrosLibres,
                backgroundColor: colorEspacioLibre,
                borderColor: colorEspacioLibreBorder,
                borderWidth: 2
            })
          
            for(let i =0;i<=cantiMaydeViajesActivos;i++){
               dataEjeY=Destino.viajes_activos.map((viajeActivo,index)=>{
                    if(viajeActivo.mt3_embarcados_por_destino!==null && i<viajeActivo.mt3_embarcados_por_destino.length ){
                        return viajeActivo.mt3_embarcados_por_destino[i].mt3
                    }else{
                       return 0
                    }
                })
                /* console.log(Destino.viajes_activos[1].mt3_embarcados_por_destino[i].Destino) */
                dataSetConstruido.push({
                label: Destino.viajes_activos[0].mt3_embarcados_por_destino[i].name ,
                data: dataEjeY,
                backgroundColor: colores[i].color,
                borderColor: coloresBorder[i].color,
                borderWidth: 2
                })
                
            }
            return dataSetConstruido;

        }
        const maximoEjeX = 5 + Math.max(...capacidadesCarga)

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
            datasets: ConstruirEjeY()
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
    /* seccion de return fim */
}
/* [
                {
                    label: "Espacio libre del Contenedor",
                    data: metrosLibres,
                    backgroundColor: colorEspacioLibre,
                    borderColor: colorEspacioLibreBorder,
                    borderWidth: 2
                },
                {
                    label: 'Embarcado',
                    data: null,
                    backgroundColor: colorChillout,
                    borderColor: colorChilloutBorder,
                    borderWidth: 2
                },
    
            ] */