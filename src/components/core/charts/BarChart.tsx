import { Bar } from 'react-chartjs-2';

import { Dataset } from '@/util/models/Dataset';
import { useTranslation } from 'react-i18next';

interface ChartProps {
  backgroundColor: string;
  title: string;
  datasets: Dataset[];
}

const BarChart = (props: ChartProps) => {
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
        label: dataset.label,
        data: dataset.datas,
        backgroundColor: dataset.color,
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
  };

  return (
    <div
      className="chart__container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <Bar className="dashboard__chart" options={options} data={data} />
    </div>
  );
};

export default BarChart;
