import { FC } from 'react';

import { AppBar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ConnectWalletButton from './ConnectWalletButton';

const useStyles: any = makeStyles(() => ({
  appBar: {
    padding: 5,
  },
}));

const AuroraAppBar: FC = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <ConnectWalletButton />
    </AppBar>
  );
};

export default AuroraAppBar;
