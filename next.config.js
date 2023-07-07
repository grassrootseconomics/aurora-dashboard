const dotenv = require('dotenv');
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NETWORK: process.env.NETWORK,
    APP_NAME: process.env.APP_NAME,
    BACKEND_API_ROUTE: process.env.BACKEND_API_ROUTE,

    ACCESS_TOKEN_STORAGE: process.env.ACCESS_TOKEN_STORAGE,
    REFRESH_TOKEN_STORAGE: process.env.REFRESH_TOKEN_STORAGE,

    NFT_CONTRACT: process.env.NFT_CONTRACT,
  },
};

module.exports = nextConfig;
