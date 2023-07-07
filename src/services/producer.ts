import { AxiosResponseData, authenticatedApi } from '@/plugins/axios';
import { calculateYearsUntilPresentByYear } from '@/util/format/date';
import { Pulp } from '@/util/models/Batch/PulpsUsed';
import { BasicProducer } from '@/util/models/Producer/BasicProducer';
import { Producer } from '@/util/models/Producer/Producer';
import {
  ProducerActivity,
  mapToProducerActivity,
} from '@/util/models/Producer/ProducerActivity';

export const getProducersStatistics = async (
  association?: string
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/producer`,
    {
      params: {
        association: association,
      },
    }
  );

  return response.data.data.statistics;
};

export const getBasicProducers = async (
  association?: string
): Promise<BasicProducer[]> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/producer`,
    {
      params: {
        association: association,
      },
    }
  );

  return response.data.data.searchProducersResult.data.map(
    (p: any) =>
      new BasicProducer(
        p.code,
        p.firstName,
        p.lastName,
        p.village,
        calculateYearsUntilPresentByYear(p.birthYear),
        p.nrCocoaHa,
        p.location,
        p.nrForestHa
      )
  );
};

export const getProducersInfoList = async (
  association?: string
): Promise<{ producers: BasicProducer[]; statistics: any }> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/producer`,
    { params: { association } }
  );

  return {
    producers: response.data.data.searchProducersResult.data.map(
      (p: any) =>
        new BasicProducer(
          p.code,
          p.firstName,
          p.lastName,
          p.village,
          calculateYearsUntilPresentByYear(p.birthYear),
          p.nrCocoaHa,
          p.location,
          p.nrForestHa
        )
    ),
    statistics: response.data.data.statistics,
  };
};

export const getProducerByCode = async (code: string): Promise<Producer> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/producer/${code}`
  );

  return response.data.data.producer;
};

export const getProducerActivity = async (
  code: number
): Promise<ProducerActivity> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/producer/${code}/batches`
  );

  return mapToProducerActivity(response.data.data);
};

export const getPulpByCode = async (
  producerCode: string,
  pulpId: number
): Promise<Pulp> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/producer/${producerCode}/batches`
  );

  return response.data.data.pulps.find((p: Pulp) => p.id == pulpId);
};

export const updateProducer = async (
  code: string,
  producer: any
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.patch(
    `/v1/producer/${code}`,
    {
      producer: producer,
    }
  );

  return response;
};

export const downloadProducersInExcel = async (): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
      `/v1/producer/download/all`, {
        responseType: 'blob',
      });
  return response;
};