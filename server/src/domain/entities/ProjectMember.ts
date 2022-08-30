import { Entity } from "../core/Entity";

interface ProjectMemberProps {
  project_id: string;
  team_member_id: string;
  team_id: string;
  joined_at?: Date;
}

export class ProjectMember extends Entity<ProjectMemberProps> {
  private constructor (props: ProjectMemberProps, id?: string) {
    super(props, id)
  }
  
  get id() {
    return this._id 
  }
  get project_id() {
    return this.props.project_id
  }
  get team_member_id() {
    return this.props.team_member_id
  }
  get team_id() {
    return this.props.team_id
  }
  get joined_at() {
    return this.props.joined_at
  }

  static create(props: ProjectMemberProps, id?: string) {
    const projectMember = new ProjectMember({
      ...props,
      joined_at: props.joined_at ?? new Date(),
    }, id);

    return projectMember;
  }
}