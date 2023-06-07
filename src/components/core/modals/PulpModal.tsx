import { getPulpByCode } from "@/services/producer";
import { updatePulp } from "@/services/pulp";
import { PulpGenetics, PulpQuality, PulpStatus } from "@/util/constants/pulps";
import { convertToIsoDate, convertToSimpleDate } from "@/util/format/date";
import { Pulp } from "@/util/models/Batch/PulpsUsed";
import { Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface ModalProps {
    open: boolean;
    pulpId: number;
    closeModal: any;
    codeProducer: string;
}

const PulpModal = (props: ModalProps) => {
    const { handleSubmit, control, setValue } = useForm<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSave = (data: any) => {
        data.collectionDate = convertToIsoDate(data.collectionDate);
        updatePulp(props.pulpId, data).then(() => window.location.reload());
    };

    useEffect(() => {
        getPulpByCode(props.codeProducer, props.pulpId).then((p: Pulp) => {
            setValue("codeProducer", p.codeProducer);
            setValue("collectionDate", convertToSimpleDate(p.collectionDate));
            setValue("genetics", p.genetics);
            setValue("pricePerKg", p.pricePerKg);
            setValue("quality", p.quality);
            setValue("status", p.status);
            setValue("totalPulpKg", p.totalPulpKg);
            setIsLoading(false);
        });
    }, [])

    return (
        <Modal open={props.open}>
            <div className="modal__container"> 
            {!isLoading ? (
                <div className="modal__content"> 
                <div className="modal__header"> 
                    <h2>Pulp Info</h2>
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
                                                Code Producer:
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
                                                Collection Date:
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
                                        Genetics:
                                    </div>
                                    <Select 
                                        {...field}
                                        >
                                        <MenuItem value={PulpGenetics.mixed}>Mixed</MenuItem>
                                        <MenuItem value={PulpGenetics.hybrid}>Hybrid</MenuItem>
                                        <MenuItem value={PulpGenetics.aromatic}>Aromatic</MenuItem>
                                        <MenuItem value={PulpGenetics.ccnTsh}>CCN/TSH</MenuItem>
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
                                                Price Per Kg:
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
                                    Quality:
                                    </div>
                                    <Select 
                                        {...field}
                                        >
                                        <MenuItem value={PulpQuality.healthy}>Healthy</MenuItem>
                                        <MenuItem value={PulpQuality.partiallyGerminated}>Partially germinated</MenuItem>
                                        <MenuItem value={PulpQuality.partiallyDeceased}>Partially deceased</MenuItem>
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
                                    Status:
                                    </div>
                                    <Select 
                                        {...field}
                                        >
                                        <MenuItem value={PulpStatus.organic}>Organic</MenuItem>
                                        <MenuItem value={PulpStatus.transitional}>Transitional</MenuItem>
                                        <MenuItem value={PulpStatus.conventional}>Conventional</MenuItem>
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
                                                Total Pulp Kg:
                                            </div>
                                        )
                                    }}
                                    {...field}
                                />     
                            )}
                        /> 
                <div className="modal__footer">
                    <Button className="modal__button modal__button--close" onClick={props.closeModal}>Close</Button>
                    <Button type="submit" className="modal__button modal__button--save">
                        Save
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
  
  export default PulpModal;