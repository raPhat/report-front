import * as _ from 'lodash';

export class Project {

  public id?: number;
  public name: string;
  public description: string;
  public start?: string;
  public image?: any;
  public logs?: any[];
  public user_id?: any;
  public created_at?: string;
  public updated_at?: string;

  constructor(project: Project) {
    _.forOwn(project, (value, key) => {
      this[key] = value;
    });
  }

}
