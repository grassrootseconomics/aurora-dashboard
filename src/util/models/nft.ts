import { DailyReport, Flip } from './Batch/Fermentation';

export interface BatchNft {
  assocDetails: Association;
  batchDetails: Batch;
  traceDetails: Trace;
}

interface Association {
  certifications:
    | {
        en: string;
        es: string;
      }
    | string;
  department: string;
  name: string;
  nrOfAssociates: number;
  nrOfWomen: number;
  nrOfYoungPeople: number;
  regionInformation:
    | {
        en: string;
        es: string;
      }
    | string;
  story:
    | {
        en: string;
        es: string;
      }
    | string;
  town: string;
  yearsOfExistence:
    | number
    | {
        en: string;
        es: string;
      };
}

interface Batch {
  cocoaType: string;
  code: string;
  conversionFactor: string;
  fermentationDays: number;
  fermentationModeL: string;
  grainIndex: number;
  humidityPercentage: number;
  processingDate: string;
  sensoryProfile:
    | {
        en: string;
        es: string;
      }
    | string;
  totalNetWeight: number;
  score: number;
}

interface Trace {
  drying: Drying;
  fermentation: Fermentation;
  harvesting: Harvesting;
  producers: Producers;
  sales: Sales;
  storage: Storage;
}

interface Drying {
  finalHumidity: number;
  nrOfDays: number;
  startDate: string;
}

export interface Fermentation {
  bxDegrees: number;
  dailyReports: DailyReport[];
  days: number;
  flips: Flip[];
  genetics: string;
  hoursDrained: number;
  netWeight: number;
  nrOfFlips: number;
  startDate: string;
}

interface Harvesting {
  date: string;
  pricePerKgCocoaPulp: number;
}

interface Producers {
  haCocoa: number;
  haConservationForest: number;
  identifiedVarieties: string;
  nrMen: number;
  nrWomen: number;
}

interface Sales {
  buyer: string;
  country: string;
  lot: string;
  negotiationDate: string;
  negotiationTerm: string;
  pricePerKg: number;
}

interface Storage {
  batchNetWeight: number;
  conversionFactor: string;
  fermentationPercentage: number;
  grainIndex: string;
  startDate: string;
}
