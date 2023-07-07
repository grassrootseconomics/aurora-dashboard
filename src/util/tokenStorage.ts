import { API } from '@/config';
import { UserRole } from './constants/users';

export type AccessTokenStructure = {
  address: string;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  type: 'ACCESS';
  role: UserRole;
  username: string;
};

export const fetchAccessToken = () => {
  return localStorage.getItem(API.ACCESS_TOKEN_STORAGE);
};

export const fetchRefreshToken = () => {
  return localStorage.getItem(API.REFRESH_TOKEN_STORAGE);
};

export const clearSession = () => {
  localStorage.removeItem(API.ACCESS_TOKEN_STORAGE);
  localStorage.removeItem(API.REFRESH_TOKEN_STORAGE);
};

export const setRefreshToken = (rToken: string) => {
  localStorage.setItem(API.REFRESH_TOKEN_STORAGE, rToken);
};

export const setAccessToken = (aToken: string) => {
  localStorage.setItem(API.ACCESS_TOKEN_STORAGE, aToken);
};
