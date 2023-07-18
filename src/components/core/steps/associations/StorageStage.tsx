import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';

interface StageProps {
  stats: any[];
  editMode: boolean;
  index: number;
  update: any;
}

const StorageStage = (props: StageProps) => {
  const { t } = useTranslation('translation');

  useEffect(() => {}, props.stats);

  function updateFields(event: any, index: number) {
    props.stats[index] = event.target.value;
    props.update(props.stats, props.index);
  }

  return (
    <>
      <ul>
        <li>
          {t('single_batch.day_went_storage')}{' '}
          <input
            className="batch__stage-input--large"
            onChange={(event) => updateFields(event, 1)}
            defaultValue={props.stats[1]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.batch_net_weight')}{' '}
          <input
            onChange={(event) => updateFields(event, 2)}
            defaultValue={props.stats[2]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.batch_conversion_factor')}{' '}
          <input
            onChange={(event) => updateFields(event, 3)}
            defaultValue={props.stats[3]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.batch_fermentation')}{' '}
          <input
            onChange={(event) => updateFields(event, 4)}
            defaultValue={props.stats[4]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.batch_grain_index')}{' '}
          <input
            onChange={(event) => updateFields(event, 5)}
            defaultValue={props.stats[5]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.batch_sensory_profile')}{' '}
          <input
            style={{ maxWidth: '100px' }}
            onChange={(event) => updateFields(event, 6)}
            defaultValue={props.stats[6]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.batch_score')}{' '}
          <input
            style={{ maxWidth: '30px' }}
            onChange={(event) => updateFields(event, 7)}
            defaultValue={props.stats[7]}
            disabled={!props.editMode}
          />
        </li>
      </ul>
    </>
  );
};

export default StorageStage;
