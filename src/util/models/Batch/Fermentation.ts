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
    type: string;
    time: number;
    temp: number;
    ambient: number;
    humidity: number;
}

export interface DailyReport {
    phCotiledon: number;
    phMass: number;
    temperatureMass: number;
}