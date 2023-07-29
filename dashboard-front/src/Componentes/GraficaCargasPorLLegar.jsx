
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
    const colores = catalogoColores.colores
    const coloresBorder = catalogoColores.coloresBorder
    const colorSinEmbarcar = 'rgb(230,1,15, .5)'
    const colorSinEmbarcarBorder = 'rgb(230,1,15)'
    /*   const colorEspacioLibre='rgb(175,203,246,.2)'
      const colorEspacioLibreBorder='rgb(175,203,246)' */

    /* Variables de Estilo  fin */

    /* Ejecucion de la lista si esque existe variables */
    if (props.destino.viajes_por_llegar !== null) {
        function limpiado_de_viajes(viajesActivos) {
            /* en esta funcion se va a hacer un filtrado de los viajes ya que solo 
            se van a mostrar los que estan en curso pero solo los que estan en la ubicacion
            o una posicion anterior a la posicion a continuacion esta la loguica que se sigue para
            el split*/

            /* // Supongamos que tienes el objeto JSON con el parámetro "orden_parada_directa"
    const dataFromJson = {
      // ... otras propiedades ...
      orden_parada_directa: ";3;1;",
      // ... otras propiedades ...
    };
    
    // Paso 1: Eliminar los caracteres ";" al principio y al final de la cadena
    const ordenParadaDirectaString = dataFromJson.orden_parada_directa;
    const ordenParadaDirectaCleaned = ordenParadaDirectaString.replace(/^;+|;+$/g, '');
    
    // Paso 2: Dividir la cadena en un arreglo utilizando ";" como separador
    const ordenParadaDirectaArray = ordenParadaDirectaCleaned.split(';');
    
    console.log(ordenParadaDirectaArray);
    // El resultado será un arreglo ['3', '1'] */
            const viajes_filtrados = [];
            let posicionSucursal = null;
            for (let i = 0; i < viajesActivos.length; i++) {
                const ordenParadaCleaned = viajesActivos[i].orden_parada_directa.replace(/^;+|;+$/g, '');
                const ordenParadaDirectaArray = ordenParadaCleaned.split(';');
                for (let j = 0; j < ordenParadaDirectaArray.length; j++) {

                    if (props.destino.id == ordenParadaDirectaArray[j]) {
                        posicionSucursal = j;
                    }
                }
                if (viajesActivos[i].IdUbicacionActual == ordenParadaDirectaArray[posicionSucursal] || viajesActivos[i].IdUbicacionActual == ordenParadaDirectaArray[posicionSucursal - 1])
                    viajes_filtrados.push(viajesActivos[i]);
            }
            return viajes_filtrados;
        }


        const listaViajes = limpiado_de_viajes(props.destino.viajes_por_llegar);
        const etiquetaNomViajes = [];
        const pesosTotalesEmbarcados = [];
        const metrosLibres = [];
        
        listaViajes.map((viajeActivo, index) => {
            let label = [];
            label.push(viajeActivo.nombre + '-' + viajeActivo.fecha_registro)
            etiquetaNomViajes.push(label)
/*             console.log(viajeActivo.orden_parada_directa)
 */            if (viajeActivo.volumen_por_destino !== null) {
                let volumen_total = 0;
                for (let x = 0; x < viajeActivo.volumen_por_destino.length; x++) {
                    volumen_total = volumen_total + viajeActivo.volumen_por_destino[x].mt3_cargados;
                }
                pesosTotalesEmbarcados.push(volumen_total);
                metrosLibres.push(viajeActivo.Volumen_carga_max - volumen_total)
            } 
        })





      

        function constriurEjey() {
            const dataSetConstruido = [];
            if (listaViajes[0].volumen_por_destino !== null) {
                dataSetConstruido.push({
                    label: "Espacio libre del Contenedor",
                    data: metrosLibres,
                    backgroundColor: colores[100].color,
                    borderColor: coloresBorder[100].color,
                    borderWidth: 2
                })
                for(let col=0; col<listaViajes[0].volumen_por_destino.length;col++){
                    let dataEjeY = [];
                    listaViajes.map((viaje)=>{
                        dataEjeY.push(viaje.volumen_por_destino[col].mt3_cargados)
                    })
                    dataSetConstruido.push({
                        label: listaViajes[0].volumen_por_destino[col].nombre,
                        data: dataEjeY,
                        backgroundColor: colores[col].color,
                        borderColor: coloresBorder[col].color,
                        borderWidth: 2
                    })
            
        }
              /*   for (let col = 0; col < listaViajes[0].volumen_por_destino.length; col++) {


                    let dataEjeY = [];
                    dataSetConstruido.push({
                        label: listaViajes[0].nombre,
                        data: metrosLibres,
                        backgroundColor: colores[100].color,
                        borderColor: coloresBorder[100].color,
                        borderWidth: 2
                    })

                } */


            } else {
                dataSetConstruido.push({
                    label: "",
                    data: [],
                    backgroundColor: colores[100].color,
                    borderColor: coloresBorder[100].color,
                    borderWidth: 2
                })
            }



            console.log(dataSetConstruido)
            return dataSetConstruido
        }




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
                    max: 100,

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

            /* datasets: [
               {
                   label: "",
                   data: [40, 20, 40],
                   backgroundColor: catalogoColores.colores[100].color,
                   borderColor: catalogoColores.coloresBorder[100].color,
                   borderWidth: 2
               },
              
          ]  */
            datasets: constriurEjey()

        }
        return (
            <>
                <Bar
                    data={data}
                    options={myoptions}
                />

            </>
        );

    } else {
        /*  console.log('no tenemos registro de viajes'); */
        return <h3>No existen viajes por llegar a tu Destino: {props.destino.nombre}</h3>
        console.log('ya sabes que no tenemos que entrar')
    }
    /* Ejecucion de la lista si esque existe variables */
}
