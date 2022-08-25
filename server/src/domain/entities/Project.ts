import { Entity } from "../core/Entity";

interface ProjectProps {
  name: string;
  description: string;
  team_id: string;
  created_at?: Date;
  updated_at: Date;
}

export class Project extends Entity<ProjectProps> {
  private constructor (props: ProjectProps, id?: string) {
    super(props, id)
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
    return this.props.created_at 
  }
  get updated_at() { 
    return this.props.updated_at 
  }

  static create(props: ProjectProps, id?: string) {
    const project = new Project({
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return project;
  }
}