import { Entity } from "../core/Entity";

interface ProjectMemberProps {
  project_id: string;
  user_id: string;
  team_id: string;
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
    return this._created_at
  }

  static create(props: ProjectMemberProps, id?: string) {
    const projectMember = new ProjectMember(props, id);

    return projectMember;
  }
}