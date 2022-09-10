import { Document } from "../../../domain/entities/Document/Document";
import { Project } from "../../../domain/entities/Project/Project";
import { Team } from "../../../domain/entities/Team/Team";
import { InMemoryDocumentRepository } from "../../../../tests/repositories/in-memory-document-repository"
import { RemoveDocumentService } from "./remove-document-service";

describe("remve-document-service", () => {
  const inMemoryDocumentRepository = new InMemoryDocumentRepository();

  const team = Team.create({
    name: "Team Test",
    description: "Lorem Ipsum Dolor Sit Amet"
  });

  if(team.isLeft()) return;

  const project = Project.create({
    name: "Project Test From Team Test",
    team_id: team.value.id,
  });

  if(project.isLeft()) return;

  it("should be able to remove a document successfully", async () => {
    const document = Document.create({
      name: "Document Test of Project Test",
      project_id: project.value.id,
      team_id: team.value.id,
      content: "<h2>Document Title Test</h2><p>Paragraph Test</p>"
    });
  
    if(document.isLeft()) return;
  
    inMemoryDocumentRepository.items.push(document.value);

    const removeDocumentService = new RemoveDocumentService(inMemoryDocumentRepository);

    expect(inMemoryDocumentRepository.items).toHaveLength(1);
    await removeDocumentService.execute(document.value.id);
    expect(inMemoryDocumentRepository.items).toHaveLength(0);
  });

  it("should be able to remove a document successfully", async () => {
    const removeDocumentService = new RemoveDocumentService(inMemoryDocumentRepository);

    const resultOrError = await removeDocumentService.execute("");
    expect(resultOrError.isLeft()).toBe(true);
  });
})