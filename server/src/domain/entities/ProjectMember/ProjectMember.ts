import { Either, left, right } from "../../../shared/either";
import { Entity } from "../../core/Entity";

interface ProjectMemberProps {
  project_id: string;
  user_id: string;
  team_id: string;
  joined_at?: Date;
}

export class ProjectMember extends Entity<ProjectMemberProps> {
  private constructor (props: ProjectMemberProps, id?: string) {
    super(props, id);
    Object.freeze(this);
  }
  
  get id() {
    return this._id 
  }
  get project_id() {
    return this.props.project_id
  }
  get user_id() {
    return this.props.user_id
  }
  get team_id() {
    return this.props.team_id
  }
  get joined_at() {
    return this.props.joined_at
  }

  static create(props: ProjectMemberProps, id?: string): Either<Error, ProjectMember> {
    if(!props.project_id)
      return left(new Error("No project id was provided"));

    if(!props.team_id)
      return left(new Error("No team id was provided"));

    const projectMember = new ProjectMember({
      ...props,
      joined_at: props.joined_at ?? new Date()
    }, id);

    return right(projectMember);
  }
}