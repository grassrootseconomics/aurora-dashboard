import { authenticatedApi, AxiosResponseData } from "@/plugins/axios";
import { Association } from "@/util/models/BasicAssociation";

export const getAssociations = async (): Promise<Association[]> => {
    const response: AxiosResponseData<any> = await authenticatedApi.get(
      `/v1/association`
    );
    return response.data.data.associations;
};
  