import { Entity } from "../core/Entity";

interface TeamMemberProps {
  team_id: string;
  user_id: string;
  joined_at: Date;
}

export class TeamMember extends Entity<TeamMemberProps> {
  private constructor (props: TeamMemberProps, id?: string) {
    super(props, id)
  }

  get id() {
    return this._id 
  }
  get team_id() {
    return this.props.team_id 
  }
  get user_id() {
    return this.props.user_id 
  }
  get joined_at() {
    return this.props.joined_at 
  }

  static create(props: TeamMemberProps, id?: string) {
    const teamMember = new TeamMember({
      ...props,
      joined_at: props.joined_at ?? new Date()
    }, id);

    return teamMember;
  }
}