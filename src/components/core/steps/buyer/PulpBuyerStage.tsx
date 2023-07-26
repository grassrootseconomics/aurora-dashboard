import { useTranslation } from 'react-i18next';

interface StageProps {
  stats: number[];
}

const PulpStage = (props: StageProps) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <ul>
        <li>
          {t('single_batch.cocoa_quality')} {props.stats[0]}
        </li>
        <li>
          {t('single_batch.cocoa_status')} {props.stats[1]}
        </li>
      </ul>
    </>
  );
};

export default PulpStage;
