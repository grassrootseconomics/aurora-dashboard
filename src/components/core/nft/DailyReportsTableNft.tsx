import { FermentationPhase } from '@/util/models/Batch/BatchInfo';
import { Fermentation } from '@/util/models/nft';
import { useTheme } from '@material-ui/core/styles';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, useMediaQuery } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface DailyReportsProps {
    fermentationPhase: FermentationPhase | Fermentation;
}

const DailyReportsTableNft = (props: DailyReportsProps) => {
    const theme = useTheme();
    const { t } = useTranslation('translation');
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (<>
        <TableContainer className="fermentation-table" >
            <Table sx={{ maxWidth: () => isSmallScreen ? 'auto' : 1180, padding: 20 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center"></TableCell>
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
            </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default DailyReportsTableNft;