import { Document } from "../../../domain/entities/Document/Document";
import { Project } from "../../../domain/entities/Project/Project";
import { Team } from "../../../domain/entities/Team/Team";

import { InMemoryDocumentRepository } from "../../../../tests/repositories/in-memory-document-repository";
import { UpdateDocumentContentService } from "./update-document-content-service";

describe("update-document-content-service", () => {
  it("should be able to update the document content", async () => {
    const inMemoryDocumentRepository = new InMemoryDocumentRepository();

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });
  
    if(team.isLeft())
      throw new Error();
  
    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.value.id
    });
  
    if(project.isLeft())
      throw new Error();

    const document = Document.create({
      name: "Document Test",
      content: "<h2>Lorem Ipsum</h2><p>Dolor Sit Amet</p>",
      project_id: project.value.id,
      team_id: team.value.id,
    });

    if(document.isLeft())
      throw new Error();

    const lastUpdatedAt = document.value.updated_at;

    inMemoryDocumentRepository.items.push(document.value);

    const updateDocumentContentService = new UpdateDocumentContentService(inMemoryDocumentRepository);

    const documentUpdated = await updateDocumentContentService.execute({
      content: "Document changed",
      document_id: document.value.id
    });

    if(documentUpdated.isLeft())
      throw new Error();

    expect(documentUpdated.value.content).toBe("Document changed");
    expect(documentUpdated.value.updated_at).not.toEqual(lastUpdatedAt);
  });

  it("should not be able to update the document content without a valid 'document_id'", async () => {
    const inMemoryDocumentRepository = new InMemoryDocumentRepository();

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });
  
    if(team.isLeft())
      throw new Error();
  
    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.value.id
    });
  
    if(project.isLeft())
      throw new Error();

    const document = Document.create({
      name: "Document Test",
      content: "<h2>Lorem Ipsum</h2><p>Dolor Sit Amet</p>",
      project_id: project.value.id,
      team_id: team.value.id
    });

    if(document.isLeft())
      throw new Error();

    inMemoryDocumentRepository.items.push(document.value);

    const updateDocumentContentService = new UpdateDocumentContentService(inMemoryDocumentRepository);

    const documentUpdated = await updateDocumentContentService.execute({
      content: "Document changed",
      document_id: document.value.id + "12312"
    });

    expect(documentUpdated.isLeft())
      .toBe(true);
  });

  it("should not be able to update the document content without 'document_id'", async () => {
    const inMemoryDocumentRepository = new InMemoryDocumentRepository();

    const team = Team.create({
      name: "Team Test",
      description: "Lorem Ipsum Dolor Sit Amet"
    });
  
    if(team.isLeft())
      throw new Error();
  
    const project = Project.create({
      name: "Project Test",
      description: "Lorem Ipsum Dolor Sit Amet",
      team_id: team.value.id
    });
  
    if(project.isLeft())
      throw new Error();

    const document = Document.create({
      name: "Document Test",
      content: "<h2>Lorem Ipsum</h2><p>Dolor Sit Amet</p>",
      project_id: project.value.id,
      team_id: team.value.id
    });

    if(document.isLeft())
      throw new Error();

    inMemoryDocumentRepository.items.push(document.value);

    const updateDocumentContentService = new UpdateDocumentContentService(inMemoryDocumentRepository);

    const documentUpdated = await updateDocumentContentService.execute({
      content: "Document changed",
      document_id: ""
    });

    expect(documentUpdated.isLeft())
      .toBe(true);
  });
})