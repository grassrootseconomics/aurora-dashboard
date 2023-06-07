export interface Sale {
    id: number;
    codeBatch: string;
    buyer: string;
    lotCode: string;
    negotiation: string;
    negotiationTerm: string;
    negotiationDate: string;
    destination: string;
    currency: string;
    pricePerKg: number;
    totalValue: number;
}