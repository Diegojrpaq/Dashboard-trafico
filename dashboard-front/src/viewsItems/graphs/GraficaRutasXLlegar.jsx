
import catalogoColores from '../../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { formatearFecha, CalcularAnchoBarra, limpiado_de_viajes, formattedCantidad } from '../../utileria/utils'
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
    Filler,
    ChartDataLabels
);


export default function GraficaRutasXLlegar(props) {
    /* Variables de Estilo  */

    const viajesList = props.viajesList
    const catalogoDestinoFinal = props.catalogoDestinoFinal
    const colorEspacioLibre = catalogoColores.colores[100].color;
    const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
    const colores = catalogoColores.colores
    const coloresBorder = catalogoColores.coloresBorder;
    //console.log(props, "llegar")
    /*   const colorEspacioLibre='rgb(175,203,246,.2)'
      const colorEspacioLibreBorder='rgb(175,203,246)' */

    /* Variables de Estilo  fin */
    //Configuración de los datalabels
    const confDataLabels = {
        formatter: function (value, context) {
            const index = context.dataIndex
            const nombre = context.dataset.label
            const peso = context.dataset.peso
            const volumen = value.toFixed(2)
            const val = value / 126;
            if (val > 0.08) {
                return `${nombre}\n${volumen} mt3 ${peso === undefined ? "" : "\n" + formattedCantidad(peso[index]) + " Kg"}`
            } else {
                return ""
            }
        },
        align: 'center',
        display: 'auto',
        rotation: 0,
        labels: {
            title: {
                color: '#3c3c3d',
                font: {
                    family: 'Poppins',
                    weight: 'bold',
                    size: 13
                }
            }
        }
    }

    /* Ejecucion de la lista si esque existe variables */
    if (props.viajesList != null) {




        const listaViajes = props.viajesList
        const labelRutas = [];
        const capacidadesCarga = [];
        const metrosLibres = [];
        //se arma un catalogo de destinos para poder iterar sobre el en la grafica ya que se necesitan todos los destinos de todas las barras
        let catalogoDestinos = [];
        let label = [];
        let mt3_embarcados;


        //actualizar las necesidades de la lista primero creemos el catalogo de destinos para asi rellenar la grafica
        //en conforme a cada viaje en individual.
        listaViajes.map((viaje) => {

            if (viaje.catalogoGuias !== null) {
                mt3_embarcados = viaje.catalogoGuias.reduce((total, guia) => total + guia.volumen, 0)
            } else {
                mt3_embarcados = 0
                viaje.catalogoGuias = [];
            }
            label.push(viaje.nombre)
            label.push(formatearFecha(viaje.fecha_registro))
            label.push(`Viaje: ${viaje.id}`)
            label.push(viaje.Clave_vehiculo)
            viaje.Caja && label.push(viaje.Caja)
            labelRutas.push(label)
            label = [];
            viaje.Volumen_carga_maxima === 0 ? capacidadesCarga.push(mt3_embarcados) : capacidadesCarga.push(viaje.Volumen_carga_maxima)
            metrosLibres.push(viaje.Volumen_carga_maxima - mt3_embarcados)

            /*     
                label.push(viaje.nombre)
                label.push(viaje.fecha_registro)
                label.push(viaje.Clave_vehiculo)
                viaje.Caja && label.push(viaje.Caja)
                /* label.push(viajeActivo.Volumen_carga_max+' '+'Mt3'); */
            /* etiquetaNomViajes.push(label) */

            if (viaje.catalogoGuias !== null) {
                viaje.catalogoGuias.map((guia) => {
                    if (!catalogoDestinos.includes(guia.destino)) {
                        catalogoDestinos.push(guia.destino)
                    }
                })
            }

            /*  if (viaje.catalogoGuias !== null) {
                  let volumen_total = 0;
                  for (let x = 0; x < viaje.volumen_por_destino.length; x++) {
                      volumen_total = volumen_total + viaje.volumen_por_destino[x].mt3_cargados;
                  }
                  pesosTotalesEmbarcados.push(volumen_total);
                  metrosLibres.push(viaje.Volumen_carga_max - volumen_total)
                  volumenCajas.push(viaje.Volumen_carga_max) }*/
        })


        const ConstruirEjeY = () => {
            const dataSetConstruido = [];
            const labelsDestinos = [];
            let dataEjeY = [];
            let pesoXDestino = [];
            dataSetConstruido.push({
                label: "Espacio libre",
                data: metrosLibres,
                backgroundColor: colorEspacioLibre,
                borderColor: colorEspacioLibreBorder,
                borderWidth: 2,
                datalabels: confDataLabels,
            })
            catalogoDestinos?.map((destinoFinal, index) => {
                listaViajes.map((viaje) => {
                    const guiasXDestino = viaje.catalogoGuias.filter(guia => guia.destino === destinoFinal)
                    const volumenXDestino = guiasXDestino.reduce((total, guia) => total + guia.volumen, 0)
                    const pesoGuia = guiasXDestino.reduce((total, guia) => total + guia.peso, 0)
                    dataEjeY.push(volumenXDestino)
                    pesoXDestino.push(pesoGuia)
                })
                dataSetConstruido.push({
                    label: destinoFinal,
                    data: dataEjeY,
                    backgroundColor: colores[index].color,
                    borderColor: coloresBorder[index].color,

                    borderWidth: 2,
                    datalabels: confDataLabels,
                    peso: pesoXDestino

                })
                dataEjeY = []
                pesoXDestino = []
            })
            return dataSetConstruido;

        }

        /*     function constriurEjey() {
                const dataSetConstruido = [];
                if (listaViajes[0].volumen_por_destino !== null) {
                    dataSetConstruido.push({
                        label: "Espacio libre del Contenedor",
                        data: metrosLibres,
                        backgroundColor: colores[100].color,
                        borderColor: coloresBorder[100].color,
                        borderWidth: 2
                    })
                    for (let col = 0; col < listaViajes[0].volumen_por_destino.length; col++) {
                        let dataEjeY = [];
                        listaViajes.map((viaje) => {
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


        /*     } else {
                dataSetConstruido.push({
                    label: "",
                    data: [],
                    backgroundColor: colores[100].color,
                    borderColor: coloresBorder[100].color,
                    borderWidth: 2
                })
            }
 */


        /* console.log(dataSetConstruido) */
        /*  return dataSetConstruido }*/



        let maximoEjeX = 10 + Math.max(...capacidadesCarga)


        const { porcentajeAnchoBarra, heightGraph } = CalcularAnchoBarra(listaViajes.length)

        let myoptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: true,
            autoSkip: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            barPercentage: porcentajeAnchoBarra,
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
                <div className="container-graph" style={{ height: heightGraph }}>
                    <Bar
                        data={data}
                        options={myoptions}
                    />
                </div>

            </>
        )

    } else {
        /*  console.log('no tenemos registro de viajes'); */
        return <h3>No existen viajes por llegar a tu Destino: {props.destino.nombre}</h3>

    }
    /* Ejecucion de la lista si esque existe variables */
}
