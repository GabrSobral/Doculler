import { InvalidEmailError } from "../../../../src/domain/errors/user-errors/invalid-email-error";
import { InvalidNameError } from "../../../../src/domain/errors/user-errors/invalid-name-error";
import { Either, left, right } from "../../../../src/shared/either";
import { Entity } from "../../core/Entity";
import { Email } from "./email.value-object";
import { Name } from "./name.value-object";

interface UserProps {
  name: Name;
  email: Email;
  password: string;
  updated_at?: Date;
  readonly created_at?: Date;
}

export class User extends Entity<UserProps> {
  private constructor (props: UserProps, id?: string) {
    super(props, id);
    Object.freeze(this);
  }

  get id() {
    return this._id ;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password ;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }

  static create(props: UserData, id?: string): Either<InvalidEmailError | InvalidNameError, User> {
    const nameOrError = Name.create(props.name);
    const emailOrError = Email.create(props.email);

    if(nameOrError.isLeft())
      return left(nameOrError.value);
        
    if(emailOrError.isLeft())
      return left(emailOrError.value);

    const name = nameOrError.value;
    const email = emailOrError.value;

    const user = new User({
      ...props,
      name,
      email,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return right(user);
  }
}