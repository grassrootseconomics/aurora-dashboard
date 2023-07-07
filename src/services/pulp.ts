import { authenticatedApi, AxiosResponseData } from "@/plugins/axios";

export const updatePulp = async (id: number, pulp: any): Promise<any> => {
    const response: AxiosResponseData<any> = await authenticatedApi.patch(
      `/v1/pulp/${id}`, 
      {
        pulp: pulp
      }
    );
    return response;
};

export const addPulp = async (pulp: any): Promise<any> => {
    const response: AxiosResponseData<any> = await authenticatedApi.post(
      `/v1/pulp`, 
      {
        pulp: pulp
      }
    );
    return response;
};

export const deletePulp = async (pulpId: number): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.delete(
    `/v1/pulp/${pulpId}`);
  return response;
};