import React, { FC, ReactNode } from 'react';

import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles(() => ({
  mainBox: {
    paddingTop: 30,
  },
}));

type BodyProps = {
  children: ReactNode;
};

const Body: FC<BodyProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.mainBox} style={{ marginBottom: '70px' }}>
      {children}
    </Grid>
  );
};

export default Body;
