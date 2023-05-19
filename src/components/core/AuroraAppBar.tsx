import { FC } from 'react';

import { AppBar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useUserAuthContext } from '@/providers/UserAuthProvider';

import ConnectWalletButton from './ConnectWalletButton';
import LanguageSelector from './language/LanguageSelector';

const useStyles: any = makeStyles(() => ({
  appBar: {
    padding: 5,
  },
}));

const AuroraAppBar: FC = () => {
  const classes = useStyles();

  const { isAuthenticated } = useUserAuthContext();

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
        {isAuthenticated ? <LanguageSelector /> : <div></div>}
        <ConnectWalletButton />
      </div>
    </AppBar>
  );
};

export default AuroraAppBar;
