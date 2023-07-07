import { useUserAuthContext } from '@/providers/UserAuthProvider';
import { UserRole } from '@/util/constants/users';
import { FermentationPhase } from '@/util/models/Batch/BatchInfo';
import { Flip } from '@/util/models/Batch/Fermentation';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AddFlipModal from '../modals/AddFlipModal';
import EditFlipModal from '../modals/EditFlipModal';
import EditIcon from '@mui/icons-material/Edit';

interface FlipsProps {
    fermentationPhase: FermentationPhase
}

const FlipsTable = (props: FlipsProps) => {
    const { t } = useTranslation('translation');
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [flip, setFlip] = useState<Flip>();
    const { userRole } = useUserAuthContext();

    const handleOpenEditModal = (index: number, flip: Flip) => {
        setFlip(flip)
        setIndex(index);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    }

    const handleOpenAddModal = () => {
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    }
    
    return (<>
        <TableContainer className="fermentation-table">
            <Table sx={{ padding: 20 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">
                        <div className="table__cell-container">
                            {
                                userRole == UserRole.association ?
                                        <button className="batch-action" onClick={() => handleOpenAddModal()}>+</button> : ""
                            }
                        </div> 
                    </TableCell>
                    <TableCell align="center"><div className="table__cell-container">{t('fermentation_model.start')}</div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((_, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{t('fermentation_model.flip')} {index + 1}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.hours')} </div></TableCell>
                    <TableCell align="center"><div className="table__cell-container"> {props.fermentationPhase?.hoursDrained} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.time}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.temp')} </div></TableCell>
                    <TableCell align="center"><div className="table__cell-container"> {props.fermentationPhase?.initialT} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.temp}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.room_temp')} </div></TableCell>
                    <TableCell align="center"><div className="table__cell-container"> {props.fermentationPhase?.roomT} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.ambient}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.relative_humidity')} </div></TableCell>
                    <TableCell align="center"><div className="table__cell-container"> {props.fermentationPhase?.humidity} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.humidity}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {   userRole == UserRole.association ?
                            props.fermentationPhase.flips?.map((row, index) => { return (
                                    <TableCell key={index} align="center">
                                        <div className="table__cell-container">
                                            <button className="batch-action" onClick={() => handleOpenEditModal(index, row)}><EditIcon /></button>
                                        </div>
                                    </TableCell>
                                )
                            }) : ""
                    } 
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
        <AddFlipModal open={openAddModal} fermentationId={props.fermentationPhase.id} closeModal={handleCloseAddModal}/>
        <EditFlipModal index={index} flip={flip} open={openEditModal} fermentationId={props.fermentationPhase.id} closeModal={handleCloseEditModal}/>
        </>
    );
};

export default FlipsTable;