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
          {t('single_batch.cocoa_quality')}{' '}
          {t(`single_batch.cacao_quality.${props.stats[0]}`) !==
          `single_batch.cacao_quality.${props.stats[0]}`
            ? t(`single_batch.cacao_quality.${props.stats[0]}`)
            : props.stats[0]}
        </li>
        <li>
          {t('single_batch.cocoa_status')}{' '}
          {t(`single_batch.cacao_status.${props.stats[1]}`) !==
          `single_batch.cacao_status.${props.stats[1]}`
            ? t(`single_batch.cacao_status.${props.stats[1]}`)
            : props.stats[1]}
        </li>
      </ul>
    </>
  );
};

export default PulpStage;
