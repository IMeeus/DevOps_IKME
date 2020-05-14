import * as math from 'mathjs';
import { QuarterData } from "@services/plan-api.service";

export class Plan {
    constructor(
        private id: number,
        private name: string,
        private created: Date,
        private data: QuarterData[]) { }

    public SetTotal(quarterIndex: number, newValue: number) {
        let quarter: QuarterData = this.data[quarterIndex];

        quarter.total = newValue;
        quarter.error = quarter.total - quarter.sun - quarter.wind - quarter.nuclear - quarter.biomassa - quarter.steg; 
    }
    
    SetSun(quarterIndex: number, newValue: number) {
        let quarter: QuarterData = this.data[quarterIndex];
        let oldValue: number = quarter.sun;
        
        quarter.sun = newValue;
        quarter.total -= (oldValue - newValue);
    }

    SetWind(quarterIndex: number, newValue: number) {
        let quarter: QuarterData = this.data[quarterIndex];
        let oldValue: number = quarter.wind;

        quarter.wind = newValue;
        quarter.total -= (oldValue - newValue);
    }

    SetNuclear(quarterIndex: number, newValue: number) {
        let quarter: QuarterData = this.data[quarterIndex];
        let oldValue: number = quarter.nuclear;

        quarter.nuclear = newValue;
        quarter.total -= (oldValue - newValue);
    }

    SetSteg(quarterIndex: number, newValue: number) {
        let quarter: QuarterData = this.data[quarterIndex];
        let oldValue: number = quarter.steg;

        quarter.steg = newValue;
        quarter.total -= (oldValue - newValue);
    }

    SetBiomass(quarterIndex: number, newValue: number) {
        let quarter: QuarterData = this.data[quarterIndex];
        let oldValue: number = quarter.biomassa;

        quarter.biomassa = newValue;
        quarter.total -= (oldValue - newValue);
    }
    
    updateError(quarterIndex:number){
        let quarter: QuarterData = this.data[quarterIndex]
        quarter.error = quarter.total - quarter.sun - quarter.wind - quarter.nuclear - quarter.biomassa - quarter.steg;
    }

    get Id(): number {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }

    set Name(newValue: string) {
        this.name = newValue;
    }

    get Date(): Date {
        return this.created;
    }

    get Data(): QuarterData[] {
        return this.data;
    }

    get TotalSun(): number {
        return math.sum(this.data.map(res => res.sun));
    }

    get TotalWind(): number {
        return math.sum(this.data.map(res => res.wind));
    }

    get TotalNuclear(): number {
        return math.sum(this.data.map(res => res.nuclear));
    }

    get TotalSteg(): number {
        return math.sum(this.data.map(res => res.steg));
    }

    get TotalBiomass(): number {
        return math.sum(this.data.map(res => res.biomassa));
    }   
}