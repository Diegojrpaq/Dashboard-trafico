import React from 'react';
import catalogoColores from '../../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
import { CalcularAnchoBarra, ConvertirFecha } from '../../utileria/utils';
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
  const colorEspacioLibre = catalogoColores.colores[100].color;
  const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
  const colores = catalogoColores.colores
  const coloresBorder = catalogoColores.coloresBorder;
  const nombreRuta = props.planRuta?.rutas[0]?.nombre
  //Configuración de los datalabels
  const confDataLabels = {
    formatter: function (value, context) {
      const index = context.dataIndex
      const nombre = context.dataset.label
      const peso = context.dataset.peso
      const volumen = value.toFixed(2)
      if (value > 0) {
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
        mt3_embarcados = ruta.catalogoGuiasPlaneadas.reduce((total, guia) => total + guia.cotizacion_principal_volumen, 0);
      } else {
        mt3_embarcados = 0;
        ruta.catalogoGuiasPlaneadas = [];
      }

      label.push("Planeado");
      labelRutas.push(label);
      label = [];
      capacidadesCarga.push(ruta.Volumen_carga_maxima);
      metrosLibres.push(100 - mt3_embarcados);
    })

    planRutasList?.map((ruta) => {
      if (ruta.catalogoGuiasEmbarcadas !== null) {
        mt3_embarcados = ruta.catalogoGuiasEmbarcadas.reduce((total, guia) => total + guia.volumen, 0);
      } else {
        mt3_embarcados = 0;
        ruta.catalogoGuiasEmbarcadas = [];
      }

      label.push("Embarcado");
      labelRutas.push(label);
      label = [];
      capacidadesCarga.push(ruta.Volumen_carga_maxima);
      metrosLibres.push(100 - mt3_embarcados);
    })

  //  if(planRutasList.id_viaje_act != null) {
  //   planRutasList?.map((ruta) => {
  //     if (ruta.catalogoGuiasEmbarcadas !== null) {
  //       mt3_embarcados = ruta.catalogoGuiasEmbarcadas.reduce((total, guia) => total + guia.volumen, 0);
  //     } else {
  //       mt3_embarcados = 0;
  //       ruta.catalogoGuiasEmbarcadas = [];
  //     }

  //     label.push("Embarcado");
  //     labelRutas.push(label);
  //     label = [];
  //     capacidadesCarga.push(ruta.Volumen_carga_maxima);
  //     metrosLibres.push(ruta.Volumen_carga_maxima - mt3_embarcados);
  //   })
  //  }
    console.log(planRutasList.rutas?.Volumen_carga_max)

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
      catalogoSucursales?.map((sucursalFinal, index) => {
        planRutasList.map((ruta) => {
          const guiasXsucursal = ruta.catalogoGuiasPlaneadas.filter(guia => guia.sucursal_ubicacion_id === sucursalFinal.id);
          console.log(guiasXsucursal, sucursalFinal.nombre)
          const volumenXsucursal = guiasXsucursal.reduce((total, guia) => total + guia.cotizacion_principal_volumen, 0);
          const pesoGuia = guiasXsucursal.reduce((total, guia) => total + guia.cotizacion_principal_peso, 0);
          dataEjeY.push(volumenXsucursal);
          pesoXsucursal.push(pesoGuia.toFixed(2));

          // if (ruta.catalogoGuiasEmbarcadas != null) {
          //   const guiasXsucursal = ruta.catalogoGuiasEmbarcadas;
          //   console.log(guiasXsucursal, sucursalFinal.nombre)
          //   const volumenXsucursal = guiasXsucursal.reduce((total, guia) => total + guia.cotizacion_principal_volumen, 0);
          //   const pesoGuia = guiasXsucursal.reduce((total, guia) => total + guia.cotizacion_principal_peso, 0);
          //   dataEjeY.push(volumenXsucursal);
          //   pesoXsucursal.push(pesoGuia);
          // }
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
    const maximoEjeX = 10 + Math.max(...capacidadesCarga)
    //const { porcentajeAnchoBarra, heightGraph } = CalcularAnchoBarra(planRutasList?.catalogoGuiasPlaneadas?.length)

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
        <div className="container-graph" style={{ height: "500px" }}>
          <Bar
            data={data}
            options={myoptions}
          />
        </div>

      </>
    )
  } else {
    return <h4>No hay datos para mostrar</h4>
  }
}
