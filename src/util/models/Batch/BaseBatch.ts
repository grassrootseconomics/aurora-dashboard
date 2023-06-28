import { convertToSimpleDate } from "@/util/format/date";
import { Batch } from "./Batch";

export interface BaseBatch {
    batchCode: string;
    processingDate: string;
    sold: 'Yes' | 'No';
}

export function mapToBaseBatch(source: Batch): BaseBatch {
    const baseBatchDto: BaseBatch = {
        batchCode: source.code,
        processingDate: convertToSimpleDate(source.fermentationPhase.startDate),
        sold: source.sale != null ? 'Yes' : 'No'
    }

    return baseBatchDto;
}