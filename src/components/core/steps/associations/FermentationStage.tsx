import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface StageProps {
  stats: number[];
  editMode: boolean;
  batchCode: string;
  index: number;
  update: any;
}

const FermentationStage = (props: StageProps) => {
  const { t } = useTranslation('translation');
  const router = useRouter();

  function updateFields(event: any, index: number) {
    props.stats[index] = event.target.value;
    props.update(props.stats, props.index);
  }

  return (
    <>
      <ul>
        <li>
          {t('single_batch.cocoa_type')}{' '}
          <input
            onChange={(event) => updateFields(event, 1)}
            className="batch__stage-input--large"
            defaultValue={props.stats[1]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.fermentation_start')}{' '}
          <input
            onChange={(event) => updateFields(event, 2)}
            className="batch__stage-input--large"
            defaultValue={props.stats[2]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.batch_genetics')}{' '}
          <input
            onChange={(event) => updateFields(event, 3)}
            className="batch__stage-input--large"
            defaultValue={props.stats[3]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.bx_grain')}{' '}
          <input
            onChange={(event) => updateFields(event, 4)}
            defaultValue={props.stats[4]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.batch_weight')}{' '}
          <input
            onChange={(event) => updateFields(event, 5)}
            defaultValue={props.stats[5]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.relative_humidity')}{' '}
          <input
            onChange={(event) => updateFields(event, 6)}
            defaultValue={props.stats[6]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.drained_hours')}{' '}
          <input
            onChange={(event) => updateFields(event, 7)}
            defaultValue={props.stats[7]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.total_flips')}{' '}
          <input
            onChange={(event) => updateFields(event, 8)}
            defaultValue={props.stats[8]}
            disabled={true}
          />
        </li>
        <li>
          {t('single_batch.total_fermentation_days')}{' '}
          <input
            onChange={(event) => updateFields(event, 9)}
            defaultValue={props.stats[9]}
            disabled={!props.editMode}
          />
        </li>
        <button
          onClick={() =>
            router.push(`/batches/fermentation-model/${props.batchCode}`)
          }
          className="action-button"
        >
          {t('fermentation_model.title')}
        </button>
      </ul>
    </>
  );
};

export default FermentationStage;
