import { BaseBatch } from '@/util/models/Batch/BaseBatch';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TableFooter, TablePagination } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TablePaginationActions from './TablePaginationActions';

interface BaseBatchProps {
    batches?: BaseBatch[]
}

const BaseBatchesTable  = (props: BaseBatchProps) => {
    const { t } = useTranslation('translation');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const batchesNo: number = props.batches?.length ?? 0;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - batchesNo) : 0;
  
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

    return ( <>
        <div className="producer-table__wrapper">
            <div className="producer-table__header">
                {t('producer_activity.batches')}
            </div>
            <TableContainer className="producer-table__container">
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center"><div className="table__cell-container">{t('producer_activity.batch_code')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producer_activity.processing_date')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producer_activity.sold')}</div></TableCell>
                    </TableRow> 
                </TableHead>
                <TableBody>
                    {props.batches?.length ? props.batches?.map((row) => (
                    <TableRow
                        key={row.batchCode}
                    >
                        <TableCell align="center"><div className="table__cell-container">{row.batchCode}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{row.processingDate}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{row.sold}</div></TableCell>
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
        </div>
    </>);
};

export default BaseBatchesTable;