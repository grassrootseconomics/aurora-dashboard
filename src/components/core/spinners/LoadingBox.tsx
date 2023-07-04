import { FC } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

type LoadingBoxProps = {
  color?: string;
  message?: string;
};

const LoadingBox: FC<LoadingBoxProps> = ({ color = 'white', message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress style={{ color }} />
      {message ? <Typography>{message}</Typography> : <></>}
    </Box>
  );
};

export default LoadingBox;
