import { calculateAverage } from "@/util/format/array";
import { Batch } from "./Batch";

export interface BuyerBatchInfo {
    id: number;
    idAssociation: number
    code: string;
    storagePhase: StoragePhase;
    dryingPhase: DryingPhase;
    fermentationPhase: FermentationPhase;
    pulpsPhase: PulpPhase;
    producersPhase: ProducersPhase;
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

//Initial T and Romm T
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
    const BuyerBatchInfoDto: BuyerBatchInfo = {
        id: source.id,
        idAssociation: source.idAssociation,
        code: source.code,
        storagePhase: {
            netWeight: source.storage.netWeight,
            conversionFaction: source.storage.conversionFaction,
            fermentationPercentage: source.storage.fermentationPercentage,
            grainIndex: source.storage.grainIndex
        },
        dryingPhase: {
            daysDrying: source.dryingPhase.totalDryingDays,
            grainHumidity: source.dryingPhase.finalGrainHumidity
        },
        fermentationPhase: {
            genetics: source.fermentationPhase.genetics,
            brixDegrees: source.fermentationPhase.brixDegrees,
            initialT: source.fermentationPhase.dailyReports.find(r => r.day == 1)?.temperatureMass ?? 0,
            roomT: calculateAverage(source.fermentationPhase.dailyReports.map(r => +r.temperatureMass)),
            humidity: source.fermentationPhase.humidity,
            hoursDrained: source.fermentationPhase.hoursDrained,
            nrFlips: source.fermentationPhase.nrFlips,
            totalDays: source.fermentationPhase.totalDays
        },
        pulpsPhase: {
            quality: source.pulpsUsed[0].pulp.quality,
            status: source.pulpsUsed[0].pulp.status
        },
        producersPhase: {
            noProducers: new Set(source.pulpsUsed.map(p => p.pulp.codeProducer)).size,
            cocoaHa: +source.pulpsUsed.reduce((accumulator, item) => accumulator + item.pulp.producer.nrCocoaHa, ""),
            conservationHa: +source.pulpsUsed.reduce((accumulator, item) => accumulator + item.pulp.producer.nrForestHa, "")
        }
    };
  
    return BuyerBatchInfoDto;
}