import React, { FC, useEffect, useState } from 'react';

import { AppBar, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ConnectWalletButton from './ConnectWalletButton';
import LanguageSelector from './language/LanguageSelector';
import { useRouter } from 'next/router';
import HamburgerMenu from './menus/HamburgerMenu';

const useStyles: any = makeStyles(() => ({
  appBar: {
    color: "black",
    padding: 5,
    backgroundColor: "#fcf3dc!important"
  },
}));

const AuroraAppBar: FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
      
    };

    handleResize(); // Check initial window width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        { 
          isMobile ?
            <>
              <HamburgerMenu />
              <ConnectWalletButton />
            </>
            : 
            <>
              <LanguageSelector />
              <div className="menu-items">
                <Link onClick={() => router.push("/")}>Home</Link>
                <Link onClick={() => router.push("/about-aurora")}>About Aurora</Link>
                <Link onClick={() => router.push("/colombia-regions")}>Colombia Regions</Link>
                <ConnectWalletButton />
              </div>
            </> 
        }
      </div>
    </AppBar>
  );
};

export default AuroraAppBar;
