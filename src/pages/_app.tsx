import { AppProps } from 'next/app';

import { CacheProvider, EmotionCache } from '@emotion/react';
import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import createEmotionCache from '@/createEmotionCache';
import '@/styles/globals.css';
import theme from '@/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
