import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useMediaQuery,
} from '@mui/material';

import { BasicAvailableBatch } from '@/util/models/BasicAvailableBatch';
import { useTheme } from '@material-ui/core/styles';

const AvailableBatchesTable = () => {
  const theme = useTheme();
  const { t } = useTranslation('translation');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [soldBatches, setSoldBatches] = useState<BasicAvailableBatch[]>([]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - soldBatches.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setSoldBatches([
      new BasicAvailableBatch(
        'H0103',
        200,
        'Francia',
        new Date(),
        33.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'A0103',
        220,
        'Francia',
        new Date(),
        43.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'B0103',
        220,
        'Francia',
        new Date(),
        22.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'C0103',
        120,
        'Francia',
        new Date(),
        20.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'D0103',
        100,
        'Francia',
        new Date(),
        22.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'n0103',
        120,
        'Francia',
        new Date(),
        63.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'm0103',
        430,
        'Francia',
        new Date(),
        37.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'o0103',
        230,
        'Francia',
        new Date(),
        37.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'p0103',
        330,
        'Francia',
        new Date(),
        42.5,
        1050,
        'Fob'
      ),
      new BasicAvailableBatch(
        'r0103',
        240,
        'Francia',
        new Date(),
        76.5,
        1050,
        'Fob'
      ),
    ]);
  }, [rowsPerPage]);

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: () => (isSmallScreen ? 'auto' : 1360), padding: 20 }}
        aria-label="simple table"
      >
        <TableHead>
          {theme ? (
            <TableRow
              sx={{
                '&:first-child th': {
                  border: () => (isSmallScreen ? 5 : 15),
                  borderColor: 'white',
                },
              }}
            >
              <TableCell align="center"></TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('batch')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('total_weight')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('cocoa_type')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('processing_date')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('humidity')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('grain_index')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('general_sensory_profile')}
              </TableCell>
            </TableRow>
          ) : (
            ''
          )}
        </TableHead>
        <TableBody>
          {soldBatches.length ? (
            soldBatches.map((row) => (
              <TableRow
                key={row.batch}
                sx={{
                  '& td, & th': {
                    border: () => (isSmallScreen ? 5 : 15),
                    borderColor: 'white',
                    backgroundColor: '#ffebcc',
                  },
                }}
              >
                <TableCell align="center">
                  <a className="batch-action" href="">
                    +
                  </a>
                </TableCell>
                <TableCell align="center">{row.batch}</TableCell>
                <TableCell align="center">{row.totalWeight}</TableCell>
                <TableCell align="center">
                  {t(`single_batch.cacao_type.${row.cocoaType}`)
                    .split('.')
                    .pop()}
                </TableCell>
                <TableCell align="center">
                  {row.processingDate.toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{row.humidity}</TableCell>
                <TableCell align="center">{row.grainIndex}</TableCell>
                <TableCell align="center">
                  {row.generalSensoryProfile}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[4, 5, 10]}
              colSpan={3}
              count={5}
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
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default AvailableBatchesTable;
