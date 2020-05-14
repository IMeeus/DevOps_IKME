import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class IkmeEliadataService {

  data:dataObj;
  constructor(private http:HttpClient) {
    this.data={
      kern:[],
      zon:[],
      wind:[],
      gas:[],
      steg:[]
    }
    for(var i=0;i<96;i++){
      //this.data.push(_.random(300,500))
      this.data.kern.push(_.random(400,800));
      this.data.zon.push(_.random(100,250));
      this.data.wind.push(_.random(50,200));
      this.data.gas.push(_.random(300,600));
      this.data.steg.push(_.random(200,450));
    }
  }

  GetData(dag:string='2020-04-20'){
    return this.http.get(`http://publications.elia.be/Publications/Publications/AvailableEnergy.v6.svc/GetAvailableEnergyVolumes?day=${dag}`)
  }
}
export interface dataObj{
  kern:number[],
  zon:number[],
  wind:number[],
  gas:number[],
  steg:number[]
}