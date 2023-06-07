import { Fermentation } from "./Fermentation";
import { PulpsUsed } from "./PulpsUsed";
import { Sale } from "./Sale";

export interface Batch {
    id: number;
    idAssociation: number
    code: string;
    dryingPhase: DryingPhase
    fermentationPhase: Fermentation;
    pulpsUsed: PulpsUsed[];
    sale: Sale;
    storage: StoragePhase;
}

export interface StoragePhase {
    id: number;
    codeBatch: string;
    dayEntry: string;
    netWeight: number;
    conversionFaction: number;
    fermentationPercentage: number;
    grainIndex: number;
    sensoryProfile: string;
    score: number;
}

export interface DryingPhase {
    codeBatch: string;
    endDate: string;
    finalGrainHumidity: number;
    id: number;
    startDate: string;
    totalDryingDays: number;
}