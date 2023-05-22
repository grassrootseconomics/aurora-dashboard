import Document, { Head, Html, Main, NextScript } from 'next/document';

import React from 'react';

import { ServerStyleSheets } from '@mui/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function calculateBodyScale() {
                  var windowWidth = window.innerWidth;

                  if (windowWidth >= 1280 && windowWidth <= 1919) {
                    var percentage = window.innerWidth / 1920;
                    document.body.style.transform = 'scale(' + percentage + ')';
                  } else {
                    document.body.style.transform = 'scale(1)';
                  }
                }

                window.addEventListener('resize', calculateBodyScale);
                calculateBodyScale();
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
