import { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

const LoadingBox: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress style={{ color: 'white' }} />
    </Box>
  );
};

export default LoadingBox;
