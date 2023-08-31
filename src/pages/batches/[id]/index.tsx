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
import { checkTokenIdTaken } from '@/services/nft';
import { UserRole } from '@/util/constants/users';
import { BatchInfo } from '@/util/models/Batch/BatchInfo';
import { BuyerBatchInfo } from '@/util/models/Batch/BuyerBatchInfo';
import { createHash } from 'crypto';
import { useDebounce } from 'use-debounce';
import { hexToBigInt } from 'viem';
import {
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

  // Parametes for the mint.
  const certName = useMemo(() => `Aurora Batch #${id} Certificate`, [id]);
  const certDescription = useMemo(
    () => `Certificate NFT Ownership of Aurora Batch #${id}`,
    [id]
  );
  const [tokenId, setTokenId] = useState('');
  const [certKey, setCertKey] = useState('');
  const [certBuyer, setBuyer] = useState('');
  const [debounceTokenId] = useDebounce(tokenId, 500);

  // Initialize contract config with ABI.
  const { config, error } = usePrepareContractWrite({
    address: `0x${WEB_3.NFT_CONTRACT.split('0x').pop()}`,
    abi: CERT_ABI,
    functionName: 'mintTo',
    args: [certBuyer, debounceTokenId, certName, certDescription, [certKey]],
    enabled:
      Boolean(certBuyer) &&
      Boolean(debounceTokenId) &&
      Boolean(certName) &&
      Boolean(certDescription) &&
      Boolean(certKey),
  });

  // Get mint action.
  const { write, data } = useContractWrite(config);

  const {
    isLoading: isLoadingMint,
    isSuccess: isMintSuccess,
    error: transactionError,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  const [failMessage, setFailMessage] = useState<string | undefined>();

  const certLink = useMemo(() => {
    if (data && isMintSuccess) return `/batches/${id}/nft`;
  }, [data, id, isMintSuccess]);

  const [isLoadingCert, setIsLoadingCert] = useState<boolean>(false);
  const [transactionParamsPrepared, setTransactionParamsPrepared] =
    useState(false);

  const handleOpenWalletModal = () => {
    setOpenWalletModal(true);
  };

  const handleCloseWalletModal = () => {
    setFailMessage('');
    setIsLoadingCert(false);
    setOpenWalletModal(false);
    setTransactionParamsPrepared(false);
    setTokenId('');
    setCertKey('');
    setBuyer('');
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
    async (wallet: string) => {
      // Check token id not taken!
      try {
        const hexHash = createHash('sha256')
          .update(`${wallet}:${certKey}`)
          .digest('hex');
        const tokenId = hexToBigInt(`0x${hexHash}`).toString();
        const isTokenIdTaken = await checkTokenIdTaken(tokenId, wallet);
        if (isTokenIdTaken) {
          setFailMessage(t('nft.transaction_fail.token_id_taken').toString());
        } else {
          console.log('Token Id not Taken!');
          setBuyer(wallet);
          setTokenId(tokenId);
        }
      } catch (error) {
        handleCloseWalletModal();
        setIsLoadingCert(false);
      }
      // Will start the whole minting process.
    },
    [certKey, t]
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
      handleCloseWalletModal();
      setIsLoadingCert(false);
    }
  }, [id, signMessageAsync]);

  const saveNewMintOwner = useCallback(async () => {
    try {
      setIsLoadingCert(true);
      if (id && connectedWallet && certBuyer && tokenId && certKey) {
        saveCertificateMintOwner(id.toString(), {
          minterWallet: connectedWallet,
          buyerWallet: certBuyer,
          tokenId,
          certificateKey: certKey,
        });
        console.log(
          `${certBuyer} now owns token ${tokenId} with certificate ${certKey}`
        );
        setIsLoadingCert(false);
      }
    } catch (err) {
      setIsLoadingCert(false);
    }
  }, [id, connectedWallet, certBuyer, tokenId, certKey]);

  const mintCertificateNFT = useCallback(() => {
    if (write) {
      try {
        setIsLoadingCert(true);
        write();
        setTransactionParamsPrepared(false);
      } catch (err) {
        setIsLoadingCert(false);
      }
    }
  }, [write]);

  // Config setup use effect
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  useEffect(() => {
    if (transactionError) {
      setIsLoadingCert(false);
      setFailMessage(t('nft.transaction_fail.generic').toString());
    }
  }, [t, transactionError]);

  useEffect(() => {
    if (isMintSuccess) {
      saveNewMintOwner();
    }
  }, [isMintSuccess, saveNewMintOwner]);

  useEffect(() => {
    if (debounceTokenId) console.log(`Prepared Id ${debounceTokenId}`);

    if (
      certBuyer !== '' &&
      certName !== '' &&
      certDescription !== '' &&
      certKey !== '' &&
      debounceTokenId !== ''
    ) {
      console.log('Commencing Transaction Confirmation Step!');
      // Signal that this method can be called
      setTransactionParamsPrepared(true);
    }
  }, [debounceTokenId, certBuyer, certName, certDescription, certKey]);

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
                  canMint={transactionParamsPrepared && write !== undefined}
                  mintAction={() => {
                    mintCertificateNFT();
                  }}
                  onClose={handleCloseWalletModal}
                  onConfirm={handleConfirmWalletModal}
                  isLoading={isLoadingMint || isLoadingCert}
                  isComplete={isMintSuccess}
                  failMessage={failMessage}
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
                  canMint={transactionParamsPrepared && write !== undefined}
                  mintAction={() => {
                    mintCertificateNFT();
                  }}
                  onClose={handleCloseWalletModal}
                  onConfirm={handleConfirmWalletModal}
                  isLoading={isLoadingMint || isLoadingCert}
                  isComplete={isMintSuccess}
                  failMessage={failMessage}
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
