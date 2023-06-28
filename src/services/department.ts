import { api, AxiosResponseData } from "@/plugins/axios";
import { Department } from "@/util/models/BasicDepartment";

export const getDepartments = async (): Promise<Department[]> => {
    const response: AxiosResponseData<any> = await api.get(
      `/v1/department`
    );
    return response.data.data.departments;
};
  