import { useTranslation } from 'react-i18next';

interface StageProps {
  stats: number[];
}

const ProducersStage = (props: StageProps) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <ul>
        <li>{`${t('single_batch.no_producers_batch')} ${props.stats[0]}`}</li>
        <li>{`${t('single_batch.no_cocoa_hectares')} ${props.stats[1]}`}</li>
        <li>
          {`${t('single_batch.conservation_hectares')} ${props.stats[2]}`}
        </li>
      </ul>
    </>
  );
};

export default ProducersStage;
