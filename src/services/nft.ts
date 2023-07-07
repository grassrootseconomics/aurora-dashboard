import { AxiosResponseData, authenticatedApi } from '@/plugins/axios';
import { BatchNft } from '@/util/models/nft';

export const getBatchOwnedNftMetadata = async (
  code: string
): Promise<BatchNft> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/nft/metadata/${code}`
  );
  return response.data.data.batchMetadata;
};
