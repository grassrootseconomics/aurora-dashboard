import { useTranslation } from 'react-i18next';

interface StageProps {
    stats: number[];
}

const DryingStage = (props: StageProps) => {
    const { t } = useTranslation('translation');
  
    return (
      <>
        <ul>
            <li>{t('single_batch.days_drying')} {props.stats[0]}</li>
            <li>{t('single_batch.grain_humidity')} {props.stats[1]}</li>
        </ul> 
      </>
    );
  };
  
  export default DryingStage;
  