const dotenv = require('dotenv');
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NETWORK: process.env.NETWORK,
    APP_NAME: process.env.APP_NAME,
    BACKEND_API_ROUTE: process.env.BACKEND_API_ROUTE,
  },
};

module.exports = nextConfig;
