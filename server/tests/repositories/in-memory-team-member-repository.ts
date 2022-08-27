import { DeleteByIdProps, TeamMemberDataAdd } from '../../src/application/repositories/team-member-repository';
import { TeamMember } from "../../src/domain/entities/TeamMember";

export class InMemoryTeamMemberRepository {
  public items: TeamMember[] = []

  async add( data: TeamMemberDataAdd ): Promise<TeamMember> {
    const newTeamMember = TeamMember.create({
      team_id: data.team_id,
      user_id: data.user_id
    });

    this.items.push(newTeamMember);

    return newTeamMember;
  }

  async deleteById( data: DeleteByIdProps ): Promise<void> {
    this.items = this.items.filter(item => item.team_id === data.team_id && item.user_id === data.team_member_id )
  }
}