import React from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation('translation');
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="delete-confirmation-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
        className="modal__content"
      >
        <Typography variant="h6" id="delete-confirmation-modal" gutterBottom>
          {t("modals.delete.title")}
        </Typography>
        <Typography variant="body1" style={{margin: "25px 0"}}>
          {t("modals.delete.message")}
        </Typography>
        <Button onClick={handleClose} className="modal__button modal__button--close">
          {t("buttons.close")}
        </Button>
        <Button onClick={handleConfirm} className="modal__button modal__button--delete">
          {t("buttons.delete")}
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;