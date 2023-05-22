export class Dataset {
    label: string;
    datas: (number | [number, number] | null)[];
    color: string;

    constructor(label: string, datas: (number | [number, number] | null)[], color: string) {
        this.label = label;
        this.datas = datas;
        this.color = color;
    }
}