import { Entity } from "../core/Entity";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  private constructor (props: UserProps, id?: string) {
    super(props, id);
    Object.freeze(this);
  }

  get id() {
    return this._id 
  }
  get name() {
    return this.props.name 
  }
  get email() {
    return this.props.email 
  }
  get password() {
    return this.props.password 
  }
  get created_at() {
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }

  static create(props: UserProps, id?: string) {
    const user = new User(props, id);

    return user;
  }
}