import { Fermentation } from '@/util/models/nft';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface FlipsProps {
    fermentationPhase: Fermentation
}

const FlipsTableNft = (props: FlipsProps) => {
    const { t } = useTranslation('translation');

    return (<>
        <TableContainer className="fermentation-table">
            <Table sx={{ padding: 20 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">
                        <div className="table__cell-container">

                        </div> 
                    </TableCell>
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
                    {
                        props.fermentationPhase?.flips?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.time}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.temp')} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.temp}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.room_temp')} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.ambient}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
                <TableRow>
                    <TableCell align="center"><div className="table__cell-container"> {t('fermentation_model.relative_humidity')} </div></TableCell>
                    {
                        props.fermentationPhase?.flips?.map((row, index) => { return (
                                <TableCell key={index} align="center"><div className="table__cell-container">{row.humidity}</div></TableCell>
                            )
                        })
                    } 
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default FlipsTableNft;