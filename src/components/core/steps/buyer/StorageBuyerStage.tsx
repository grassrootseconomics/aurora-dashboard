import { useTranslation } from 'react-i18next';

interface StageProps {
    stats: number[];
}

const StorageStage = (props: StageProps) => {
    const { t } = useTranslation('translation');
  
    return (
      <>
        <ul>
            <li>{t('single_batch.batch_net_weight')} {props.stats[0]}</li>
            <li>{t('single_batch.batch_conversion_factor')} {props.stats[1]}</li>
            <li>{t('single_batch.batch_fermentation')} {props.stats[2]}</li>
            <li>{t('single_batch.batch_grain_index')} {props.stats[3]}</li>
        </ul> 
      </>
    );
  };
  
  export default StorageStage;
  