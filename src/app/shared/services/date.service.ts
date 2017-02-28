import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  getMyDate(value): any {
    if (value === '' || value === null) { return ''; }
    console.log(value);
    let d = new Date(value);
    return {
      date: {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      }
    };
  }

}
