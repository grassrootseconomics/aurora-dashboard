import { useTranslation } from 'react-i18next';

interface StageProps {
    stats: number[];
}

const ProducersStage = (props: StageProps) => {
    const { t } = useTranslation('translation');
  
    return (
      <>
        <ul>
                
            <li>{props.stats[0]} {t('single_batch.no_producers_batch')} </li>
            <li>{props.stats[1]} {t('single_batch.no_cocoa_hectares')}</li>
            <li>{props.stats[2]} {t('single_batch.conservation_hectares')}</li>
        </ul>
      </>
    );
  };
  
  export default ProducersStage;
  