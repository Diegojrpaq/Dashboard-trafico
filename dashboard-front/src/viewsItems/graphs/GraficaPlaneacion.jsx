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
  const colorEspacioLibre = catalogoColores.colores[100].color;
  const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
  const colores = catalogoColores.colores
  const coloresBorder = catalogoColores.coloresBorder;
  const nombreRuta = props.planRuta?.rutas[0]?.nombre

  const catalogoGuiasEmbarcadas = [
    {
      "numGuia": "PAT-7674",
      "id_sucursal": 55,
      "nombre_sucursal": "Patria",
      "volumen": 1.326,
      "peso": 539.6,
      "flete": 1849.42,
      "monto_seguro": 30,
      "subtotal": 2389.96
    },
    {
      "numGuia": "GUA-405709",
      "id_sucursal": 1,
      "nombre_sucursal": "Gonzalez Gallo",
      "volumen": 0.8,
      "peso": 130,
      "flete": 429,
      "monto_seguro": 30,
      "subtotal": 568.56
    },
    {
      "numGuia": "GUA-405707",
      "id_sucursal": 1,
      "nombre_sucursal": "Gonzalez Gallo",
      "volumen": 0.05,
      "peso": 10,
      "flete": 208.54,
      "monto_seguro": 30,
      "subtotal": 334.87
    },
    {
      "numGuia": "PER-85145",
      "id_sucursal": 5,
      "nombre_sucursal": "Perisur",
      "volumen": 1.255,
      "peso": 216,
      "flete": 1235.6,
      "monto_seguro": 30,
      "subtotal": 1347.23
    },
    {
      "numGuia": "GUA-405642",
      "id_sucursal": 1,
      "nombre_sucursal": "Gonzalez Gallo",
      "volumen": 0.053,
      "peso": 26.8,
      "flete": 278.05,
      "monto_seguro": 30,
      "subtotal": 408.55
    }
  ];
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

    let sucursales = [];
    planRutasList?.map((ruta) => {
      if(ruta.id_viaje_act !== null) {
        if (catalogoGuiasEmbarcadas !== null) {
          mt3_embarcados = catalogoGuiasEmbarcadas.reduce((total, guia) => total + guia.volumen, 0);
          //obtener sucursales de las guias embarcadas
          sucursales = catalogoGuiasEmbarcadas.reduce((result, guia) => {
            const { id_sucursal, nombre_sucursal } = guia;
            const existent = result.find((item) => item.id === id_sucursal);
    
            if (!existent) {
              result.push({ id: id_sucursal, nombre: nombre_sucursal });
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
        capacidadesCarga.push(ruta.Volumen_carga_maxima);
        metrosLibres.push(100 - mt3_embarcados);
      }
    })

    let todasSucursales;
    let sucSinRepetir;
    if(sucursales.length > 0) {
      //obtnener todas las sucursales y que no se repitan
      todasSucursales = [...catalogoSucursales, ...sucursales]
      sucSinRepetir = Array.from(new Set(todasSucursales.map(JSON.stringify))).map(JSON.parse);
    } else {
      sucSinRepetir =  [...catalogoSucursales];
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
          const volumenXsucursal = guiasXsucursal.reduce((total, guia) => total + guia.cotizacion_principal_volumen, 0);
          const pesoGuia = guiasXsucursal.reduce((total, guia) => total + guia.cotizacion_principal_peso, 0);
          dataEjeY.push(volumenXsucursal);
          pesoXsucursal.push(pesoGuia.toFixed(2));

          if (catalogoGuiasEmbarcadas != null) {
            const guiasXsucursal = catalogoGuiasEmbarcadas.filter(guia => guia.id_sucursal === sucursalFinal.id);
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
    const maximoEjeX = 100

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
        <div className="container-graph" style={{ height: "460px" }}>
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
