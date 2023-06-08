import { deleteDayReport, editDayReport } from "@/services/batch";
import { DailyReport } from "@/util/models/Batch/Fermentation";
import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface ModalProps {
    open: boolean;
    closeModal: any;
    fermentationId: number;
    dayReport: DailyReport | undefined;
    index: number
}

const EditDayReportModal = (props: ModalProps) => {
    const { t } = useTranslation('translation');
    const { handleSubmit, control, setValue } = useForm<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSave = (data: any) => {
        editDayReport(props.fermentationId, data, props.index).then(() => window.location.reload());
    };

    const handleDelete = () => {
        deleteDayReport(props.fermentationId, props.index).then(() => window.location.reload());
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        setValue("temperatureMass", props.dayReport?.temperatureMass);
        setValue("phMass", props.dayReport?.phMass);
        setValue("phCotiledon", props.dayReport?.phCotiledon);
        setIsLoading(false);
    }, [props])

    return (<>
        <Modal open={props.open}>
            <div className="modal__container">
            {!isLoading ? (
                <div className="modal__content">
                <div className="modal__header"> 
                    <h2>{t("modals.report.edit_title")}</h2>
                </div>
                <form className="pulp-form" onSubmit={handleSubmit(handleSave)}>
                    <Controller
                        control={control}
                        name="temperatureMass"
                        defaultValue={control._defaultValues.temperatureMass}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.report.temp_mass")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />   
                    <Controller
                        control={control}
                        name="phMass"
                        defaultValue={control._defaultValues.phMass}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.report.ph_mass")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />   
                    <Controller
                        control={control}
                        name="phCotiledon"
                        defaultValue={control._defaultValues.phCotiledon}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.report.ph_cotiledon")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />
                    
                <div className="modal__footer">
                    <Button className="modal__button modal__button--delete" onClick={handleOpenModal}>
                        {t("buttons.delete")}
                    </Button>
                    <Button className="modal__button modal__button--close" onClick={props.closeModal}>
                        {t("buttons.close")}
                    </Button>
                    <Button type="submit" className="modal__button modal__button--save">
                        {t("buttons.save")}
                    </Button>
                </div>
                </form>
                </div>
            ) : (
                <div className="modal__loading"> 
                Loading...
                </div>
            )}
            </div>
        </Modal>
        <DeleteConfirmationModal
            open={modalOpen}
            onClose={handleCloseModal}
            onConfirm={handleDelete}
        />
        </>
    );
  };
  
  export default EditDayReportModal;