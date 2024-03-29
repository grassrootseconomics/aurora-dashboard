import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { isAddress } from 'web3-validator';

import LoadingBox from '../spinners/LoadingBox';

interface WalletModalProps {
  open: boolean;
  isLoading: boolean;
  canMint: boolean;
  isComplete: boolean;
  failMessage?: string;
  certificateRoute?: string;
  loadingMessage?: string;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (wallet: string) => Promise<void>;
  mintAction: () => void;
}

const WalletModal: FC<WalletModalProps> = ({
  open,
  isLoading = false,
  isComplete = false,
  canMint = false,
  failMessage,
  certificateRoute,
  loadingMessage,
  onClose,
  onConfirm,
  mintAction,
}) => {
  const { t } = useTranslation('translation');
  const { handleSubmit, control, setValue } = useForm<any>();
  const [errorMessage, setErrorMessage] = useState<string>();

  // Function to verify the wallet address
  function verifyWalletAddress(address: string): boolean {
    // Check if the address is valid
    return isAddress(address);
  }

  const handleErrorMessage = () => {
    setErrorMessage('');
  };

  const handleClose = () => {
    if (!isLoading) onClose();
  };

  const handleConfirm = async (data: any) => {
    if (verifyWalletAddress(data.wallet)) {
      await onConfirm(data.wallet);
      setValue('wallet', '');
      handleErrorMessage();
      // handleClose();
    } else {
      setErrorMessage(t('error.invalid_address') ?? '');
    }
  };

  useEffect(() => {
    setValue('wallet', '');
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="insert-wallet-modal"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 500,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
        className="modal__content"
      >
        {failMessage ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>Transaction Failed!</Typography>
            <Typography>{failMessage}</Typography>
          </Box>
        ) : canMint ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>{t('modals.wallet.wallet_valid')}</Typography>
            <div>
              <Button
                onClick={handleClose}
                className="modal__button modal__button--close"
              >
                {t('buttons.close')}
              </Button>
              <Button
                type="submit"
                className="modal__button modal__button--save"
                onClick={() => mintAction()}
              >
                {t('buttons.confirm')}
              </Button>
            </div>
          </Box>
        ) : isComplete ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Successfully minted & transfered Certificate NFT!
            {certificateRoute ? (
              <Link href={certificateRoute}>View Certificate</Link>
            ) : (
              <></>
            )}
          </Box>
        ) : isLoading ? (
          <LoadingBox color="#50000A" message={loadingMessage} />
        ) : (
          <>
            <Typography variant="h6" id="wallet-modal" gutterBottom>
              {t('modals.wallet.title')}
            </Typography>
            <form className="pulp-form" onSubmit={handleSubmit(handleConfirm)}>
              <Controller
                control={control}
                name="wallet"
                defaultValue={control._defaultValues.wallet}
                render={({ field }) => <TextField fullWidth {...field} />}
              />
              <div className="modal__error">{errorMessage}</div>
              <Button
                onClick={handleClose}
                className="modal__button modal__button--close"
              >
                {t('buttons.close')}
              </Button>
              <Button
                type="submit"
                className="modal__button modal__button--save"
              >
                {t('buttons.save')}
              </Button>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default WalletModal;
