import { FermentationPhase } from '@/util/models/Batch/BatchInfo';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface FlipsProps {
    fermentationPhase?: FermentationPhase
}

const FlipsTable = (props: FlipsProps) => {
    const { t } = useTranslation('translation');

    return (
        <TableContainer className="fermentation-table">
            <Table sx={{ padding: 20 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell><div className="table__cell-container"></div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{t('fermentation_model.start')}</div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row) => { return (
                                <TableCell key={row.id} align="center"><div className="table__cell-container">{t('fermentation_model.flip')} {row.index}</div></TableCell>
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
                        props.fermentationPhase?.flips?.map((row) => { return (
                                <TableCell key={row.id} align="center"><div className="table__cell-container">{row.time}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.temp')} </div></TableCell>
                    <TableCell align="center"><div className="table__cell-container"> {props.fermentationPhase?.initialT} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row) => { return (
                                <TableCell key={row.id} align="center"><div className="table__cell-container">{row.temp}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.room_temp')} </div></TableCell>
                    <TableCell align="center"><div className="table__cell-container"> {props.fermentationPhase?.roomT} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row) => { return (
                                <TableCell key={row.id} align="center"><div className="table__cell-container">{row.ambient}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.relative_humidity')} </div></TableCell>
                    <TableCell align="center"><div className="table__cell-container"> {props.fermentationPhase?.humidity} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row) => { return (
                                <TableCell key={row.id} align="center"><div className="table__cell-container">{row.humidity}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FlipsTable;