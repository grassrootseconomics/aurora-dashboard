export class BasicProducer {
    producerCode: number;
    name: string;
    lastName: string;
    village: string;
    age: number;
    cocoaHa: string;
    location: string;
    conservationHa: string;

    constructor(producerCode: number, name: string, lastName: string, village: string, age: number, cocoaHa: string, location: string, conservationHa: string) {
        this.producerCode = producerCode;
        this.name = name;
        this.lastName = lastName;
        this.village = village;
        this.age = age;
        this.cocoaHa = cocoaHa;
        this.location = location;
        this.conservationHa = conservationHa;
    }
}