import crypto from 'crypto';

export abstract class Entity<T> {
  protected readonly _id: string;
  protected readonly _created_at: Date;
  protected _updated_at: Date;
  protected props: T;

  constructor (props: T, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this._created_at = new Date();
    this._updated_at = new Date();
    this.props = props;
  }
}