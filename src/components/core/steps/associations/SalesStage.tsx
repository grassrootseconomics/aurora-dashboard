import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface StageProps {
    stats: number[];
    editMode: boolean;
    index: number;
    update: any;
}

const SalesStage = (props: StageProps) => {
    const { t } = useTranslation('translation');

    useEffect(() => {
    }, props.stats)

    function updateFields(event: any, index: number) {
      props.stats[index] = event.target.value;
      props.update(props.stats, props.index);
    }
  
    return (
      <>
        <ul>
            <li>{t('single_batch.buyer_name')} <input onChange={(event) => updateFields(event, 1)} className="batch__stage-input--large" defaultValue={props.stats[1]} disabled={!props.editMode}/></li>
            <li>{t('single_batch.lot_code')} <input onChange={(event) => updateFields(event, 2)} className="batch__stage-input--large" defaultValue={props.stats[2]} disabled={!props.editMode}/></li>
            <li>{t('single_batch.negotiation_type')} <input onChange={(event) => updateFields(event, 3)} className="batch__stage-input--large" defaultValue={props.stats[3]} disabled={!props.editMode}/></li>
            <li>{t('single_batch.negotiation_terms')} <input onChange={(event) => updateFields(event, 4)} defaultValue={props.stats[4]} disabled={!props.editMode}/></li>
            <li>{t('single_batch.destination')} <input onChange={(event) => updateFields(event, 5)} className="batch__stage-input--large" defaultValue={props.stats[5]} disabled={!props.editMode}/></li>
            <li>{t('single_batch.currency')} <input onChange={(event) => updateFields(event, 6)} defaultValue={props.stats[6]} disabled={!props.editMode}/></li>
            <li>{t('single_batch.price_kg')} <input onChange={(event) => updateFields(event, 7)} defaultValue={props.stats[7]} disabled={!props.editMode}/></li>
            <li>{t('single_batch.total_value')} <input onChange={(event) => updateFields(event, 8)} defaultValue={props.stats[8]} disabled={!props.editMode}/></li>
            <li>{t('single_batch.negotiation_date')} <input onChange={(event) => updateFields(event, 9)} className="batch__stage-input--large" defaultValue={props.stats[9]} disabled={!props.editMode}/></li>
        </ul>
      </>
    );
  };
  
  export default SalesStage;
  