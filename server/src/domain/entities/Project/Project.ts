import { InvalidNameError } from "../../errors/user-errors/invalid-name-error";
import { Either, left, right } from "../../../shared/either";
import { Entity } from "../../core/Entity";
import { Name } from "./name.value-object";

interface ProjectProps {
  name: Name;
  description?: string;
  team_id: string;
  updated_at?: Date;
  readonly created_at?: Date;
}

export class Project extends Entity<ProjectProps> {
  private constructor (props: ProjectProps, id?: string) {
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
  get team_id() { 
    return this.props.team_id 
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }

  static create(props: ProjectData, id?: string): Either<InvalidNameError | Error, Project> {
    const nameOrError = Name.create(props.name);

    if(nameOrError.isLeft())
      return left(nameOrError.value);

    const name = nameOrError.value;

    const project = new Project({
      ...props,
      name,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return right(project);
  }
}