import { getPulpByCode } from "@/services/producer";
import { deletePulp, updatePulp } from "@/services/pulp";
import { PulpGenetics, PulpQuality, PulpStatus } from "@/util/constants/pulps";
import { convertToIsoDate, convertToSimpleDate } from "@/util/format/date";
import { Pulp } from "@/util/models/Batch/PulpsUsed";
import { Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface ModalProps {
    open: boolean;
    pulpId: number;
    closeModal: any;
    codeProducer: string;
}

const EditPulpModal = (props: ModalProps) => {
    const { t } = useTranslation('translation');
    const { handleSubmit, control, setValue } = useForm<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSave = (data: any) => {
        data.collectionDate = convertToIsoDate(data.collectionDate);
        updatePulp(props.pulpId, data).then(() => window.location.reload());
    };

    const handleDelete = () => {
        deletePulp(props.pulpId).then(() => window.location.reload());
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    useEffect(() => {
        getPulpByCode(props.codeProducer, props.pulpId).then((p: Pulp) => {
            setValue("codeProducer", p.codeProducer);
            setValue("codeBatch", p.batchesUsedFor ? p.batchesUsedFor[0]?.codeBatch : "");
            setValue("collectionDate", convertToSimpleDate(p.collectionDate));
            setValue("genetics", p.genetics);
            setValue("pricePerKg", p.pricePerKg);
            setValue("quality", p.quality);
            setValue("status", p.status);
            setValue("totalPulpKg", p.totalPulpKg);
            setIsLoading(false);
        });
    }, [])

    return (<>
        <Modal open={props.open}>
            <div className="modal__container"> 
            {!isLoading ? (
                <div className="modal__content"> 
                <div className="modal__header"> 
                    <h2>{t("modals.pulp.edit_title")}</h2>
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
  
  export default EditPulpModal;