import { useTranslation } from 'react-i18next';

interface StageProps {
    stats: number[];
}

const PulpStage = (props: StageProps) => {
    const { t } = useTranslation('translation');
  
    return (
      <>
        <ul>
            <li>{t('single_batch.harvesting_date')} {props.stats[0]}</li>
            <li>{t('single_batch.cocoa_quality')} {props.stats[1]}</li>
            <li>{t('single_batch.cocoa_status')} {props.stats[2]}</li>
            <li>{t('single_batch.batch_genetics')} {props.stats[3]}</li>
            <li>{t('single_batch.pulp_kg')} {props.stats[4]}</li>
            <li>{t('single_batch.setting_price_kg')} {props.stats[5]}</li>
            <li>{t('single_batch.total_selling_price')} {props.stats[4] * props.stats[5]} </li>
        </ul>
      </>
    );
  };
  
  export default PulpStage;
  