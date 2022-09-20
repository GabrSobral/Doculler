import { InvalidNameError } from "../../errors/user-errors/invalid-name-error";
import { Either, left, right } from "../../../shared/either";
import { Entity } from "../../core/Entity";
import { Name } from "./name.value-object";

interface DocumentProps {
  name: Name;
  team_id: string;
  content: string;
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
  // Document Content ==============================================================================
  get content() {              // Getter
    return this.props.content;
  }
  set content(value: string) { // Setter
    this.props.content = value;
  }
  // ===============================================================================================

  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at!;
  }
  set updated_at(value: Date) { // Setter
    this.props.updated_at = value;
  }

  static create(props: DocumentData, id?: string): Either<InvalidNameError | Error, Document> {
    const nameOrerror = Name.create(props.name);

    if(nameOrerror.isLeft())
      return left(new InvalidNameError(props.name));

    const document = new Document({
      ...props,
      name: nameOrerror.value,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return right(document);
  }
}