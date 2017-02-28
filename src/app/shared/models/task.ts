import * as _ from 'lodash';

export class Task {

  public id?: number;
  public name: string;
  public description: string;
  public start?: string;
  public image?: any;
  public type_id?: any;
  public project_id?: any;
  public created_at?: string;
  public updated_at?: string;

  constructor(task: Task) {
    _.forOwn(task, (value, key) => {
      this[key] = value;
    });
  }

}
