import { AxiosResponseData, authenticatedApi } from '@/plugins/axios';
import { BatchNft } from '@/util/models/nft';

export const checkTokenIdTaken = async (
  idToken: string,
  buyer: string
): Promise<boolean> => {
  const response: AxiosResponseData<{ tokenIdTaken: boolean }> =
    await authenticatedApi.get(`/v1/nft/token`, {
      params: {
        id: idToken,
        buyer,
      },
    });
  return response.data.data.tokenIdTaken;
};

export const getBatchOwnedNftMetadata = async (
  code: string
): Promise<BatchNft> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/nft/metadata/${code}`
  );
  return response.data.data.batchMetadata;
};
