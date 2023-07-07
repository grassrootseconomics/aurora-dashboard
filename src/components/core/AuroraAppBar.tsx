import React, { FC, useEffect, useState } from 'react';

import { AppBar, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ConnectWalletButton from './ConnectWalletButton';
import LanguageSelector from './language/LanguageSelector';
import { useRouter } from 'next/router';
import HamburgerMenu from './menus/HamburgerMenu';
import { useTranslation } from 'react-i18next';

const useStyles: any = makeStyles(() => ({
  appBar: {
    color: "black",
    padding: 5,
    backgroundColor: "#fcf3dc!important"
  },
}));

const AuroraAppBar: FC = () => {
  const { t } = useTranslation('translation');
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
                <Link onClick={() => router.push("/")}>{t("menu.home")}</Link>
                <Link onClick={() => router.push("/about-aurora")}>{t("menu.about")}</Link>
                <Link onClick={() => router.push("/colombia-regions")}>{t("menu.colombia_regions")}</Link>
                <ConnectWalletButton />
              </div>
            </> 
        }
      </div>
    </AppBar>
  );
};

export default AuroraAppBar;
