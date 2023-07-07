import { AxiosResponseData, api, authenticatedApi } from '@/plugins/axios';
import { convertToIsoDate, delayToIsoDate } from '@/util/format/date';
import { BasicAvailableBatch } from '@/util/models/Batch/BasicAvailableBatch';
import { BasicSoldBatch } from '@/util/models/Batch/BasicSoldBatch';
import { Batch } from '@/util/models/Batch/Batch';
import { BatchInfo, mapToBatchInfo } from '@/util/models/Batch/BatchInfo';
import {
  BuyerBatchInfo,
  mapToBuyerBatchInfo,
} from '@/util/models/Batch/BuyerBatchInfo';
import {
  CertificateOwner,
  CertificationMintFields,
  CertificationSignerFields,
} from '@/util/models/Batch/Certification';
import { DailyReport, Flip } from '@/util/models/Batch/Fermentation';
import { EmailSample } from '@/util/models/EmailSample';
import ResponseStructure from '@/util/models/ResponseStructure';

export const getBatchesWithoutAuth = async (
  department?: string
): Promise<any> => {
  const response: AxiosResponseData<any> = await api.get(`/v1/batch`, {
    params: {
      department: department != '' ? department : null,
    },
  });
  return response.data.data;
};

export const getBatchByCode = async (code: string): Promise<BatchInfo> => {
  const response: AxiosResponseData<any> = await api.get(`/v1/batch/${code}`);
  const batch = response.data.data.batch;

  return mapToBatchInfo(batch);
};

export const getBatchByCodeForBuyers = async (
  code: string
): Promise<BuyerBatchInfo> => {
  const response: AxiosResponseData<any> = await api.get(`/v1/batch/${code}`);
  const batch = response.data.data.batch;
  return mapToBuyerBatchInfo(batch);
};

export const getBatchesWithAuth = async (): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/batch`
  );
  return response.data.data;
};

export const getAvailableBatches = async (
  association?: string
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/batch/available`,
    {
      params: {
        association: association,
      },
    }
  );

  const batchesArray: Batch[] = response.data.data.searchBatchesResult.data;

  const basicBatches = batchesArray.map(
    (b) =>
      new BasicAvailableBatch(
        b.code,
        b.storage.netWeight,
        b.fermentationPhase.cocoaType,
        b.fermentationPhase.startDate,
        b.fermentationPhase.humidity,
        b.storage.grainIndex,
        b.storage.sensoryProfile
      )
  );

  return {
    basicBatches: basicBatches,
    kgDryCocoaAvailable: response.data.data.statistics.kgDryCocoaAvailable,
    productionOfDryCocoa: response.data.data.report.productionOfDryCocoa,
    monthlyCocoaPulp: response.data.data.report.monthlyCocoaPulp,
  };
};

