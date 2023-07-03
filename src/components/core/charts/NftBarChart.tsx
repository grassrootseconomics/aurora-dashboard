import { Bar } from 'react-chartjs-2';
import { Dataset } from '@/util/models/Dataset';
import { useTranslation } from 'react-i18next';

interface ChartProps {
  dataset: Dataset;
}

const NftBarChart = (props: ChartProps) => {
  const { t } = useTranslation('translation');

  const labels = [
    t('producers.men'),
    t('producers.women'),
  ];

  const data = {
    labels,
    datasets: [{
      data: props.dataset.datas,
      backgroundColor: "#964415",
    }]
  };

  const options: any = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    aspectRatio: 1,
    scales: {
        y: { 
          ticks: {
            color: "black",
            font: {
              size: 18,
              weight: 600
            },
            beginAtZero: true
          }
        },
        x: {  
          ticks: {
            color: "black", 
            font: {
              size: 20,
              weight: 600
            },
            beginAtZero: true
          }
        }
      }
  };

  return (
      <Bar options={options} data={data} />
  );
};

export default NftBarChart;