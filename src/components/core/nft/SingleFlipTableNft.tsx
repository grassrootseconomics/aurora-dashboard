import { useTranslation } from 'react-i18next';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface FlipsProps {
  flip: any;
}

const FlipsTableNft = ({ flip }: FlipsProps) => {
  const { t } = useTranslation('translation');

  return (
    <>
      <TableContainer className="fermentation-table">
        <Table sx={{ padding: 20 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <div className="table__cell-container"></div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">
                  {t('fermentation_model.flip')} 1
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <div className="table__cell-container">
                  {' '}
                  {t('fermentation_model.hours')}{' '}
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{flip.time}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <div className="table__cell-container">
                  {' '}
                  {t('fermentation_model.temp')}{' '}
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{flip.temp}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <div className="table__cell-container">
                  {' '}
                  {t('fermentation_model.room_temp')}{' '}
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{flip.ambient}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <div className="table__cell-container">
                  {' '}
                  {t('fermentation_model.relative_humidity')}{' '}
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="table__cell-container">{flip.humidity}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FlipsTableNft;
