import { Entity } from "../core/Entity";

interface UserProps {
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export class User extends Entity<UserProps> {
  private constructor (props: UserProps, id?: string) {
    super(props, id)
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
    return this.props.created_at 
  }
  get updated_at() {
    return this.props.updated_at 
  }

  static create(props: UserProps, id?: string) {
    const user = new User({
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return user;
  }
}