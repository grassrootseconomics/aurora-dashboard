import { addPulp } from "@/services/pulp";
import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface ModalProps {
    open: boolean;
    closeModal: any;
    codeProducer: string;
}

const AddDailyReportModal = (props: ModalProps) => {
    const { handleSubmit, control, setValue } = useForm<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSave = (data: any) => {
        addPulp(data).then(() => window.location.reload());
    };

    useEffect(() => {
        setValue("temperatureMass", 0);
        setValue("phMass", 0);
        setValue("phCotiledon", 0);
        setIsLoading(false);
    }, [props])

    return (
        <Modal open={props.open}>
            <div className="modal__container">
            {!isLoading ? (
                <div className="modal__content">
                <div className="modal__header"> 
                    <h2>Add Day Report</h2>
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
                                                T° masa:
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
                                                Ph masa:
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
                                                Ph cotiledón:
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
  
  export default AddDailyReportModal;