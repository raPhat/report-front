import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Pipe({
  name: 'notifyOrder'
})
export class NotifyOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if ( args === 'Today' ) {
      const v = _.filter(value, (o: any) => {
        const today = moment().format('YYYY-MM-DD');
        return o.created_at.indexOf( today ) > -1;
      });
      return _.orderBy(v, ['created_at'], ['desc']);
    } else {
      return _.orderBy(value, ['created_at'], ['desc']);
    }
  }

}
