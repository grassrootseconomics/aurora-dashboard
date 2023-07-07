import { AxiosResponseData, api, authenticatedApi } from '@/plugins/axios';
import { Association } from '@/util/models/BasicAssociation';
import { fetchRefreshToken } from '@/util/tokenStorage';

export const getNonce = async (address: string): Promise<{ nonce: string }> => {
  const response: AxiosResponseData<{ nonce: string }> = await api.get(
    `/v1/auth/nonce`,
    {
      params: {
        address,
      },
    }
  );
  return response.data.data;
};

export const generateRefreshToken = async (
  address: string,
  nonce: string,
  signedNonce: string
): Promise<{ rToken: string }> => {
  const response: AxiosResponseData<{ rToken: string }> = await api.get(
    `/v1/auth/rtoken`,
    {
      params: {
        address,
        nonce,
        signature: signedNonce,
      },
    }
  );
  return response.data.data;
};

export const generateAccessToken = async (
  token?: string
): Promise<{ aToken: string }> => {
  const response: AxiosResponseData<{ aToken: string }> = await api.get(
    `/v1/auth/atoken`,
    {
      params: {
        rtoken: token || fetchRefreshToken(),
      },
    }
  );
  return response.data.data;
};


export const getUserAssociation = async (): Promise<Association> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/auth/association`);
  return response.data.data.association;
};
