import GeneralBuyerStage from '@/components/core/steps/buyer/GeneralBuyerStage';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { BackButton } from '@/components/core/buttons/BackButton';
import AssociationInfo from '@/components/core/cards/AssociationInfo';
import React, { useEffect, useState } from 'react';
import { UserRole } from '@/util/constants/users';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { getBatchByCode, getBatchByCodeForBuyers } from '@/services/batch';
import { BuyerBatchInfo } from '@/util/models/Batch/BuyerBatchInfo';
import GeneralStage from '@/components/core/steps/associations/GeneralStage';
import { BatchInfo } from '@/util/models/Batch/BatchInfo';

const BatchDetailsPage = () => {
    const { t } = useTranslation('translation');
    const router = useRouter();
    const { id }  = router.query;
    const [ buyerBatch, setBuyerBatch] = useState<BuyerBatchInfo>();
    const [ batch, setBatch] = useState<BatchInfo>();
    const { userRole } = useUserAuthContext();

    useEffect(() => {
      if(!id) return;
      switch(userRole) {
        case UserRole.buyer:
          getBatchByCodeForBuyers(id as string).then(b => {
            setBuyerBatch(b)
          })
          return; 
        case UserRole.project:
          getBatchByCode(id as string).then(b => {
            setBatch(b)
          }) 
          return; 
        case UserRole.association:
          getBatchByCode(id as string).then(b => {
            setBatch(b)
          }) 
          return; 
      }
    }, [userRole, id])

    return (
      <>
        <div className="batch__details-title">
          <BackButton/> {t("single_batch.title")} {id}
        </div>
        <div className="batch__details-container">
          {
            buyerBatch && userRole == UserRole.buyer ? 
              <>
                <div className="batch__details-association">
                  <AssociationInfo batchCode={id as string} association={buyerBatch.association}/>
                </div>
                <div className="batch__details">
                    <GeneralBuyerStage batch={buyerBatch} name="Storage" index={5} img={'/assets/batch/Storage.jpg'} background="#f6aa62" userRole={userRole}/>
                    <GeneralBuyerStage batch={buyerBatch} name="Drying" index={4} img={'/assets/batch/Drying.jpg'} background="#f39a1a" userRole={userRole}/>
                    <GeneralBuyerStage batch={buyerBatch} name="Fermentation" index={3} img={'/assets/batch/Fermentation.jpg'} background="#f1852d" userRole={userRole}/>
                    <GeneralBuyerStage batch={buyerBatch} name="Pulp" index={2} img={'/assets/batch/Pulp.jpg'} background="#d0741a" userRole={userRole}/>
                    <GeneralBuyerStage batch={buyerBatch} name="Producers" index={1} img={'/assets/batch/Producers.jpg'} background="#93471b" userRole={userRole}/>
                </div>
              </> 
                : batch && userRole == UserRole.project ?
                  <div className="batch__details"> 
                    {
                      batch.salesPhase.buyerName ?
                        <GeneralStage batch={batch} name="Sales" index={5} background="#7d2113" userRole={userRole}/> : ""
                    }
                      <GeneralStage batch={batch} name="Storage" index={4} img={'/assets/batch/Storage.jpg'} background="#f6aa62" userRole={userRole}/>
                      <GeneralStage batch={batch} name="Drying" index={3} img={'/assets/batch/Drying.jpg'} background="#f39a1a" userRole={userRole}/>
                      <GeneralStage batch={batch} name="Fermentation" index={2} img={'/assets/batch/Fermentation.jpg'} background="#f1852d" userRole={userRole}/>
                      <GeneralStage batch={batch} name="Pulp" index={1} img={'/assets/batch/Pulp.jpg'} background="#d0741a" userRole={userRole}/>
                      <GeneralStage batch={batch} name="Producers" index={0} img={'/assets/batch/Producers.jpg'} background="#93471b" userRole={userRole}/>
                  </div>
                : batch && userRole == UserRole.association ?
                  <div className="batch__details">
                    {
                      batch.salesPhase.buyerName ?
                        <GeneralStage batch={batch} name="Sales" index={5} background="#7d2113" userRole={userRole}/> : ""
                    }
                      <GeneralStage batch={batch} name="Storage" index={4} img={'/assets/batch/Storage.jpg'} background="#f6aa62" userRole={userRole}/>
                      <GeneralStage batch={batch} name="Drying" index={3} img={'/assets/batch/Drying.jpg'} background="#f39a1a" userRole={userRole}/>
                      <GeneralStage batch={batch} name="Fermentation" index={2} img={'/assets/batch/Fermentation.jpg'} background="#f1852d" userRole={userRole}/>
                      <GeneralStage batch={batch} name="Pulp" index={1} img={'/assets/batch/Pulp.jpg'} background="#d0741a" userRole={userRole}/>
                      <GeneralStage batch={batch} name="Producers" index={0} img={'/assets/batch/Producers.jpg'} background="#93471b" userRole={userRole}/>
                  </div> : ""
          }  
        </div>
        
      </>
    );
  };
  
  export default BatchDetailsPage;
  