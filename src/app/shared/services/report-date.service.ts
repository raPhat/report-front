import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ReportDateService {

  constructor() { }

  getDateUtilNow(dateString) {
    // '09/01/2016'
    let dates = [];
    let newDate: any = moment(dateString, 'MM/DD/YYYY');

    let today: any = moment();

    let startFirst = moment(newDate._d).startOf('isoWeek');
    let endFirst = moment(newDate._d).endOf('isoWeek');
    dates.push({
        'start': startFirst.format('L'),
        'end': endFirst.format('L')
      });

    while (true) {
      let check = moment().diff(newDate, 'days');

      if (check < 7) {
        break;
      }

      let startNext = moment(newDate._d).add(1, 'weeks').startOf('isoWeek');
      let endNext =  moment(newDate._d).add(1, 'weeks').endOf('isoWeek');
      dates.push({
        'start': startNext.format('L'),
        'end': endNext.format('L')
      });
      newDate = startNext;
    }

    return dates;
  }

}
