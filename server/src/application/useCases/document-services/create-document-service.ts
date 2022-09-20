import { DocumentRepository } from "../../repositories/document-repository";
import { ProjectRepository } from "../../repositories/project-repository";
import { TeamRepository } from "../../repositories/team-repository";
import { Document } from "../../../domain/entities/Document/Document";
import { Either, left, right } from "../../../shared/either";

interface CreatDocumentServiceRequest {
  name: string;
  team_id: string;
  project_id: string;
  content: string;
}

export class CreateDocumentService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly teamRepository: TeamRepository,
    private readonly projectRepository: ProjectRepository
  ) {}

  async execute(request: CreatDocumentServiceRequest): Promise<Either<Error, Document>> {
    const { name, project_id, team_id, content } = request;

    if(!name)
      return left(new Error("No document name was provided"));

    if(!content)
      return left(new Error("No document content was provided"));

    if(!project_id)
      return left(new Error("No document 'project_id' was provided"));

    const project = await this.projectRepository.getById(project_id);

    if(!project)
      return left(new Error("No project was found with this 'project_id'"));

    if(!team_id)
      return left(new Error("No document 'team_id' was provided"));

    const team = await this.teamRepository.findById(team_id);

    if(!team)
      return left(new Error("No project was found with this 'team_id'"));

    const documentOrError = Document.create({
      name,
      project_id,
      team_id,
      content
    });

    if(documentOrError.isLeft())
      return left(new Error("Error on try to create a document instance"));

    await this.documentRepository.create(documentOrError.value);

    return right(documentOrError.value);
  }
}