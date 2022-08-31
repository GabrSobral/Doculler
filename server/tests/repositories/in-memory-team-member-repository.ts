import { TeamMemberIndentifierProps, TeamMemberRepository } from '../../src/application/repositories/team-member-repository';
import { TeamMember } from "../../src/domain/entities/TeamMember";

export class InMemoryTeamMemberRepository implements TeamMemberRepository {
  public items: TeamMember[] = []

  async add( data: TeamMemberIndentifierProps ): Promise<TeamMember> {
    const newTeamMember = TeamMember.create({
      team_id: data.team_id,
      user_id: data.user_id
    });

    this.items.push(newTeamMember);

    return newTeamMember;
  }

  async deleteById( data: TeamMemberIndentifierProps ): Promise<void> {
    this.items = this.items.filter(item => item.team_id === data.team_id && item.user_id === data.user_id )
  }

  async getById( data: TeamMemberIndentifierProps ) {
    const teamMember = this.items.find(item => item.team_id === data.team_id && item.user_id === data.user_id);

    if(!teamMember)
      return null;

    return teamMember;
  }
}