import { Producer } from "../Producer/Producer";

export interface PulpsUsed {
    id: number;
    codeBatch: string;
    idPulp: number;
    pulp: Pulp
}

export interface Pulp {
    batchesUsedFor: any;
    id: number;
    codeProducer: string; 
    codeBatch: string;
    collectionDate: string;
    quality: string;
    status: string;
    genetics: string;
    totalPulpKg: number;
    pricePerKg: number;
    totalPrice: number;
    producer: Producer
}