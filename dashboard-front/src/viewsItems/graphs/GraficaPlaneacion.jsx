import React from 'react';
import catalogoColores from '../../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
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

export default function Graph(props) {
  const planRutasList = props.planRuta?.rutas;
  const catalogoSucursales = props.planRuta?.sucursales;
  const catalogoClientes = props.planRuta?.clientes;
  const colorEspacioLibre = catalogoColores.colores[100].color;
  const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
  const colores = catalogoColores.colores
  const coloresBorder = catalogoColores.coloresBorder;
  const nombreRuta = props.planRuta?.rutas[0]?.nombre;
  //const volumenMaxRuta = props.planRuta?.rutas[0]?.volumenMaxRuta;
  const volumenMaxRuta = 100;

  if (catalogoClientes !== null && planRutasList[0].catalogoGuiasPlaneadasClientes !== null) {
    //Configuración de los datalabels
    const confDataLabels = {
      formatter: function (value, context) {
        const index = context.dataIndex
        const nombre = context.dataset.label
        const peso = context.dataset.peso
        const volumen = value?.toFixed(2)
        const val = value / 100;
        if (val > 0.08) {
          return `${nombre}\n${volumen} mt3 ${peso === undefined ? "" : "\n" + peso[index] + " Kg"}`
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

    if (planRutasList !== 0) {
      const labelRutas = [];
      const capacidadesCarga = [];
      const metrosLibres = [];
      let label = [];
      let mt3_embarcados;

      planRutasList?.map((ruta) => {
        if (ruta.catalogoGuiasPlaneadas !== null && ruta.catalogoGuiasPlaneadasClientes !== null) {
          let mt3_embarcadosTot = [...ruta.catalogoGuiasPlaneadas, ...ruta.catalogoGuiasPlaneadasClientes];
          mt3_embarcados = mt3_embarcadosTot.reduce((total, guia) => total + guia.volumen, 0);
        } else {
          mt3_embarcados = 0;
          ruta.catalogoGuiasPlaneadas = [];
        }

        label.push("Planeado");
        labelRutas.push(label);
        label = [];
        volumenMaxRuta === 0 || volumenMaxRuta < mt3_embarcados ? capacidadesCarga.push(mt3_embarcados) : capacidadesCarga.push(volumenMaxRuta)
        metrosLibres.push(volumenMaxRuta - mt3_embarcados);
      })

      let sucursales = [];
      planRutasList?.map((ruta) => {
        if (ruta.id_viaje_act !== null) {
          if (ruta.catalogoGuiasEmbarcadas !== null) {
            mt3_embarcados = ruta.catalogoGuiasEmbarcadas.reduce((total, guia) => total + guia.volumen, 0);
            //obtener sucursales de las guias embarcadas
            sucursales = ruta.catalogoGuiasEmbarcadas.reduce((result, guia) => {
              const { sucursal_ubicacion_id, sucursal_ubicacion } = guia;
              const existent = result.find((item) => item.id === sucursal_ubicacion_id);

              if (!existent) {
                result.push({ id: sucursal_ubicacion_id, nombre: sucursal_ubicacion });
              }

              return result;
            }, []);
          } else {
            mt3_embarcados = 0;
            ruta.catalogoGuiasEmbarcadas = [];
          }

          label.push("Embarcado");
          labelRutas.push(label);
          label = [];
          volumenMaxRuta === 0 || volumenMaxRuta < mt3_embarcados ? capacidadesCarga.push(mt3_embarcados) : capacidadesCarga.push(volumenMaxRuta)
          metrosLibres.push(volumenMaxRuta - mt3_embarcados);
        }
      })

      let todasSucursales;
      let sucSinRepetir;
      if (sucursales.length > 0) {
        //obtnener todas las sucursales y que no se repitan
        todasSucursales = [...catalogoSucursales, ...sucursales]
        sucSinRepetir = Array.from(new Set(todasSucursales.map(JSON.stringify))).map(JSON.parse);
      } else {
        sucSinRepetir = [...catalogoSucursales];
      }

      const ConstruirEjeY = () => {
        const dataSetConstruido = [];
        let dataEjeY = [];
        let pesoXsucursal = [];
        dataSetConstruido.push({
          label: "Espacio libre",
          data: metrosLibres,
          backgroundColor: colorEspacioLibre,
          borderColor: colorEspacioLibreBorder,
          borderWidth: 2,
          datalabels: confDataLabels,
        })

        sucSinRepetir?.map((sucursalFinal, index) => {
          planRutasList.map((ruta) => {
            const guiasXsucursal = ruta.catalogoGuiasPlaneadas.filter(guia => guia.sucursal_ubicacion_id === sucursalFinal.id);
            const volumenXsucursal = guiasXsucursal.reduce((total, guia) => total + guia.volumen, 0);
            const pesoGuia = guiasXsucursal.reduce((total, guia) => total + guia.peso, 0);
            dataEjeY.push(volumenXsucursal);
            pesoXsucursal.push(pesoGuia.toFixed(2));

            if (ruta.catalogoGuiasEmbarcadas != null) {
              const guiasXsucursal = ruta.catalogoGuiasEmbarcadas.filter(guia => guia.sucursal_ubicacion_id === sucursalFinal.id);
              const volumenXsucursal = guiasXsucursal.reduce((total, guia) => total + guia.volumen, 0);
              const pesoGuia = guiasXsucursal.reduce((total, guia) => total + guia.peso, 0);
              dataEjeY.push(volumenXsucursal);
              pesoXsucursal.push(pesoGuia);
            }
          })

          dataSetConstruido.push({
            label: sucursalFinal.nombre,
            data: dataEjeY,
            backgroundColor: colores[index].color,
            borderColor: coloresBorder[index].color,
            borderWidth: 2,
            datalabels: confDataLabels,
            peso: pesoXsucursal
          })
          dataEjeY = [];
          pesoXsucursal = [];
        })

        catalogoClientes.map((cliente, index) => {
          planRutasList.map((ruta) => {
            const guiasXCliente = ruta.catalogoGuiasPlaneadasClientes.filter(guia => guia.idCliente === cliente.id);
            const volumenXcliente = guiasXCliente.reduce((total, guia) => total + guia.volumen, 0);
            const pesoGuia = guiasXCliente.reduce((total, guia) => total + guia.peso, 0);
            dataEjeY.push(volumenXcliente);
            pesoXsucursal.push(pesoGuia.toFixed(2));
          })
          dataSetConstruido.push({
            label: cliente.nombre,
            data: dataEjeY,
            backgroundColor: colores[index].color,
            borderColor: coloresBorder[index].color,
            borderWidth: 2,
            datalabels: confDataLabels,
            peso: pesoXsucursal
          })
          dataEjeY = [];
          pesoXsucursal = [];
        })

        return dataSetConstruido;
      }

      let totalVolMaxGrafica = Math.max(...capacidadesCarga);
      let maximoEjeX;
      if (totalVolMaxGrafica > volumenMaxRuta) {
        maximoEjeX = 3 + Math.max(...capacidadesCarga)
      } else {
        maximoEjeX = Math.max(...capacidadesCarga)
      }

      let myoptions = {
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
            text: `Ruta: ${nombreRuta}`,
            font: {
              size: 25
            }
          }
        },
        //barPercentage: porcentajeAnchoBarra,
        scales: {
          x: {
            stacked: true,
            beginAtZero: false, // Asegura que el eje X no empiece en 0
            min: 0, // Establece el mínimo del eje X en 100
            max: maximoEjeX,
            grid: {
              //Cambia el color de la linea de la grafica a rojo cuando se sobrepasa el volumen
              color: function (context) {
                if (totalVolMaxGrafica > volumenMaxRuta) {
                  if (context.tick.value === volumenMaxRuta) {
                    return "red"
                  }
                }
                return "#e7e7ea"
              },
              lineWidth: function (context) {
                if (context.tick.value === volumenMaxRuta && totalVolMaxGrafica > volumenMaxRuta) {
                  return 3
                }
                return 1
              }
            },
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
          <div className="container-graph" style={{ height: "460px" }}>
            <Bar
              data={data}
              options={myoptions}
            />
          </div>
          {
            totalVolMaxGrafica > volumenMaxRuta ?
              <div className="alert alert-danger mt-2 fs-5" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i> Sobrepasaste el límite del volumen
              </div>
              : <></>
          }
        </>
      )
    } else {
      return <h4>No hay datos para mostrar</h4>
    }
  } else {
    //No hay clientes
    //Configuración de los datalabels
    const confDataLabels = {
      formatter: function (value, context) {
        const index = context.dataIndex
        const nombre = context.dataset.label
        const peso = context.dataset.peso
        const volumen = value?.toFixed(2)
        const val = value / 100;
        if (val > 0.08) {
          return `${nombre}\n${volumen} mt3 ${peso === undefined ? "" : "\n" + peso[index] + " Kg"}`
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

    if (planRutasList !== 0) {
      const labelRutas = [];
      const capacidadesCarga = [];
      const metrosLibres = [];
      let label = [];
      let mt3_embarcados;

      planRutasList?.map((ruta) => {
        if (ruta.catalogoGuiasPlaneadas !== null) {
          mt3_embarcados = ruta.catalogoGuiasPlaneadas.reduce((total, guia) => total + guia.volumen, 0);
        } else {
          mt3_embarcados = 0;
          ruta.catalogoGuiasPlaneadas = [];
        }

        label.push("Planeado");
        labelRutas.push(label);
        label = [];
        volumenMaxRuta === 0 || volumenMaxRuta < mt3_embarcados ? capacidadesCarga.push(mt3_embarcados) : capacidadesCarga.push(volumenMaxRuta)
        metrosLibres.push(volumenMaxRuta - mt3_embarcados);
      })

      let sucursales = [];
      planRutasList?.map((ruta) => {
        if (ruta.id_viaje_act !== null) {
          if (ruta.catalogoGuiasEmbarcadas !== null) {
            mt3_embarcados = ruta.catalogoGuiasEmbarcadas.reduce((total, guia) => total + guia.volumen, 0);
            //obtener sucursales de las guias embarcadas
            sucursales = ruta.catalogoGuiasEmbarcadas.reduce((result, guia) => {
              const { sucursal_ubicacion_id, sucursal_ubicacion } = guia;
              const existent = result.find((item) => item.id === sucursal_ubicacion_id);

              if (!existent) {
                result.push({ id: sucursal_ubicacion_id, nombre: sucursal_ubicacion });
              }

              return result;
            }, []);
          } else {
            mt3_embarcados = 0;
            ruta.catalogoGuiasEmbarcadas = [];
          }

          label.push("Embarcado");
          labelRutas.push(label);
          label = [];
          volumenMaxRuta === 0 || volumenMaxRuta < mt3_embarcados ? capacidadesCarga.push(mt3_embarcados) : capacidadesCarga.push(volumenMaxRuta)
          metrosLibres.push(volumenMaxRuta - mt3_embarcados);
        }
      })

      let todasSucursales;
      let sucSinRepetir;
      if (sucursales.length > 0) {
        //obtnener todas las sucursales y que no se repitan
        todasSucursales = [...catalogoSucursales, ...sucursales]
        sucSinRepetir = Array.from(new Set(todasSucursales.map(JSON.stringify))).map(JSON.parse);
      } else {
        sucSinRepetir = [...catalogoSucursales];
      }

      const ConstruirEjeY = () => {
        const dataSetConstruido = [];
        let dataEjeY = [];
        let pesoXsucursal = [];
        dataSetConstruido.push({
          label: "Espacio libre",
          data: metrosLibres,
          backgroundColor: colorEspacioLibre,
          borderColor: colorEspacioLibreBorder,
          borderWidth: 2,
          datalabels: confDataLabels,
        })
        sucSinRepetir?.map((sucursalFinal, index) => {
          planRutasList.map((ruta) => {
            const guiasXsucursal = ruta.catalogoGuiasPlaneadas.filter(guia => guia.sucursal_ubicacion_id === sucursalFinal.id);
            const volumenXsucursal = guiasXsucursal.reduce((total, guia) => total + guia.volumen, 0);
            const pesoGuia = guiasXsucursal.reduce((total, guia) => total + guia.peso, 0);
            dataEjeY.push(volumenXsucursal);
            pesoXsucursal.push(pesoGuia.toFixed(2));

            if (ruta.catalogoGuiasEmbarcadas != null) {
              const guiasXsucursal = ruta.catalogoGuiasEmbarcadas.filter(guia => guia.sucursal_ubicacion_id === sucursalFinal.id);
              const volumenXsucursal = guiasXsucursal.reduce((total, guia) => total + guia.volumen, 0);
              const pesoGuia = guiasXsucursal.reduce((total, guia) => total + guia.peso, 0);
              dataEjeY.push(volumenXsucursal);
              pesoXsucursal.push(pesoGuia);
            }
          })
          dataSetConstruido.push({
            label: sucursalFinal.nombre,
            data: dataEjeY,
            backgroundColor: colores[index].color,
            borderColor: coloresBorder[index].color,
            borderWidth: 2,
            datalabels: confDataLabels,
            peso: pesoXsucursal
          })
          dataEjeY = [];
          pesoXsucursal = [];
        })

        return dataSetConstruido;
      }

      let totalVolMaxGrafica = Math.max(...capacidadesCarga);
      let maximoEjeX;
      if (totalVolMaxGrafica > volumenMaxRuta) {
        maximoEjeX = 3 + Math.max(...capacidadesCarga)
      } else {
        maximoEjeX = Math.max(...capacidadesCarga)
      }

      let myoptions = {
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
            text: `Ruta: ${nombreRuta}`,
            font: {
              size: 25
            }
          }
        },
        //barPercentage: porcentajeAnchoBarra,
        scales: {
          x: {
            stacked: true,
            beginAtZero: false, // Asegura que el eje X no empiece en 0
            min: 0, // Establece el mínimo del eje X en 100
            max: maximoEjeX,
            grid: {
              //Cambia el color de la linea de la grafica a rojo cuando se sobrepasa el volumen
              color: function (context) {
                if (totalVolMaxGrafica > volumenMaxRuta) {
                  if (context.tick.value === volumenMaxRuta) {
                    return "red"
                  }
                }
                return "#e7e7ea"
              },
              lineWidth: function (context) {
                if (context.tick.value === volumenMaxRuta && totalVolMaxGrafica > volumenMaxRuta) {
                  return 3
                }
                return 1
              }
            },
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
          <div className="container-graph" style={{ height: "460px" }}>
            <Bar
              data={data}
              options={myoptions}
            />
          </div>
          {
            totalVolMaxGrafica > volumenMaxRuta ?
              <div className="alert alert-danger mt-2 fs-5" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i> Sobrepasaste el límite del volumen
              </div>
              : <></>
          }
        </>
      )
    } else {
      return <h4>No hay datos para mostrar</h4>
    }
  }

}
