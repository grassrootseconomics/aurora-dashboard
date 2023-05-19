import { AppProps } from 'next/app';

import { CacheProvider, EmotionCache } from '@emotion/react';
import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { chains, wagmiConfig } from '@/config/web3';
import createEmotionCache from '@/createEmotionCache';
import DefaultLayout from '@/layouts/DefaultLayout';
import '@/styles/globals.css';
import theme from '@/theme';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from 'wagmi';

import '../i18n';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <DefaultLayout>
              <CssBaseline />
              <Component {...pageProps} />
            </DefaultLayout>
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
