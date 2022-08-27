import { Entity } from "../core/Entity";

interface TeamProps {
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Team extends Entity<TeamProps> {
  private constructor (props: TeamProps, id?: string) {
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
  get created_at() { 
    return this.props.created_at 
  }
  get updated_at() { 
    return this.props.updated_at 
  }

  static create(props: TeamProps, id?: string) {
    const team = new Team({
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date()
    }, id);

    return team;
  }
}