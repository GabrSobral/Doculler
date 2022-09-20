import { Either, left, right } from "../../../shared/either";
import { Entity } from "../../core/Entity";

interface TeamMemberProps {
  team_id: string;
  user_id: string;
  readonly created_at?: Date;
}

export class TeamMember extends Entity<TeamMemberProps> {
  private constructor (props: TeamMemberProps, id?: string) {
    super(props, id);
    Object.freeze(this);
  }

  get team_id() {
    return this.props.team_id 
  }
  get user_id() {
    return this.props.user_id 
  }
  get joined_at() {
    return this.props.created_at 
  }

  static create(props: TeamMemberProps, id?: string): TeamMember {
    const teamMember = new TeamMember({
      ...props,
      created_at: props.created_at ?? new Date()
    }, id);

    return teamMember;
  }
}