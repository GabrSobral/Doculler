import { Entity } from "../core/Entity";

interface DocumentProps {
  name: string;
  team_id: string;
  project_id: string;
  updated_at?: Date;
  readonly created_at?: Date;
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
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }

  static create(props: DocumentProps, id?: string) {
    if(!this.validateName(props.name))
      throw new Error("Invalid user name");

    props.name = props.name.trim();

    const document = new Document({
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return document;
  }

  private static validateName(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255)
      return false;
    else
      return true;
  }
}