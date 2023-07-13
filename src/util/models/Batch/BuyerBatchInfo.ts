import { filterByMaxPropValue } from '@/util/arrays';
import { calculateAverage } from '@/util/format/array';

import { Association } from '../BasicAssociation';
import { Batch } from './Batch';
import { Pulp } from './PulpsUsed';

export interface BuyerBatchInfo {
  id: number;
  code: string;
  storagePhase: StoragePhase;
  dryingPhase: DryingPhase;
  fermentationPhase: FermentationPhase;
  pulpsPhase: PulpPhase;
  producersPhase: ProducersPhase;
  association: Association | null;
}

export interface StoragePhase {
  netWeight: number;
  conversionFaction: number;
  fermentationPercentage: number;
  grainIndex: number;
}

export interface DryingPhase {
  daysDrying: number;
  grainHumidity: number;
}

export interface FermentationPhase {
  genetics: string;
  brixDegrees: number;
  initialT: number;
  roomT: number | null;
  hoursDrained: number;
  humidity: number;
  nrFlips: number;
  totalDays: number;
}

export interface PulpPhase {
  quality: string;
  status: string;
}

export interface ProducersPhase {
  noProducers: number;
  cocoaHa: number;
  conservationHa: number;
}

export function mapToBuyerBatchInfo(source: Batch): BuyerBatchInfo {
  const pulps = source.pulpsUsed.map((pulpUsed) => pulpUsed.pulp);
  const largestPulp: Pulp | undefined = filterByMaxPropValue(
    pulps,
    'totalPulpKg'
  );
  const BuyerBatchInfoDto: BuyerBatchInfo = {
    id: source.id,
    code: source.code,
    storagePhase: {
      netWeight: source.storage.netWeight,
      conversionFaction: source.storage.conversionFaction,
      fermentationPercentage: source.storage.fermentationPercentage,
      grainIndex: source.storage.grainIndex,
    },
    dryingPhase: {
      daysDrying: source.dryingPhase.totalDryingDays,
      grainHumidity: source.dryingPhase.finalGrainHumidity,
    },
    fermentationPhase: {
      genetics: source.fermentationPhase.genetics,
      brixDegrees: source.fermentationPhase.brixDegrees,
      initialT: source.fermentationPhase.dailyReports
        ? source.fermentationPhase.dailyReports[0]?.temperatureMass ?? 0
        : 0,
      roomT: calculateAverage(
        source.fermentationPhase.dailyReports.map((r) => +r.temperatureMass)
      ),
      humidity: source.fermentationPhase.humidity,
      hoursDrained: source.fermentationPhase.hoursDrained,
      nrFlips: source.fermentationPhase.nrFlips,
      totalDays: source.fermentationPhase.totalDays,
    },
    pulpsPhase: {
      quality: largestPulp ? largestPulp.quality : '',
      status: largestPulp ? largestPulp.status : '',
    },
    producersPhase: {
      noProducers: new Set(source.pulpsUsed.map((p) => p.pulp.codeProducer))
        .size,
      cocoaHa: +source.pulpsUsed.reduce(
        (accumulator, item) => accumulator + item.pulp.producer.nrCocoaHa,
        ''
      ),
      conservationHa: +source.pulpsUsed.reduce(
        (accumulator, item) => accumulator + item.pulp.producer.nrForestHa,
        ''
      ),
    },
    association: source.pulpsUsed
      ? source.pulpsUsed[0].pulp.producer.association
      : null,
  };

  return BuyerBatchInfoDto;
}
