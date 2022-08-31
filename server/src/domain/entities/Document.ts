import { Entity } from "../core/Entity";

interface DocumentProps {
  name: string;
  team_id: string;
  project_id: string;
}

export class Document extends Entity<DocumentProps> {
  private constructor (props: DocumentProps, id?: string) {
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

  static create(props: DocumentProps, id?: string) {
    const document = new Document(props, id);

    return document;
  }
}