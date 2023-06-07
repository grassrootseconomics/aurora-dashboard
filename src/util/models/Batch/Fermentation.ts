export interface Fermentation {
    id: number;
    codeBatch: string;
    cocoaType: string;
    startDate: string;
    genetics: string;
    weight: number;
    brixDegrees: number;
    humidity: number;
    hoursDrained: number;
    totalDays: number;
    nrFlips: number;
    flips: Flip[];
    dailyReports: DailyReport[];
}

export interface Flip {
    id: number;
    index: number;
    type: string;
    time: number;
    temp: number;
    ambient: number;
    humidity: number;
    idFermentationPhase: number
}

export interface DailyReport {
    day: number;
    id: number;
    idFermentationPhase: number;
    phCotiledon: number;
    phMass: number;
    temperatureMass: number;
}