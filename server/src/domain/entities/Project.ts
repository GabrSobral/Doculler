import { Entity } from "../core/Entity";

interface ProjectProps {
  name: string;
  description: string;
  team_id: string;
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
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }

  static create(props: ProjectProps, id?: string) {
    const project = new Project(props, id);

    return project;
  }
}