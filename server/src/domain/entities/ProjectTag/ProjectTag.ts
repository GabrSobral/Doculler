import { InvalidNameError } from "../../errors/user-errors/invalid-name-error";
import { Either, left, right } from "../../../shared/either";
import { Entity } from "../../core/Entity";
import { Name } from "./name.value-object";

interface ProjectTagProps {
  name: Name;
  team_id: string;
  project_id: string;
  updated_at?: Date;
  readonly created_at?: Date;
}

export class ProjectTag extends Entity<ProjectTagProps> {
  private constructor (props: ProjectTagProps, id?: string) {
    super(props, id);
    Object.freeze(this);
  }

  get id() {
    return this._id 
  }
  get name() {
    return this.props.name 
  }
  get team_id() {
    return this.props.team_id 
  }
  get project_id() {
    return this.props.project_id 
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }

  static create(props: ProjectTagData, id?: string): Either<InvalidNameError | Error, ProjectTag> {
    const nameOrError = Name.create(props.name);

    if(nameOrError.isLeft())
      return left(new InvalidNameError(props.name));

    const projectTag = new ProjectTag({
      ...props,
      name: nameOrError.value,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return right(projectTag);
  }
}