import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { useCallback, useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { BackButton } from '@/components/core/buttons/BackButton';
import { BatchButton } from '@/components/core/buttons/BatchButton';
import AssociationInfo from '@/components/core/cards/AssociationInfo';
import WalletModal from '@/components/core/modals/WalletModal';
import GeneralStage from '@/components/core/steps/associations/GeneralStage';
import GeneralBuyerStage from '@/components/core/steps/buyer/GeneralBuyerStage';
import { WEB_3 } from '@/config';
import { useUserAuthContext } from '@/providers/UserAuthProvider';
import {
  generateBatchSnapshotHash,
  getBatchByCode,
  getBatchByCodeForBuyers,
  updateBatchSnapshotHashWithSignerData,
} from '@/services/batch';
import { UserRole } from '@/util/constants/users';
import { BatchInfo } from '@/util/models/Batch/BatchInfo';
import { BuyerBatchInfo } from '@/util/models/Batch/BuyerBatchInfo';
import {
  useContractWrite,
  usePrepareContractWrite,
  useSignMessage,
} from 'wagmi';

import CERT_ABI from '../../contracts/abi-certificate-nft.json';

type CertificateNFTProps = {
  name: string;
  buyer: string;
  description: string;
  certification: string;
};

const BatchDetailsPage = () => {
  const { t } = useTranslation('translation');
  const router = useRouter();
  const { id } = router.query;
  const [buyerBatch, setBuyerBatch] = useState<BuyerBatchInfo>();
  const [batch, setBatch] = useState<BatchInfo>();
  const { userRole } = useUserAuthContext();
  const { signMessageAsync } = useSignMessage();
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);

  // Parametes for the mint.
  const [certificateProps, setCertificateProps] = useState<CertificateNFTProps>(
    {
      // NFT Name
      name: '',
      // NFT Buyer Wallet
      buyer: '',
      // NFT Description
      description: '',
      // NFT Certification
      certification: '',
    }
  );

  const [certName, setCertName] = useState('Dumy Data');
  const [certDescription, setCertDescription] = useState(
    'Description for the NFT.'
  );
  const [certKey, setCertKey] = useState('');
  const [certBuyer, setBuyer] = useState('');

  const { config } = usePrepareContractWrite({
    address: `0x${WEB_3.NFT_CONTRACT.split('0x').pop()}`,
    abi: CERT_ABI,
    functionName: 'mintTo',
    args: [certBuyer, certName, certDescription, [certKey]],
  });

  const { writeAsync } = useContractWrite(config);

  const handleOpenWalletModal = () => {
    setOpenWalletModal(true);
  };

  const handleCloseWalletModal = () => {
    setOpenWalletModal(false);
  };

  const handleConfirmWalletModal = (wallet: any) => {
    setBuyer(wallet);
  };

  /**
   *
   * Generate a Batch Snapshot.
   *
   * Hint: Correctly submitting the wallet should submit the mint.
   *
   */
  const generateBatchSnapshotCertificate = useCallback(async () => {
    try {
      if (id && writeAsync) {
        // Generate a new Snapshot fingerprint.
        // If one already exists
        const response = await generateBatchSnapshotHash(id.toString());
        // Sign the snapshot fingerprint.
        const signedFingerprint = await signMessageAsync({
          message: response.fingerprint,
        });
        const dateSigned = new Date();
        // Fetch the new certification of the batch fingerprint.
        const keyResult = await updateBatchSnapshotHashWithSignerData(
          id.toString(),
          {
            signedDataFingerprint: signedFingerprint,
            dataFingerprint: response.fingerprint,
            dateSigned,
          }
        );
        // Set
        setCertificateProps({
          ...certificateProps,
          certification: keyResult.key,
        });

        setCertKey(keyResult.key);

        const result = await writeAsync();

        console.log(result);

        // Show input wallet modal.
        handleOpenWalletModal();

        // If the input
        // Then you mint
        // You await for it to mint.
        // Once it finishes, you get the mint date.
        // You update the flow
      }
    } catch (err) {
      console.log(err);
    }
  }, [certificateProps, id, signMessageAsync, writeAsync]);

  useEffect(() => {
    if (!id) return;
    switch (userRole) {
      case UserRole.buyer:
        getBatchByCodeForBuyers(id as string).then((b) => {
          setBuyerBatch(b);
        });
        return;
      case UserRole.project:
        getBatchByCode(id as string).then((b) => {
          setBatch(b);
        });
        return;
      case UserRole.association:
        getBatchByCode(id as string).then((b) => {
          setBatch(b);
        });
        return;
    }
  }, [userRole, id]);

  /**
 * 
 *                 <Grid container justifyContent={'center'}>
                  <Grid item>
                    <BatchButton
                      action={() => {
                        // Hardcoded for now.
                        // Should just later.
                        setBuyer('0xcBDe28A47b6ae762B81a9Ba62b4F17a04D89646E');
                        generateBatchSnapshotCertificate();
                      }}
                      label={'Generate NFT'}
                    />
                  </Grid>
                </Grid>
 * 
 */

  useEffect(() => {
    if (!id) return;
    switch (userRole) {
      case UserRole.buyer:
        getBatchByCodeForBuyers(id as string).then((b) => {
          setBuyerBatch(b);
        });
        return;
      case UserRole.project:
        getBatchByCode(id as string).then((b) => {
          setBatch(b);
        });
        return;
      case UserRole.association:
        getBatchByCode(id as string).then((b) => {
          setBatch(b);
        });
        return;
    }
  }, [userRole, id]);

  return (
    <>
      <div className="batch__details-title">
        <BackButton /> {t('single_batch.title')} {id}
      </div>
      <div className="batch__details-container">
        {buyerBatch && userRole == UserRole.buyer ? (
          <>
            <div className="batch__details-association">
              <AssociationInfo
                batchCode={id as string}
                association={buyerBatch.association}
              />
            </div>
            <div className="batch__details">
              <GeneralBuyerStage
                batch={buyerBatch}
                name={t('single_batch.stages.storage')}
                index={5}
                img={'/assets/batch/Storage.jpg'}
                background="#f6aa62"
                userRole={userRole}
              />
              <GeneralBuyerStage
                batch={buyerBatch}
                name={t('single_batch.stages.drying')}
                index={4}
                img={'/assets/batch/Drying.jpg'}
                background="#f39a1a"
                userRole={userRole}
              />
              <GeneralBuyerStage
                batch={buyerBatch}
                name={t('single_batch.stages.fermentation')}
                index={3}
                img={'/assets/batch/Fermentation.jpg'}
                background="#f1852d"
                userRole={userRole}
              />
              <GeneralBuyerStage
                batch={buyerBatch}
                name={t('single_batch.stages.pulp')}
                index={2}
                img={'/assets/batch/Pulp.jpg'}
                background="#d0741a"
                userRole={userRole}
              />
              <GeneralBuyerStage
                batch={buyerBatch}
                name={t('single_batch.stages.producers')}
                index={1}
                img={'/assets/batch/Producers.jpg'}
                background="#93471b"
                userRole={userRole}
              />
            </div>
          </>
        ) : batch && userRole == UserRole.project ? (
          <div className="batch__details">
            {batch.salesPhase.buyerName ? (
              <>
                <Grid container justifyContent={'center'}>
                  <Grid item>
                    <BatchButton
                      action={() => {
                        // Hardcoded for now.
                        // Should just later.
                        generateBatchSnapshotCertificate();
                      }}
                      label={t('single_batch.generate_nft')}
                    />
                  </Grid>
                </Grid>
                <GeneralStage
                  batch={batch}
                  name={t('single_batch.stages.sales')}
                  index={5}
                  img={'/assets/batch/Sales.png'}
                  background="#7d2113"
                  userRole={userRole}
                />
                <WalletModal
                  open={openWalletModal}
                  onClose={handleCloseWalletModal}
                  onConfirm={handleConfirmWalletModal}
                />
              </>
            ) : (
              ''
            )}
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.storage')}
              index={4}
              img={'/assets/batch/Storage.jpg'}
              background="#f6aa62"
              userRole={userRole}
            />
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.drying')}
              index={3}
              img={'/assets/batch/Drying.jpg'}
              background="#f39a1a"
              userRole={userRole}
            />
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.fermentation')}
              index={2}
              img={'/assets/batch/Fermentation.jpg'}
              background="#f1852d"
              userRole={userRole}
            />
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.pulp')}
              index={1}
              img={'/assets/batch/Pulp.jpg'}
              background="#d0741a"
              userRole={userRole}
            />
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.producers')}
              index={0}
              img={'/assets/batch/Producers.jpg'}
              background="#93471b"
              userRole={userRole}
            />
          </div>
        ) : batch && userRole == UserRole.association ? (
          <div className="batch__details">
            {batch.salesPhase.buyerName ? (
              <>
                <Grid container justifyContent={'center'}>
                  <Grid item>
                    <BatchButton
                      action={() => {
                        // Hardcoded for now.
                        // Should just later.
                        generateBatchSnapshotCertificate();
                      }}
                      label={t('single_batch.generate_nft')}
                    />
                  </Grid>
                </Grid>
                <GeneralStage
                  batch={batch}
                  name={t('single_batch.stages.sales')}
                  index={5}
                  img={'/assets/batch/Sales.png'}
                  background="#7d2113"
                  userRole={userRole}
                />
                <WalletModal
                  open={openWalletModal}
                  onClose={handleCloseWalletModal}
                  onConfirm={handleConfirmWalletModal}
                />
              </>
            ) : (
              ''
            )}
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.storage')}
              index={4}
              img={'/assets/batch/Storage.jpg'}
              background="#f6aa62"
              userRole={userRole}
            />
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.drying')}
              index={3}
              img={'/assets/batch/Drying.jpg'}
              background="#f39a1a"
              userRole={userRole}
            />
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.fermentation')}
              index={2}
              img={'/assets/batch/Fermentation.jpg'}
              background="#f1852d"
              userRole={userRole}
            />
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.pulp')}
              index={1}
              img={'/assets/batch/Pulp.jpg'}
              background="#d0741a"
              userRole={userRole}
            />
            <GeneralStage
              batch={batch}
              name={t('single_batch.stages.producers')}
              index={0}
              img={'/assets/batch/Producers.jpg'}
              background="#93471b"
              userRole={userRole}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default BatchDetailsPage;
