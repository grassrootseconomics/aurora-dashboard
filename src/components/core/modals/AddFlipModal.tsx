import { addFlip } from "@/services/batch";
import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ModalProps {
    open: boolean;
    closeModal: any;
    fermentationId: number;
}

const AddFlipModal = (props: ModalProps) => {
    const { t } = useTranslation('translation');
    const { handleSubmit, control, setValue } = useForm<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSave = (data: any) => {
        addFlip(props.fermentationId, data).then(() => window.location.reload());
    };

    useEffect(() => {
        setValue("type", "");
        setValue("time", 0);
        setValue("temp", 0);
        setValue("ambient", 0);
        setValue("humidity", 0);
        setIsLoading(false);
    }, [props])

    return (
        <Modal open={props.open}>
            <div className="modal__container">
            {!isLoading ? (
                <div className="modal__content">
                <div className="modal__header"> 
                    <h2>{t("modals.flip.add_title")}</h2>
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
    );
  };
  
  export default AddFlipModal;