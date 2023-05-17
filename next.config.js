const dotenv = require('dotenv');
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'es-ES'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  },
  env: {
    NETWORK: process.env.NETWORK,
    APP_NAME: process.env.APP_NAME,
    BACKEND_API_ROUTE: process.env.BACKEND_API_ROUTE,
  },
};

module.exports = nextConfig;
