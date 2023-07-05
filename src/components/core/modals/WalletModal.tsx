import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from "react-hook-form";
import { isAddress } from 'web3-validator';

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const WalletModal: FC<WalletModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation('translation');
  const { handleSubmit, control, setValue } = useForm<any>();
  const [ errorMessage, setErrorMessage] = useState<string>();

  // Function to verify the wallet address
  function verifyWalletAddress(address: string): boolean {
    // Check if the address is valid
    return isAddress(address);
  }

  const handleErrorMessage = () => {
    setErrorMessage("");
  }

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = (data: any) => {
    if(verifyWalletAddress(data.wallet)) {
      onConfirm(data.wallet);
      setValue("wallet", "");
      handleErrorMessage()
      handleClose();
    } else {
      setErrorMessage(t("error.invalid_address") ?? "");
    }
  };

  useEffect(() => {
    setValue("wallet", "");
  }, []);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="insert-wallet-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 500,
          width: "100%",
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
        className="modal__content"
      >
        <Typography variant="h6" id="wallet-modal" gutterBottom>
          {t("modals.wallet.title")}
        </Typography>
        <form className="pulp-form" onSubmit={handleSubmit(handleConfirm)}>
          <Controller
              control={control}
              name="wallet"
              defaultValue={control._defaultValues.wallet}
              render={({ field }) => (
                <TextField
                    fullWidth
                    {...field}
                />     
            )}
          />    
          <div className="modal__error">
            {errorMessage}
          </div>  
          <Button onClick={handleClose} className="modal__button modal__button--close">
            {t("buttons.close")}
          </Button>
          <Button type="submit" className="modal__button modal__button--save">
            {t("buttons.save")}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default WalletModal;