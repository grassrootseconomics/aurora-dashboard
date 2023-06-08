import { calculateAverage, calculateWeightedAverage } from "@/util/format/array";
import { convertToSimpleDate } from "@/util/format/date";
import { Batch } from "./Batch";
import { DailyReport, Flip } from "./Fermentation";

export interface BatchInfo {
    id: number;
    idAssociation: number
    code: string;
    salesPhase: SalesPhase;
    storagePhase: StoragePhase;
    dryingPhase: DryingPhase;
    fermentationPhase: FermentationPhase;
    pulpsPhase: PulpPhase;
    producersPhase: ProducersPhase;
}

export interface SalesPhase {
    id: number;
    buyerName: string;
    lotCode: string;
    negotiationType: string;
    negotiationTerms: string;
    destination: string;
    currency: string;
    priceKg: number;
    totalValue: number;
    negatiationDate: string;
}

export interface StoragePhase {
    id: number;
    dayEntry: string | Date;
    netWeight: number;
    conversionFaction: number;
    fermentationPercentage: number;
    grainIndex: number;
    sensoryProfile: string;
    score: number;
}

export interface DryingPhase {
    id: number;
    startDrying: string;
    daysDrying: number;
    grainHumidity: number; 
}

export interface FermentationPhase {
    id: number;
    cocoaType: string;
    fermentationStartDate: string;
    genetics: string;
    brixDegrees: number;
    batchWeight: number;
    humidity: number;
    hoursDrained: number;
    nrFlips: number;
    totalDays: number;
    dailyReports: DailyReport[];
    flips: Flip[];
    initialT: number;
    roomT: number | null;
}

export interface PulpPhase {
    harvestingDate: string;
    quality: string;
    status: string;
    collectionGenetics: string;
    pulpKg: number;
    priceKg: number;
}

export interface ProducersPhase {
    noProducers: number;
    cocoaHa: number;
    conservationHa: number;
}

export function mapToBatchInfo(source: Batch): BatchInfo {
    const BuyerBatchInfoDto: BatchInfo = {
        id: source.id,
        idAssociation: source.idAssociation,
        code: source.code,
        salesPhase: {
            id: source.sale?.id,
            buyerName: source.sale?.buyer,
            lotCode: source.sale?.lotCode,
            negotiationType: source.sale?.negotiation,
            negotiationTerms: source.sale?.negotiationTerm,
            destination: source.sale?.destination,
            currency: source.sale?.currency,
            priceKg: source.sale?.pricePerKg,
            totalValue: source.sale?.totalValue,
            negatiationDate: convertToSimpleDate(source.sale?.negotiationDate)
        },
        storagePhase: {
            id: source.storage.id,
            dayEntry: convertToSimpleDate(source.storage.dayEntry),
            netWeight: source.storage.netWeight,
            conversionFaction: source.storage.conversionFaction,
            fermentationPercentage: source.storage.fermentationPercentage,
            grainIndex: source.storage.grainIndex,
            sensoryProfile: source.storage.sensoryProfile,
            score: source.storage.score
        },
        dryingPhase: {
            id: source.dryingPhase.id,
            startDrying: convertToSimpleDate(source.dryingPhase.startDate),
            daysDrying: source.dryingPhase.totalDryingDays,
            grainHumidity: source.dryingPhase.finalGrainHumidity
        },
        fermentationPhase: {
            id: source.fermentationPhase.id,
            cocoaType: source.fermentationPhase.cocoaType,
            fermentationStartDate: convertToSimpleDate(source.fermentationPhase.startDate),
            genetics: source.fermentationPhase.genetics,
            brixDegrees: source.fermentationPhase.brixDegrees,
            batchWeight: source.fermentationPhase.weight,
            humidity: source.fermentationPhase.humidity,
            hoursDrained: source.fermentationPhase.hoursDrained,
            nrFlips: source.fermentationPhase.nrFlips,
            totalDays: source.fermentationPhase.totalDays,
            dailyReports: source.fermentationPhase.dailyReports,
            flips: source.fermentationPhase.flips,
            initialT: source.fermentationPhase.dailyReports[0]?.temperatureMass,
            roomT: calculateAverage(source.fermentationPhase.dailyReports.map(d => d.temperatureMass))
        },
        pulpsPhase: {
            harvestingDate: convertToSimpleDate(source.pulpsUsed[0].pulp.collectionDate),
            quality: source.pulpsUsed[0].pulp.quality,
            status: source.pulpsUsed[0].pulp.status,
            collectionGenetics: source.pulpsUsed[0].pulp.genetics,
            pulpKg: +source.pulpsUsed.reduce((acc, num) => acc + num.pulp.totalPulpKg, ""),
            priceKg: calculateWeightedAverage(source.pulpsUsed.map(p => ({value: p.pulp.pricePerKg, weight: p.pulp.totalPulpKg})))
        },
        producersPhase: {
            noProducers: new Set(source.pulpsUsed.map(p => p.pulp.codeProducer)).size,
            cocoaHa: +source.pulpsUsed.reduce((accumulator, item) => accumulator + item.pulp.producer.nrCocoaHa, ""),
            conservationHa: +source.pulpsUsed.reduce((accumulator, item) => accumulator + item.pulp.producer.nrForestHa, "")
        }
    };
  
    return BuyerBatchInfoDto;
}