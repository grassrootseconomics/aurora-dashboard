import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import React, { FC, useEffect, useState } from 'react';

import { AppBar, Link, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useLoadingStateContext } from '@/providers/LoadingStateContext';
import { useYearFilterContext } from '@/providers/YearFilterProvider';

import ConnectWalletButton from './ConnectWalletButton';
import LanguageSelector from './language/LanguageSelector';
import HamburgerMenu from './menus/HamburgerMenu';

const useStyles: any = makeStyles(() => ({
  appBar: {
    color: 'black',
    padding: 5,
    backgroundColor: '#fcf3dc!important',
  },
}));

const AuroraAppBar: FC = () => {
  const { t } = useTranslation('translation');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { selectedYear, setSelectedYear } = useYearFilterContext();
  // Loading Context
  const { isLoading } = useLoadingStateContext();
  const classes = useStyles();
  const router = useRouter();

  const [yearOptions] = useState<number[]>([
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
  ]);

  const handleChangeYear = (newYear: number) => {
    setSelectedYear(newYear);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
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
        {isMobile ? (
          <>
            <HamburgerMenu />
            <ConnectWalletButton />

            <Select
              value={selectedYear}
              onChange={(event) => {
                const { value } = event.target;
                handleChangeYear(typeof value === 'number' ? value : 2023);
              }}
              disabled={isLoading}
            >
              {yearOptions.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : (
          <>
            <LanguageSelector />
            <div className="menu-items">
              <Link onClick={() => router.push('/')}>{t('menu.home')}</Link>
              <Link onClick={() => router.push('/about-aurora')}>
                {t('menu.about')}
              </Link>
              <Link onClick={() => router.push('/colombia-regions')}>
                {t('menu.colombia_regions')}
              </Link>
              <ConnectWalletButton />
              <Select
                value={selectedYear}
                onChange={(event) => {
                  const { value } = event.target;
                  handleChangeYear(typeof value === 'number' ? value : 2023);
                }}
                disabled={isLoading}
              >
                {yearOptions.map((year, index) => (
                  <MenuItem key={index} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </>
        )}
      </div>
    </AppBar>
  );
};

export default AuroraAppBar;
