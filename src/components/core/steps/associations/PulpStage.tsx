import { useTranslation } from 'react-i18next';

interface StageProps {
  stats: number[];
}

const PulpStage = (props: StageProps) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <ul>
        <li>{`${t('single_batch.harvesting_date')} ${props.stats[0]}`}</li>
        <li>
          {`${t('single_batch.cocoa_quality')} 
          ${
            t(`single_batch.cacao_quality.${props.stats[1]}`) !==
            `single_batch.cacao_quality.${props.stats[1]}`
              ? t(`single_batch.cacao_quality.${props.stats[1]}`)
              : props.stats[1]
          }`}
        </li>
        <li>
          {`${t('single_batch.cocoa_status')} 
          ${
            t(`single_batch.cacao_status.${props.stats[2]}`) !==
            `single_batch.cacao_status.${props.stats[2]}`
              ? t(`single_batch.cacao_status.${props.stats[2]}`)
              : props.stats[2]
          }`}
        </li>
        <li>
          {`${t('single_batch.batch_genetics')} 
          ${
            t(`single_batch.cacao_genetic.${props.stats[3]}`) !==
            `single_batch.cacao_genetic.${props.stats[3]}`
              ? t(`single_batch.cacao_genetic.${props.stats[3]}`)
              : props.stats[3]
          }`}
        </li>
        <li>{`${t('single_batch.pulp_kg')} ${props.stats[4]}`}</li>
        <li>{`${t('single_batch.setting_price_kg')} ${props.stats[5]}`}</li>
        <li>
          {`${t('single_batch.total_selling_price')} 
          ${Math.round(props.stats[4] * props.stats[5])}`}
        </li>
      </ul>
    </>
  );
};

export default PulpStage;
