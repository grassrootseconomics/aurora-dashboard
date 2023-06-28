import { convertToSimpleDate } from "@/util/format/date";
import { Pulp } from "./PulpsUsed";

export interface PulpHarvesting {
    id: number;
    batchCode: string;
    date: string;
    weight: number;
    sellingPrice: number;
    certificate: string;
}

export function mapToPulpHarvesting(source: Pulp): PulpHarvesting {
    const pulpHarvestingDto: PulpHarvesting = {
        id: source.id,
        batchCode: source.batchesUsedFor ? source.batchesUsedFor[0]?.codeBatch : "",
        date: convertToSimpleDate(source.collectionDate),
        weight: source.totalPulpKg,
        sellingPrice: source.pricePerKg,
        certificate: ""
    }

    return pulpHarvestingDto;
}