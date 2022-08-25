import { Entity } from "../core/Entity";

interface DocumentProps {
  name: string;
  team_id: string;
  project_id: string;
  created_at: string;
  updated_at: string;
}

export class Document extends Entity<DocumentProps> {
  private constructor (props: DocumentProps, id?: string) {
    super(props, id)
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
    return this.props.created_at 
  }
  get updated_at() { 
    return this.props.updated_at 
  }

  static create(props: DocumentProps, id?: string) {
    const document = new Document({
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    }, id);

    return document;
  }
}