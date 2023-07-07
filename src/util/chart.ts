import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
  } from 'chart.js';

ChartJS.register(
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.color = '#fff';
 

export default ChartJS;
  