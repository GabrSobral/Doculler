import { InvalidNameError } from "../../errors/user-errors/invalid-name-error";
import { Either, left, right } from "../../../shared/either";
import { Entity } from "../../core/Entity";
import { Name } from "./name.value-object";

interface TeamProps {
  name: Name;
  description: string;
  updated_at?: Date;
  readonly created_at?: Date;
}

export class Team extends Entity<TeamProps> {
  private constructor (props: TeamProps, id?: string) {
    super(props, id);
    Object.freeze(this);
  }

  get id() { 
    return this._id 
  }
  get name() { 
    return this.props.name 
  }
  get description() { 
    return this.props.description 
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }

  static create(props: TeamData, id?: string): Either<InvalidNameError, Team> {
    const nameOrError = Name.create(props.name);

    if(nameOrError.isLeft())
      return left(nameOrError.value);

    const name = nameOrError.value;
    
    const team = new Team({
      ...props,
      name,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return right(team);
  }
}