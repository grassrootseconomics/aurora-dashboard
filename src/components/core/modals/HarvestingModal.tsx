import { useTranslation } from 'react-i18next';

import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { getDepartments, updateNextHarvest } from '@/services/department';
import { convertToIsoDate, convertToSimpleDate } from '@/util/format/date';
import { Department } from '@/util/models/BasicDepartment';

interface HarvestingModalProps {
  open: boolean;
  onClose: () => void;
}

const HarvestingModal: FC<HarvestingModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation('translation');
  const { handleSubmit, control, setValue } = useForm<any>();
  const [departments, setDepartments] = useState<Department[]>();

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = (data: {
    idDepartment: number;
    nextHarvest: string;
  }) => {
    updateNextHarvest(data.idDepartment, convertToIsoDate(data.nextHarvest));
    handleClose();
  };

  useEffect(() => {
    getDepartments().then((deps) => {
      setDepartments(deps);
      setValue('idDepartment', deps[0].id);
      setValue('nextHarvest', convertToSimpleDate(deps[0].nextHarvest));
    });
  }, []);

  const handleIdDepartmentChange = (selectedOption: any) => {
    console.log(selectedOption);
    // Perform any necessary logic here based on the selectedOption

    // Update the value of nextHarvest field
    setValue(
      'nextHarvest',
      convertToSimpleDate(
        departments?.find((d) => d.id == selectedOption)?.nextHarvest ?? ''
      )
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-confirmation-modal"
    >
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
          {t('modals.harvesting.title')}
        </Typography>
        <form className="pulp-form" onSubmit={handleSubmit(handleConfirm)}>
          <Controller
            name="idDepartment"
            control={control}
            render={({ field }) => (
              <div className="producer__row">
                <Select
                  {...field}
                  value={field.value || ''} // Pass the value from the field object
                  onChange={(e) => {
                    field.onChange(e); // Update the field value
                    handleIdDepartmentChange(e.target.value); // Call the custom handler
                  }}
                >
                  {departments?.map((d) => {
                    return (
                      <MenuItem key={d.id} value={d.id}>
                        {d.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            )}
          />
          <Controller
            name="nextHarvest"
            control={control}
            defaultValue={control._defaultValues.nextHarvest}
            render={({ field }) => <TextField fullWidth {...field} />}
          />
          <Button
            onClick={handleClose}
            className="modal__button modal__button--close"
          >
            {t('buttons.close')}
          </Button>
          <Button type="submit" className="modal__button modal__button--save">
            {t('buttons.save')}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default HarvestingModal;
