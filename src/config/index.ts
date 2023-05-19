const WEB_3 = {
  NETWORK: process.env.NETWORK || 'TESTNET',
  APP_NAME: process.env.APP_NAME || 'Aurora Cacao',
};

const API = {
  ROOT: process.env.BACKEND_API_ROUTE || 'http://localhost:8080/',
  ACCESS_TOKEN_STORAGE: process.env.ACCESS_TOKEN_STORAGE || 'AuroraAToken',
  REFRESH_TOKEN_STORAGE: process.env.REFRESH_TOKEN_STORAGE || 'AuroraRToken',
};

export { WEB_3, API };
