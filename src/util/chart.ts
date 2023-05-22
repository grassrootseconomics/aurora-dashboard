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
  } from 'chart.js';

ChartJS.register(
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.color = '#fff';
 

export default ChartJS;
  