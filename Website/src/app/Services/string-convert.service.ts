import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringConvertService {

  constructor() { }

  LeftPadNumber(target: number, length: number) {
    let result = target.toString();
    while (result.length < length)
      result = '0' + result;
    return result;
  }
}