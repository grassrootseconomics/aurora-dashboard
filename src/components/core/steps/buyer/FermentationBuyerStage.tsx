import { useTranslation } from 'react-i18next';

interface StageProps {
  stats: number[];
}

const FermentationStage = (props: StageProps) => {
  const { t } = useTranslation('translation');
  return (
    <>
      <ul>
        <li>
          {t('single_batch.batch_genetics')}{' '}
          {t(`single_batch.cacao_genetic.${props.stats[0]}`) !==
          `single_batch.cacao_genetic.${props.stats[0]}`
            ? t(`single_batch.cacao_genetic.${props.stats[0]}`)
            : props.stats[0]}
        </li>
        <li>
          {t('single_batch.bx_grain')} {props.stats[1]}
        </li>
        <li>
          {t('single_batch.initial_t')} {props.stats[2]}
        </li>
        <li>
          {t('single_batch.room_t')} {props.stats[3]}
        </li>
        <li>
          {t('single_batch.relative_humidity')} {props.stats[4]}
        </li>
        <li>
          {t('single_batch.drained_hours')} {props.stats[5]}
        </li>
        <li>
          {t('single_batch.total_flips')} {props.stats[6]}
        </li>
        <li>
          {t('single_batch.total_fermentation_days')} {props.stats[7]}
        </li>
      </ul>
    </>
  );
};

export default FermentationStage;
