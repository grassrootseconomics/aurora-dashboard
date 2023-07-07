import { Association } from "../BasicAssociation";

export interface Producer {
    id: number;
    code: number;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    gender: string;
    birthYear: number;
    idDepartment: number;
    municipiality: string;
    village: string;
    idAssociation: number;
    farmName: string;
    location: string;
    nrOfHa: number;
    nrCocoaHa: number;
    nrForestHa: number;
    nrCocoaLots: number;
    nrWaterSources: number;
    wildlife: string;
    association: Association
};