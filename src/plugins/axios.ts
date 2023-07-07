import { API } from '@/config';
import ResponseStructure from '@/util/models/ResponseStructure';
import { fetchAccessToken } from '@/util/tokenStorage';
import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: API.ROOT,
});

const prototypeApi = axios.create({
  baseURL: API.ROOT,
});

prototypeApi.interceptors.request.use(async function (config) {
  config.headers.Authorization = 'Bearer ' + fetchAccessToken();
  return config;
});

export type AxiosResponseData<TData> = AxiosResponse<ResponseStructure<TData>>;

export const authenticatedApi = prototypeApi;
