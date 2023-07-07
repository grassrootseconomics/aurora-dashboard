import { BaseBatch, mapToBaseBatch } from "../Batch/BaseBatch";
import { Batch } from "../Batch/Batch";
import { mapToPulpHarvesting, PulpHarvesting } from "../Batch/PulpHarvesting";
import { Pulp } from "../Batch/PulpsUsed";

export interface ProducerActivity {
    batches: BaseBatch[];
    pulps: PulpHarvesting[];
}

export function mapToProducerActivity(source: any): ProducerActivity {
    const producerActivityDto: ProducerActivity = {
        batches: source.batches.map((b: Batch) => mapToBaseBatch(b)),
        pulps: source.pulps.map((p: Pulp) => mapToPulpHarvesting(p))
    }

    return producerActivityDto;
}