export const getSoldBatches = async (association?: string): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/batch/sold`,
    {
      params: {
        association: association,
      },
    }
  );

  const batchesArray: Batch[] = response.data.data.searchBatchesResult.data;

  const basicBatches = batchesArray.map(
    (b) =>
      new BasicSoldBatch(
        b.code,
        b.sale.buyer,
        b.sale.destination,
        b.sale.pricePerKg,
        b.sale.totalValue,
        b.sale.negotiationTerm,
        b.fermentationPhase.cocoaType
      )
  );

  return {
    basicBatches: basicBatches,
    kgDryCocoaSold: response.data.data.statistics.kgDryCocoaInternationallySold,
    salesInKg: response.data.data.report.salesInKg,
    monthlySalesInUSD: response.data.data.report.monthlySalesInUSD,
  };
};

export const updateSalesPhase = async (salesStats: any[]): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.patch(
    `/v1/batch/${salesStats[0]}/sale`,
    {
      sale: {
        buyer: salesStats[1],
        lotCode: salesStats[2],
        negotiation: salesStats[3],
        negotiationTerm: salesStats[4],
        destination: salesStats[5],
        currency: salesStats[6],
        pricePerKg: salesStats[7],
        totalValue: salesStats[8],
        negotiationDate: convertToIsoDate(salesStats[9]),
      },
    }
  );
  return response;
};

export const updateStoragePhase = async (storageStats: any[]): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.patch(
    `/v1/batch/${storageStats[0]}/storage`,
    {
      storage: {
        dayEntry: convertToIsoDate(storageStats[1]),
        netWeight: storageStats[2],
        conversionFaction: storageStats[3],
        fermentationPercentage: storageStats[4],
        grainIndex: storageStats[5],
        sensoryProfile: storageStats[6],
        score: storageStats[7],
      },
    }
  );
  return response;
};

export const updateDryingPhase = async (dryingStats: any[]): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.patch(
    `/v1/batch/${dryingStats[0]}/drying`,
    {
      drying: {
        startDate: convertToIsoDate(dryingStats[1]),
        endDate: delayToIsoDate(dryingStats[1], +dryingStats[2]),
        totalDryingDays: dryingStats[2],
        finalGrainHumidity: dryingStats[3],
      },
    }
  );
  return response;
};

export const updateFermentationPhase = async (
  salesStats: any[]
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.patch(
    `/v1/batch/${salesStats[0]}/fermentation`,
    {
      fermentation: {
        cocoaType: salesStats[1],
        startDate: convertToIsoDate(salesStats[2]),
        genetics: salesStats[3],
        brixDegrees: salesStats[4],
        weight: +salesStats[5],
        humidity: +salesStats[6],
        hoursDrained: +salesStats[7],
      },
    }
  );
  return response;
};

export const addDayReport = async (
  fermentationId: number,
  dayReport: DailyReport
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.post(
    `/v1/batch/${fermentationId}/fermentation/reports`,
    {
      dayReport: dayReport,
    }
  );
  return response;
};

export const addFlip = async (
  fermentationId: number,
  flip: Flip
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.post(
    `/v1/batch/${fermentationId}/fermentation/flips`,
    {
      flip: flip,
    }
  );
  return response;
};

export const editDayReport = async (
  fermentationId: number,
  dayReport: DailyReport,
  index: number
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.patch(
    `/v1/batch/${fermentationId}/fermentation/reports/${index}`,
    {
      dayReport: dayReport,
    }
  );
  return response;
};

export const editFlip = async (
  fermentationId: number,
  flip: Flip,
  index: number
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.patch(
    `/v1/batch/${fermentationId}/fermentation/flips/${index}`,
    {
      flip: flip,
    }
  );
  return response;
};

export const deleteDayReport = async (
  fermentationId: number,
  index: number
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.delete(
    `/v1/batch/${fermentationId}/fermentation/reports/${index}`
  );
  return response;
};

export const deleteFlip = async (
  fermentationId: number,
  index: number
): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.delete(
    `/v1/batch/${fermentationId}/fermentation/flips/${index}`
  );
  return response;
};

export const sendSampleEmail = async (
  codeBatch: string,
  emailFields: EmailSample
): Promise<any> => {
  const response: AxiosResponseData<any> = await api.post(
    `/v1/batch/${codeBatch}/sample-request`,
    {
      fields: emailFields,
    }
  );
  return response;
};

export const generateBatchSnapshotHash = async (
  code: string
): Promise<{ fingerprint: string }> => {
  const response: AxiosResponseData<{ fingerprint: string }> =
    await authenticatedApi.post(`/v1/nft/snapshot/${code}`);

  return response.data.data;
};

export const saveSnapshotCertification = async (
  code: string,
  signData: CertificationSignerFields
): Promise<{ key: string }> => {
  const response: AxiosResponseData<{ key: string }> =
    await authenticatedApi.post(`/v1/nft/signing/${code}`, {
      fingerprints: { ...signData },
    });

  return response.data.data;
};

export const saveCertificateMintOwner = async (
  code: string,
  mintDetails: CertificationMintFields
): Promise<ResponseStructure<{ ownership: CertificateOwner }>> => {
  const response: AxiosResponseData<{ ownership: CertificateOwner }> =
    await authenticatedApi.post(`/v1/nft/mint/${code}`, { mintDetails });

  return response.data;
};

export const downloadBatchesInExcel = async (sold: boolean): Promise<any> => {
  const response: AxiosResponseData<any> = await authenticatedApi.get(
    `/v1/batch/download/all`,
    {
      responseType: 'blob',
      params: {
        sold: sold,
      },
    }
  );

  return response;
};
