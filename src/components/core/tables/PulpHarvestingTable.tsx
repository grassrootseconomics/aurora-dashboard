import { PulpHarvesting } from '@/util/models/Batch/PulpHarvesting';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TableFooter, TablePagination, Link } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AddPulpModal from '../modals/AddPulpModal';
import EditPulpModal from '../modals/EditPulpModal';
import TablePaginationActions from './TablePaginationActions';
import EditIcon from '@mui/icons-material/Edit';

interface PulpHarvestingProps {
    codeProducer: string;
    pulps?: PulpHarvesting[];
}

const PulpHarvestingTable = (props: PulpHarvestingProps) => {
    const { t } = useTranslation('translation');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const pulpHarvestingNo: number = props.pulps?.length ?? 0;
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [pulpId, setPulpId] = useState<number>();

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pulpHarvestingNo) : 0;
  
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

    const handleOpenEditModal = (id: number) => {
        setOpenEditModal(true);
        setPulpId(id);
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
    
    return ( <>
        <div className="producer-table__wrapper">
            <div className="producer-table__header">
                {t('producer_activity.pulp_harvesting')}
                <button className="batch-action" style={{marginLeft: 10}} onClick={() => handleOpenAddModal()}>+</button>
            </div>
            <TableContainer className="producer-table__container">
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producer_activity.batch_code')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producer_activity.date')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producer_activity.weight')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producer_activity.selling_price')}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{t('producer_activity.certificate')}</div></TableCell>
                    </TableRow> 
                </TableHead>
                <TableBody>
                    {props.pulps?.length ? props.pulps?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow
                        key={row.id}
                    >
                        <TableCell align="center"><button className="batch-action" onClick={() => handleOpenEditModal(row.id)}><EditIcon/></button></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{row.batchCode}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{row.date}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{row.weight}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container">{row.sellingPrice}</div></TableCell>
                        <TableCell align="center"><div className="table__cell-container"> <Link href={row.certificate}>{t('producer_activity.link')}</Link></div></TableCell>
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
                            count={props.pulps?.length || 0}
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
            {pulpId ? <EditPulpModal open={openEditModal} pulpId={pulpId} codeProducer={props.codeProducer} closeModal={handleCloseEditModal}/> : ""}
            <AddPulpModal open={openAddModal} codeProducer={props.codeProducer} closeModal={handleCloseAddModal}/>
        </div>
    </>);
};

export default PulpHarvestingTable;