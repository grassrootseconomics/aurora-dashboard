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

import { BasicSoldBatch } from '@/util/models/BasicSoldBatch';
import { useTheme } from '@material-ui/core/styles';

const SoldBatchesTable = () => {
  const theme = useTheme();
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
      new BasicSoldBatch(
        'H0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'A0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'B0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'C0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'D0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'n0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'm0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'o0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'p0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
      ),
      new BasicSoldBatch(
        'r0103',
        'Cocoa De Colombie',
        'Francia',
        3.5,
        1050,
        'Fob',
        'Certificado'
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
                {t('buyer')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('destination_country')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('price_per_kg')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('total_price')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('negociation_terms')}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#f1842d' }} align="center">
                {t('cocoa_type')}
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
                <TableCell align="center">{row.buyer}</TableCell>
                <TableCell align="center">{row.destinationCountry}</TableCell>
                <TableCell align="center">{row.pricePerKg}</TableCell>
                <TableCell align="center">{row.totalPrice}</TableCell>
                <TableCell align="center">{row.negociationTerms}</TableCell>
                <TableCell align="center">{row.cocoaType}</TableCell>
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
              // ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default SoldBatchesTable;
