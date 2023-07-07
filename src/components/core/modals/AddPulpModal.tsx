import { addPulp } from "@/services/pulp";
import { PulpGenetics, PulpQuality, PulpStatus } from "@/util/constants/pulps";
import { convertToIsoDate, convertToSimpleDate } from "@/util/format/date";
import { Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ModalProps {
    open: boolean;
    closeModal: any;
    codeProducer: string;
}

const AddPulpModal = (props: ModalProps) => {
    const { t } = useTranslation('translation');
    const { handleSubmit, control, setValue, unregister } = useForm<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSave = (data: any) => {
        data.collectionDate = convertToIsoDate(data.collectionDate);
        data.totalPrice = data.pricePerKg * data.totalPulpKg;
        if(data.codeBatch == "") unregister('codeBatch');
        addPulp(data).then(() => window.location.reload());
    };

    useEffect(() => {
        setValue("codeProducer", props.codeProducer);
        setValue("codeBatch", "");
        setValue("collectionDate", convertToSimpleDate(new Date().toDateString()));
        setValue("genetics", PulpGenetics.mixed);
        setValue("pricePerKg", 0);
        setValue("quality", PulpQuality.healthy);
        setValue("status", PulpStatus.conventional);
        setValue("totalPulpKg", 0);
        setIsLoading(false);
    }, [props])

    return (
        <Modal open={props.open}>
            <div className="modal__container"> 
            {!isLoading ? (
                <div className="modal__content"> 
                <div className="modal__header"> 
                    <h2>{t("modals.pulp.add_title")}</h2>
                </div>
                <form className="pulp-form" onSubmit={handleSubmit(handleSave)}>
                    <Controller
                        control={control}
                        name="codeProducer"
                        defaultValue={control._defaultValues.codeProducer}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.pulp.code_producer")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />   
                    <Controller
                        control={control}
                        name="collectionDate"
                        defaultValue={control._defaultValues.collectionDate}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.pulp.collection_date")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />   
                    <Controller
                        control={control}
                        name="codeBatch"
                        defaultValue={control._defaultValues.codeBatch}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.pulp.code_batch")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        />
                    <Controller
                        control={control}
                        name="genetics"
                        defaultValue={control._defaultValues.genetics}
                        render={({ field }) => (
                                <div className="pulp__row">
                                    <div className="pulp__icon-label">
                                        {t("modals.pulp.genetics.title")}
                                    </div>
                                    <Select 
                                        {...field}
                                        >
                                        <MenuItem value={PulpGenetics.mixed}>{t("modals.pulp.genetics.mixed")}</MenuItem>
                                        <MenuItem value={PulpGenetics.hybrid}>{t("modals.pulp.genetics.hybrid")}</MenuItem>
                                        <MenuItem value={PulpGenetics.aromatic}>{t("modals.pulp.genetics.aromatic")}</MenuItem>
                                        <MenuItem value={PulpGenetics.ccnTsh}>{t("modals.pulp.genetics.ccn_tsh")}</MenuItem>
                                    </Select>
                                </div>  
                            )}
                        /> 
                    <Controller
                        control={control}
                        name="pricePerKg"
                        defaultValue={control._defaultValues.pricePerKg}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.pulp.price_per_kg")}
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        /> 
                    <Controller
                        control={control}
                        name="quality"
                        defaultValue={control._defaultValues.quality}
                        render={({ field }) => (
                                <div className="pulp__row">
                                    <div className="pulp__icon-label">
                                        {t("modals.pulp.quality.title")}
                                    </div>
                                    <Select 
                                        {...field}
                                        >
                                        <MenuItem value={PulpQuality.healthy}>{t("modals.pulp.quality.healthy")}</MenuItem>
                                        <MenuItem value={PulpQuality.partiallyGerminated}>{t("modals.pulp.quality.partially_germinated")}</MenuItem>
                                        <MenuItem value={PulpQuality.partiallyDeceased}>{t("modals.pulp.quality.partially_deceased")}</MenuItem>
                                    </Select>
                                </div>    
                            )}
                        /> 
                    <Controller
                        control={control}
                        name="status"
                        defaultValue={control._defaultValues.quality}
                        render={({ field }) => (
                                <div className="pulp__row">
                                    <div className="pulp__icon-label">
                                        {t("modals.pulp.status.title")}
                                    </div>
                                    <Select 
                                        {...field}
                                        >
                                        <MenuItem value={PulpStatus.organic}>{t("modals.pulp.status.organic")}</MenuItem>
                                        <MenuItem value={PulpStatus.transitional}>{t("modals.pulp.status.transitional")}</MenuItem>
                                        <MenuItem value={PulpStatus.conventional}>{t("modals.pulp.status.conventional")}</MenuItem>
                                    </Select>
                                </div>    
                            )}
                        /> 
                    <Controller
                        control={control}
                        name="totalPulpKg"
                        defaultValue={control._defaultValues.totalPulpKg}
                        render={({ field }) => (
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <div className="pulp__icon-label">
                                                {t("modals.pulp.total_pulp_kg")}
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
  
  export default AddPulpModal;