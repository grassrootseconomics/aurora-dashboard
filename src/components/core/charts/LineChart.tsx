import { Line } from 'react-chartjs-2';

import { Dataset } from '@/util/models/Dataset';
import { useTranslation } from 'react-i18next';

interface ChartProps {
  backgroundColor: string;
  title: string;
  datasets: Dataset[];
}

const LineChart = (props: ChartProps) => {
  const { t } = useTranslation('translation');

  const labels = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december")
  ];
  
  const data = {
    labels,
    datasets: props.datasets.map((dataset: Dataset) => {
      return {
        borderColor: dataset.color,
        label: dataset.label,
        data: dataset.datas,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
    borderColor: '',
  };

  return (
    <div
      className="chart__container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <Line className="dashboard__chart" options={options} data={data} />
    </div>
  );
};

export default LineChart;
