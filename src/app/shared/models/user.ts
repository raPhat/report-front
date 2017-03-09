import * as _ from 'lodash';

export class User {
  public id: number;
  public email: string;
  public name: string;
  public role: string;
  public users?: User[];
  public students?: User[];
  public mentors?: User[];
  public supervisors?: User[];
  public created_at: string;
  public updated_at: string;

  constructor(user: User) {
    _.forOwn(user, (value, key) => {
      this[key] = value;
    });
  }
}
