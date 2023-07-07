import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
  saveCertificateMintOwner,
  saveSnapshotCertification,
} from '@/services/batch';
import { UserRole } from '@/util/constants/users';
import { BatchInfo } from '@/util/models/Batch/BatchInfo';
import { BuyerBatchInfo } from '@/util/models/Batch/BuyerBatchInfo';
import { createHash } from 'crypto';
import { hexToBigInt } from 'viem';
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useSignMessage,
  useWaitForTransaction,
} from 'wagmi';

import CERT_ABI from '../../../contracts/abi-certificate-nft.json';

const BatchDetailsPage = () => {
  const { t } = useTranslation('translation');
  const router = useRouter();
  const { id } = router.query;
  const [buyerBatch, setBuyerBatch] = useState<BuyerBatchInfo>();
  const [batch, setBatch] = useState<BatchInfo>();
  const { userRole, connectedWallet } = useUserAuthContext();
  const { signMessageAsync } = useSignMessage();
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);

  useContractEvent({
    address: `0x${WEB_3.NFT_CONTRACT.split('0x').pop()}`,
    abi: CERT_ABI,
    eventName: 'mintTo',
    listener(log) {
      console.log(log);
    },
  });

  // Parametes for the mint.
  const certName = useMemo(() => `Aurora Batch #${id} Certificate`, [id]);
  const certDescription = useMemo(
    () => `Certificate NFT Ownership of Aurora Batch #${id}`,
    [id]
  );
  const [tokenId, setTokenId] = useState('');
  const [certKey, setCertKey] = useState('');
  const [certBuyer, setBuyer] = useState('');

  // Initialize contract config with ABI.
  const { config } = usePrepareContractWrite({
    address: `0x${WEB_3.NFT_CONTRACT.split('0x').pop()}`,
    abi: CERT_ABI,
    functionName: 'mintTo',
    args: [certBuyer, tokenId, certName, certDescription, [certKey]],
  });

  // Get mint action.
  const { writeAsync, data } = useContractWrite(config);

  const { isLoading: isLoadingMint, isSuccess: isMintSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  const certLink = useMemo(() => {
    if (data && isMintSuccess) return `/batches/${id}/nft`;
  }, [data, id, isMintSuccess]);

  const [isLoadingCert, setIsLoadingCert] = useState<boolean>(false);

  const handleOpenWalletModal = () => {
    setOpenWalletModal(true);
  };

  const handleCloseWalletModal = () => {
    setOpenWalletModal(false);
  };

  /**
   *
   * Handles the confirmation of the wallet:
   * - generates new token id from wallet
   * - sets wallet and token id
   *
   * @param wallet User Wallet
   */
  const handleConfirmWalletModal = useCallback(
    (wallet: string) => {
      const hexHash = createHash('sha256')
        .update(`${wallet}:${certKey}`)
        .digest('hex');
      setBuyer(wallet);
      const tokenId = hexToBigInt(`0x${hexHash}`).toString();
      setTokenId(tokenId);
      // Will start the whole minting process.
    },
    [certKey]
  );

  /**
   *
   * Generate a Batch Snapshot.
   *
   * Hint: Correctly submitting the wallet should submit the mint.
   *
   */
  const generateBatchSnapshotCertificate = useCallback(async () => {
    try {
      if (id) {
        setIsLoadingCert(true);

        // Show input wallet modal.
        handleOpenWalletModal();

        // Generate a new Snapshot fingerprint.
        // If one already exists
        const response = await generateBatchSnapshotHash(id.toString());
        // Sign the snapshot fingerprint.
        const signedFingerprint = await signMessageAsync({
          message: response.fingerprint,
        });
        const dateSigned = new Date();
        // Fetch the new certification of the batch fingerprint.
        const keyResult = await saveSnapshotCertification(id.toString(), {
          signedDataFingerprint: signedFingerprint,
          dataFingerprint: response.fingerprint,
          dateSigned,
        });

        setCertKey(keyResult.key);
        setIsLoadingCert(false);
      }
    } catch (err) {
      setIsLoadingCert(false);
      console.log(err);
    }
  }, [id, signMessageAsync]);

  const saveNewMintOwner = useCallback(async () => {
    try {
      setIsLoadingCert(true);
      setIsLoadingCert(false);
      if (id && connectedWallet) {
        saveCertificateMintOwner(id.toString(), {
          minterWallet: connectedWallet,
          buyerWallet: certBuyer,
          tokenId,
          certificateKey: certKey,
        });
        console.log(
          `${certBuyer} now owns token ${tokenId} with certificate ${certKey}`
        );
      }
    } catch (err) {
      setIsLoadingCert(false);
      console.log(err);
    }
  }, [id, connectedWallet, certBuyer, tokenId, certKey]);

  const mintCertificateNFT = useCallback(async () => {
    if (writeAsync) {
      try {
        setIsLoadingCert(true);
        const result = await writeAsync();
        console.log(result);
        setIsLoadingCert(false);
      } catch (err) {
        setIsLoadingCert(false);
        console.log(err);
      }
    }
  }, [writeAsync]);

  useEffect(() => {
    if (isMintSuccess) {
      saveNewMintOwner();
    }
  }, [isMintSuccess, saveNewMintOwner]);

  useEffect(() => {
    if (certBuyer && certName && certDescription && certKey && tokenId) {
      mintCertificateNFT();
    }
  }, [
    certBuyer,
    certName,
    certDescription,
    certKey,
    mintCertificateNFT,
    router.pathname,
    tokenId,
  ]);

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
                  isLoading={isLoadingMint || isLoadingCert}
                  isComplete={isMintSuccess}
                  certificateRoute={certLink}
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
                  isLoading={isLoadingMint || isLoadingCert}
                  isComplete={isMintSuccess}
                  certificateRoute={certLink}
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