import { FermentationPhase } from '@/util/models/Batch/BatchInfo';
import { DailyReport } from '@/util/models/Batch/Fermentation';
import { useTheme } from '@material-ui/core/styles';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AddDayReportModal from '../modals/AddDayReportModal';
import EditDayReportModal from '../modals/EditDayReportModal';

interface DailyReportsProps {
    fermentationPhase: FermentationPhase;
}

const DailyReportsTable = (props: DailyReportsProps) => {
    const theme = useTheme();
    const { t } = useTranslation('translation');
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [day, setDay] = useState<number>(0);
    const [dayReport, setDayReport] = useState<DailyReport>();
    
    const handleOpenEditModal = (index: number, dayReport: DailyReport) => {
        setDay(index);
        setDayReport(dayReport);
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
        <TableContainer className="fermentation-table" >
            <Table sx={{ maxWidth: () => isSmallScreen ? 'auto' : 1180, padding: 20 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">
                        <div className="table__cell-container">
                            <button className="batch-action" onClick={() => handleOpenAddModal()}>+</button>
                        </div>
                    </TableCell>
                    {
                        props.fermentationPhase.dailyReports?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{t('fermentation_model.day')} {index + 1} (9am-1pm)</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.temp_mass')} </div></TableCell>
                    {
                        props.fermentationPhase.dailyReports?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.temperatureMass}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.ph_mass')} </div></TableCell>
                    {
                        props.fermentationPhase.dailyReports?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.phMass}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.ph_cotyledon')} </div></TableCell>
                    {
                        props.fermentationPhase.dailyReports?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.phCotiledon}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell></TableCell>
                    {
                        props.fermentationPhase.dailyReports?.map((row, index) => { return (
                                <TableCell key={index} align="center">
                                    <div className="table__cell-container">
                                        <button className="batch-action" onClick={() => handleOpenEditModal(index, row)}>?</button>
                                    </div>
                                </TableCell>
                            )
                        })
                    } 
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
        <AddDayReportModal open={openAddModal} fermentationId={props.fermentationPhase.id} closeModal={handleCloseAddModal}/>
        <EditDayReportModal dayReport={dayReport} index={day} open={openEditModal} fermentationId={props.fermentationPhase.id} closeModal={handleCloseEditModal}/>
        </>
    );
};

export default DailyReportsTable;