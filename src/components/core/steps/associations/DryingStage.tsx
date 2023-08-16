import { useTranslation } from 'react-i18next';

interface StageProps {
  stats: number[];
  editMode: boolean;
  index: number;
  update: any;
}

const DryingStage = (props: StageProps) => {
  const { t } = useTranslation('translation');

  function updateFields(event: any, index: number) {
    props.stats[index] = event.target.value;
    props.update(props.stats, props.index);
  }
  return (
    <>
      <ul>
        <li>
          {t('single_batch.start_date_drying')}{' '}
          <input
            onChange={(event) => updateFields(event, 1)}
            className="batch__stage-input--large"
            defaultValue={props.stats[1]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.days_drying')}{' '}
          <input
            onChange={(event) => updateFields(event, 2)}
            defaultValue={props.stats[2]}
            disabled={!props.editMode}
          />
        </li>
        <li>
          {t('single_batch.grain_humidity')}{' '}
          <input
            onChange={(event) => updateFields(event, 3)}
            defaultValue={props.stats[3]}
            disabled={!props.editMode}
          />
        </li>
      </ul>
    </>
  );
};

export default DryingStage;
