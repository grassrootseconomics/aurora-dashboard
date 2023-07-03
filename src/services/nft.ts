import { api, AxiosResponseData } from "@/plugins/axios";
import { BatchNft } from "@/util/models/nft";

export const fetchNFTModel = async (
    certification: string
  ): Promise<BatchNft> => {
    const response: AxiosResponseData<any> = await api.get(`/v1/nft/${certification}`);
    return response.data.data.certificationNFT;
  };