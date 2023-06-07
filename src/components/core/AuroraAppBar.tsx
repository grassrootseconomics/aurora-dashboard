import { FC } from 'react';

import { AppBar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ConnectWalletButton from './ConnectWalletButton';
import LanguageSelector from './language/LanguageSelector';

const useStyles: any = makeStyles(() => ({
  appBar: {
    color: "black!important",
    padding: 5,
    backgroundColor: "#fcf3dc!important"
  },
}));

const AuroraAppBar: FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <LanguageSelector />
        <ConnectWalletButton />
      </div>
    </AppBar>
  );
};

export default AuroraAppBar;
