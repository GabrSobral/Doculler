import { ProjectMember } from "src/domain/entities/ProjectMember";

export interface ProjectMemberRepository {
  add: ( data: ProjectMember ) => Promise<void>;
}