import { deleteFlip, editFlip } from "@/services/batch";
import { Flip } from "@/util/models/Batch/Fermentation";
import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface ModalProps {
    open: boolean;
    closeModal: any;
    fermentationId: number;
    flip: Flip | undefined;
    index: number;
}

const EditFlipModal = (props: ModalProps) => {
    const { t } = useTranslation('translation');
    const { handleSubmit, control, setValue } = useForm<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSave = (data: any) => {
        editFlip(props.fermentationId, data, props.index).then(() => window.location.reload());
    };

    const handleDelete = () => {
        deleteFlip(props.fermentationId, props.index).then(() => window.location.reload());
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        setValue("type", props.flip?.type);
        setValue("time", props.flip?.time);
        setValue("temp", props.flip?.temp);
        setValue("ambient", props.flip?.ambient);
        setValue("humidity", props.flip?.humidity);
        setIsLoading(false);
    }, [props])

    return (<>
        <Modal open={props.open}>
            <div className="modal__container">
            {!isLoading ? (
                <div className="modal__content">
                <div className="modal__header"> 
                    <h2>{t("modals.flip.edit_title")}</h2>
                </div>
                <form className="pulp-form" onSubmit={handleSubmit(handleSave)}>
                    <Controller
                        control={control}
                        name="type"
                        defaultValue={control._defaultValues.type}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.flip.type")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />   
                    <Controller
                        control={control}
                        name="time"
                        defaultValue={control._defaultValues.time}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.flip.hours")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />   
                    <Controller
                        control={control}
                        name="temp"
                        defaultValue={control._defaultValues.temp}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.flip.temp")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />
                    <Controller
                        control={control}
                        name="ambient"
                        defaultValue={control._defaultValues.ambient}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.flip.roomt_t")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />
                    <Controller
                        control={control}
                        name="humidity"
                        defaultValue={control._defaultValues.humidity}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.flip.humidity")}
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
  
  export default EditFlipModal;