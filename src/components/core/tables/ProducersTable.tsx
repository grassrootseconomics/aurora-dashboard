import { BasicProducer } from '@/util/models/Producer/BasicProducer';
import { useTheme } from '@material-ui/core/styles';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TableFooter, TablePagination, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TablePaginationActions from './TablePaginationActions';
import { useRouter } from 'next/router';
import { UserRole } from '@/util/constants/users';
import { useUserAuthContext } from '@/providers/UserAuthProvider';

interface ProducerProps {
    producers?: BasicProducer[]
}

const ProducersTable = (props: ProducerProps) => {
    const theme = useTheme();
    const { t } = useTranslation('translation');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const producersNo: number = props.producers?.length ?? 0;
    const { userRole } = useUserAuthContext();
    const router = useRouter();

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - producersNo) : 0;
  
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

    return (
        <TableContainer >
            <Table sx={{ maxWidth: () => isSmallScreen ? 'auto' : 1180, padding: 20 }} aria-label="simple table">
            <TableHead>
                { theme ? 
                    <TableRow>
                        {
                            userRole == UserRole.association ? <TableCell align="center"></TableCell> : ""
                        }
                        <TableCell align="center"><div className="table__cell-container">{t('producers.producer_code')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producers.name')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producers.last_name')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producers.village')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producers.age')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producers.cocoa_ha')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producers.location')}</div></TableCell>
                    </TableRow> : "" }
            </TableHead>
            <TableBody>
                {props.producers?.length ? props.producers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                    key={row.producerCode}
                    sx={{ '& td, & th': { backgroundColor: '#' }}}
                >
                    {
                        userRole == UserRole.association ? 
                            <TableCell align="center">
                                <button className="batch-action" onClick={() => router.push(`/producers/${row.producerCode}`)}>+</button>
                            </TableCell> : ""
                    }
                    <TableCell align="center"><div className="table__cell-container">{row.producerCode}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.name}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.lastName}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.village}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.age}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.cocoaHa}</div></TableCell>
                    <TableCell align="center"><div className="table__cell-container">{row.location}</div></TableCell>
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
                        count={props.producers?.length || 0}
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

export default ProducersTable;