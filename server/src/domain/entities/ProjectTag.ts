import { Entity } from "../core/Entity";

interface ProjectTagProps {
  name: string;
  team_id: string;
  project_id: string;
  created_at: string;
  updated_at: string;
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
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }

  static create(props: ProjectTagProps, id?: string) {
    const projectTag = new ProjectTag(props, id);

    return projectTag;
  }
}