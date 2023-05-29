import { API } from '@/config';

const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  // Return a mock localStorage object for server-side rendering
  return {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
  };
};

const storage = getLocalStorage();

export type AccessTokenStructure = {
  address: string;
  key: string;
  role: 'buyer' | 'association' | 'project';
  name: string;
  type: 'ACCESS' | 'REFRESH';
  exp: number;
  iat: number;
  iss: string;
};

export const fetchAccessToken = () => {
  return storage.getItem(API.ACCESS_TOKEN_STORAGE);
};

export const fetchRefreshToken = () => {
  return storage.getItem(API.REFRESH_TOKEN_STORAGE);
};

export const clearSession = () => {
  storage.removeItem(API.ACCESS_TOKEN_STORAGE);
  storage.removeItem(API.REFRESH_TOKEN_STORAGE);
};

export const setRefreshToken = (rToken: string) => {
  storage.setItem(API.REFRESH_TOKEN_STORAGE, rToken);
};

export const setAccessToken = (aToken: string) => {
  localStorage.setItem(API.ACCESS_TOKEN_STORAGE, aToken);
};
