import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import React, { useEffect, useRef, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditNoteIcon from '@mui/icons-material/EditNote';

import {
  updateDryingPhase,
  updateFermentationPhase,
  updateSalesPhase,
  updateStoragePhase,
} from '@/services/batch';
import { UserRole } from '@/util/constants/users';
import { BatchInfo } from '@/util/models/Batch/BatchInfo';

import DryingStage from './DryingStage';
import FermentationStage from './FermentationStage';
import ProducersStage from './ProducersStage';
import PulpStage from './PulpStage';
import SalesStage from './SalesStage';
import StorageStage from './StorageStage';

interface GeneralStageProps {
  name: string;
  index: number;
  img?: string;
  background: string;
  userRole: UserRole;
  batch: BatchInfo;
}

const GeneralStage = (props: GeneralStageProps) => {
  const { t } = useTranslation('translation');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [batchStats, setBatchStats] = useState<number[][]>();

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setEditMode(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  function cancelEdit() {
    initBatchStats();
    setEditMode(false);
  }

  function saveMethod() {
    if (!batchStats) return;

    switch (props.index) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        updateFermentationPhase(batchStats[2]);
        setEditMode(false);
        return;
      case 3:
        updateDryingPhase(batchStats[3]);
        setEditMode(false);
        return;
      case 4:
        updateStoragePhase(batchStats[4]);
        setEditMode(false);
        return;
      case 5:
        updateSalesPhase(batchStats[5]);
        setEditMode(false);
        return;
    }
  }

  function handleStage(data: any[], stage: number) {
    if (!batchStats) return;

    switch (stage) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        batchStats[2] = data;
        return;
      case 3:
        batchStats[3] = data;
        return;
      case 4:
        batchStats[4] = data;
        return;
      case 5:
        batchStats[5] = data;
        return;
    }
  }

  function initBatchStats() {
    const batchStats = [
      Object.values(props.batch.producersPhase),
      Object.values(props.batch.pulpsPhase),
      Object.values(props.batch.fermentationPhase),
      Object.values(props.batch.dryingPhase),
      Object.values(props.batch.storagePhase),
      Object.values(props.batch.salesPhase),
    ];
    setBatchStats(batchStats);
  }

  useEffect(() => {
    initBatchStats();
  }, [props.batch]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div ref={wrapperRef} style={{ background: props.background }}>
        <div className="batch__stage-container">
          <div className="batch__stage-name">
            <p>
              {props.name} - {props.index}
            </p>
          </div>
          {editMode ? (
            <div className="batch__stage-edit">
              <div
                onClick={() => {
                  cancelEdit();
                }}
              >
                <CancelIcon /> {t('buttons.cancel_edit')}
              </div>
              <div
                onClick={() => {
                  saveMethod();
                }}
              >
                <AddCircleIcon /> {t('buttons.save')}
              </div>
            </div>
          ) : props.index > 1 && props.userRole == UserRole.association ? (
            <div className="batch__stage-edit">
              <div
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                <EditNoteIcon />
              </div>
            </div>
          ) : (
            <div className="batch__stage-edit"></div>
          )}

          <div className="batch__stage-info-container">
            <div className="batch__stage-info batch__stage-info--edit">
              {batchStats
                ? {
                    0: <ProducersStage stats={batchStats[0]} />,
                    1: <PulpStage stats={batchStats[1]} />,
                    2: (
                      <FermentationStage
                        batchCode={props.batch.code}
                        index={2}
                        stats={batchStats[2]}
                        update={handleStage}
                        editMode={editMode}
                      />
                    ),
                    3: (
                      <DryingStage
                        index={3}
                        stats={batchStats[3]}
                        update={handleStage}
                        editMode={editMode}
                      />
                    ),
                    4: (
                      <StorageStage
                        index={4}
                        stats={batchStats[4]}
                        update={handleStage}
                        editMode={editMode}
                      />
                    ),
                    5: (
                      <SalesStage
                        index={5}
                        stats={batchStats[5]}
                        update={handleStage}
                        editMode={editMode}
                      />
                    ),
                  }[props.index]
                : ''}
            </div>
          </div>
          {props.img ? (
            <Image
              width={350}
              height={100}
              className="batch__stage-image"
              src={props.img}
              alt={props.name}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralStage;
