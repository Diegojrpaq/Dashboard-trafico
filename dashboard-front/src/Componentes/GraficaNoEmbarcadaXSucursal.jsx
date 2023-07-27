
import { Bar } from 'react-chartjs-2';
import catalogoColores from '../Data/CatalogoColores.json'
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



export default function GraficaMt3PorSucursal(props) {
    /* Variables de Estilo  */
    const colores = catalogoColores.colores
    const coloresBorder = catalogoColores.coloresBorder
 
        
    

    /* Variables de Estilo  */

    const Destino = props.destino;
    let nameSucursales = [];
    let totalVentaMt3 = [];

    Destino.sucursales.map((Sucursal, index) => {
        nameSucursales[index] = Sucursal.nombre;
        totalVentaMt3[index] = Sucursal.total_mt3_sucursal;
    })

    const ConstruirEjeY = () => {
        const dataSetConstruido = [];
        let dataEjeY;
        for (let i = 0; i < Destino.mt3_vendidos_por_destino.length; i++) {
            dataEjeY = Destino.sucursales.map((Sucursal) => {
               
                return Sucursal.mt3_por_destino[i].Mt3_en_piso
            })
            dataSetConstruido.push({
                label: Destino.mt3_vendidos_por_destino[i].Destino,
                data: dataEjeY,
                backgroundColor: colores[i].color,
                borderColor: coloresBorder[102].color,
                borderWidth: 1
            })
          
        }
        return dataSetConstruido;
    }

    let maximoEjeX =10+ Math.max(...totalVentaMt3);
   
    
    
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
        labels: nameSucursales,
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
}



/* <?php
define('GLPI_CONFIG_DIR', './etc/glpi');
require './etc/glpi/local_define.php';
if(file_exists('/etc/glpi/config_db.php')){
echo "existo";
}else{
echo "no existo";
}
echo "console.log('estamos adentro del archivo de configuracion')";
echo GLPI_CONFIG_DIR;
if (file_exists(GLPI_CONFIG_DIR . '/local_define.php')) {
   
echo "console.log('estamos adentro ')";
} */