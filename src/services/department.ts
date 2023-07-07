import { AxiosResponseData, api, authenticatedApi } from '@/plugins/axios';
import { Department } from '@/util/models/BasicDepartment';

export const getDepartments = async (): Promise<Department[]> => {
  const response: AxiosResponseData<any> = await api.get(`/v1/department`);
  return response.data.data.departments;
};

export const updateNextHarvest = async (
  id: number,
  nextHarvest: Date
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.patch(
    `/v1/department/${id}`,
    {
      department: {
        nextHarvest: nextHarvest,
      },
    }
  );
  return response;
};
