import { BasicSoldBatch } from '@/util/models/Batch/BasicSoldBatch';
import { useTheme } from '@material-ui/core/styles';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TableFooter, TablePagination, useMediaQuery } from "@mui/material";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TablePaginationActions from './TablePaginationActions';

interface Props {
    batches?: BasicSoldBatch[]
}

const SoldBatchesTable = (props: Props) => {
    const theme = useTheme();
    const router = useRouter();
    const { t } = useTranslation('translation');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [soldBatches, setSoldBatches] = useState<BasicSoldBatch[]>([]);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - soldBatches.length) : 0;
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
        if(props.batches) {
            setSoldBatches(props.batches)
        }        
    }, [rowsPerPage, props.batches])
  
    return (
        <TableContainer >
            <Table sx={{ maxWidth: () => isSmallScreen ? 'auto' : 1180, padding: 20 }} aria-label="simple table">
            <TableHead>
                { theme ? 
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('batch')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('buyer')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('destination_country')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('price_per_kg')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('total_price')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('negociation_terms')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('cocoa_type')}</div></TableCell>
                    </TableRow> : "" }
            </TableHead>
            <TableBody>
                {soldBatches.length ? soldBatches.map((row) => (
                <TableRow
                    key={row.batch}
                    sx={{ '& td, & th': { backgroundColor: '#' }}}
                >
                    <TableCell align="center"><button className="batch-action" onClick={() => router.push(`/batches/${row.batch}`)}>+</button></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.batch}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.buyer}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.destinationCountry}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.pricePerKg}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.totalPrice}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.negociationTerms}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.cocoaType}</div></TableCell>
                </TableRow>
                )) :
                    <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[4, 5, 10]}
                        colSpan={3}
                        count={props.batches?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        />
                </TableRow>
            </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default SoldBatchesTable;