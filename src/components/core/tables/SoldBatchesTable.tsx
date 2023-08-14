import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { FC, useCallback, useMemo } from 'react';

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

import { BasicSoldBatch } from '@/util/models/Batch/BasicSoldBatch';
import { PaginationOptions } from '@/util/models/Pagination';
import { useTheme } from '@material-ui/core/styles';

import TablePaginationActions from './TablePaginationActions';

interface Props {
  batches: BasicSoldBatch[] | undefined;
  pagination: PaginationOptions;
  totalEntries: number;
  // eslint-disable-next-line no-unused-vars
  updatePagination: (newInputs: PaginationOptions) => void;
  loading: boolean;
}

const SoldBatchesTable: FC<Props> = ({
  batches,
  pagination,
  updatePagination,
  totalEntries,
  loading,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation('translation');
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(() => {
    if (batches) {
      return pagination.index > 0
        ? Math.max(
            0,
            (1 + pagination.index) * pagination.limit - batches.length
          )
        : 0;
    } else {
      return 0;
    }
  }, [batches, pagination.index, pagination.limit]);

  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      if (!loading) {
        updatePagination({
          ...pagination,
          index: newPage,
        });
      }
    },
    [loading, pagination, updatePagination]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!loading) {
        updatePagination({
          ...pagination,
          limit: parseInt(event.target.value, 10),
        });
      }
    },
    [loading, pagination, updatePagination]
  );

  return (
    <TableContainer>
      <Table
        sx={{ maxWidth: () => (isSmallScreen ? 'auto' : 1180), padding: 20 }}
        aria-label="simple table"
      >
        <TableHead>
          {theme ? (
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{t('batch')}</div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{t('buyer')}</div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">
                  {t('destination_country')}
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{t('price_per_kg')}</div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{t('total_price')}</div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">
                  {t('negociation_terms')}
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{t('cocoa_type')}</div>
              </TableCell>
            </TableRow>
          ) : (
            ''
          )}
        </TableHead>
        <TableBody>
          {batches && batches.length ? (
            batches.map((row) => (
              <TableRow
                key={row.batch}
                sx={{ '& td, & th': { backgroundColor: '#' } }}
              >
                <TableCell align="center">
                  <button
                    className="batch-action"
                    onClick={() => router.push(`/batches/${row.batch}`)}
                  >
                    +
                  </button>
                </TableCell>
                <TableCell align="center">
                  <div className="table__cell-container">{row.batch}</div>
                </TableCell>
                <TableCell align="center">
                  <div className="table__cell-container">{row.buyer}</div>
                </TableCell>
                <TableCell align="center">
                  <div className="table__cell-container">
                    {row.destinationCountry}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="table__cell-container">{row.pricePerKg}</div>
                </TableCell>
                <TableCell align="center">
                  <div className="table__cell-container">{row.totalPrice}</div>
                </TableCell>
                <TableCell align="center">
                  <div className="table__cell-container">
                    {row.negociationTerms}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="table__cell-container">
                    {t(`single_batch.cacao_type.${row.cocoaType}`)
                      .split('.')
                      .pop()}
                  </div>
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
              rowsPerPageOptions={[2, 4, 5, 10]}
              colSpan={3}
              count={totalEntries}
              rowsPerPage={pagination.limit}
              page={pagination.index}
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
