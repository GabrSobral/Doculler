import { ProjectMember } from "src/domain/entities/ProjectMember";

interface ProjectMemberRepository {
  add: ( data: ProjectMember ) => Promise<void>;
  delete: ( data: ProjectMember ) => Promise<void>;
}