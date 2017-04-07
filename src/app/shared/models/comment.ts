import * as _ from 'lodash';

export class Comment {

  public id?: number;
  public text: string;
  public user_id?: any;
  public task_id?: any;
  public created_at?: string;
  public updated_at?: string;

  public task?: any;
  public user?: any;

  constructor(comment: Comment) {
    _.forOwn(comment, (value, key) => {
      this[key] = value;
    });
  }
}
