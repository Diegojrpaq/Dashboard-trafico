import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



let beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 35];
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre"];
let myoptions = {
    responsive: true,
    animation: true,
    plugins: {
        legend: {
            display: false
        }
    },
    sacles: {
        y: {
            min: -25,
            max: 100
        },
        x: {
            ticks: {
                color: 'rgb(0,220.195)'
            }
        }
    }
};

let dataset = {
    labels: meses,
    datasets: [
        {
            label: '',
            data: beneficios,
            tension: .4,
            fill: true,
            borderColor: 'rgb(160, 235, 22)',
            backgroundColor: 'rgb(160, 235, 22, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgb(45, 214, 4)',
            pointBackgrounColor: 'rgb(45, 214, 4)'

        }
    ]
}

export default function Graficalinea() {
    return <Line data={dataset} options={myoptions}></Line>
};