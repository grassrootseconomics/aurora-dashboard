import { Producer } from "../Producer/Producer";

export interface PulpsUsed {
    id: number;
    codeBatch: string;
    idPulp: number;
    pulp: Pulp
}

export interface Pulp {
    id: number;
    codeProducer: string; 
    collectionDate: string;
    quality: string;
    status: string;
    genetics: string;
    totalPulpKg: number;
    pricePerKg: number;
    totalPrice: number;
    producer: Producer
}