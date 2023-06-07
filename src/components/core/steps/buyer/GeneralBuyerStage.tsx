import React  from 'react';
import DryingStage from './DryingBuyerStage';
import StorageStage from './StorageBuyerStage';
import ProducersStage from './ProducersBuyerStage';
import PulpStage from './PulpBuyerStage';
import FermentationStage from './FermentationBuyerStage';
import { UserRole } from '@/util/constants/users';
import { BuyerBatchInfo } from '@/util/models/Batch/BuyerBatchInfo';
import Image from 'next/image';

interface GeneralStageProps {
    name: string;
    index: number;
    img: string;
    background: string;
    userRole: UserRole;
    batch: BuyerBatchInfo;
}

const GeneralBuyerStage = (props: GeneralStageProps) => {

    return (
      <>
        <div style={{background: props.background}}>
            <div className="batch__stage-container">
                <div className="batch__stage-name">
                    <p>{props.name} - {props.index}</p>
                </div>
                <div className="batch__stage-info-container">
                    <div className="batch__stage-info">
                    {
                        {
                            1: <ProducersStage stats={Object.values(props.batch.producersPhase)} />,
                            2: <PulpStage stats={Object.values(props.batch.pulpsPhase)} />,
                            3: <FermentationStage stats={Object.values(props.batch.fermentationPhase)} />,
                            4: <DryingStage stats={Object.values(props.batch.dryingPhase)} />,
                            5: <StorageStage stats={Object.values(props.batch.storagePhase)} />
                        }[props.index]
                    }
                    </div>
                </div>
                <Image className="batch__stage-image" src={props.img} alt={props.name}/>
            </div>
        </div>
      </>
    );
  };
  
export default GeneralBuyerStage;
  
