import { Entity } from "../core/Entity";

interface TeamProps {
  name: string;
  description: string;
}

export class Team extends Entity<TeamProps> {
  private constructor (props: TeamProps, id?: string) {
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
  get created_at() {
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }

  static create(props: TeamProps, id?: string) {
    const team = new Team(props, id);

    return team;
  }
}