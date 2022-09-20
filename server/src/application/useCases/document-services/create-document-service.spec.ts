import { Document } from '../../../domain/entities/Document/Document';
import { Project } from '../../../domain/entities/Project/Project';
import { Team } from '../../../domain/entities/Team/Team';

import { InMemoryDocumentRepository } from '../../../../tests/repositories/in-memory-document-repository';
import { InMemoryProjectRepository } from '../../../../tests/repositories/in-memory-project-repository';
import { InMemoryTeamRepository } from '../../../../tests/repositories/in-memory-team-repository';

import { CreateDocumentService } from './create-document-service';

describe("create-document-service", () => {
  const inMemoryDocumentRepository = new InMemoryDocumentRepository();
  const inMemoryProjectRepository = new InMemoryProjectRepository();
  const inMemoryTeamRepository = new InMemoryTeamRepository();

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

  const document = Document.create({
    name: "Document Test of Project Test",
    project_id: project.value.id,
    team_id: team.value.id,
    content: "<h2>Document Title Test</h2><p>Paragraph Test</p>"
  });

  if(document.isLeft()) return;

  inMemoryProjectRepository.items.push(project.value);
  inMemoryTeamRepository.items.push(team.value);

  const createDocumentService = new CreateDocumentService(
    inMemoryDocumentRepository,
    inMemoryTeamRepository,
    inMemoryProjectRepository,
  );

  it("should be able to create a new document", async () => {
    const documentResultOrError = await createDocumentService.execute({
      name: document.value.name.value,
      project_id: project.value.id,
      team_id: team.value.id,
      content: document.value.content 
    });

    expect(documentResultOrError.isRight()).toBe(true);
  });

  it("should not be able to create a new document without 'name'", async () => {
    const documentResultOrError = await createDocumentService.execute({
      name: "",
      project_id: project.value.id,
      team_id: team.value.id,
      content: document.value.content 
    });

    expect(documentResultOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new document without 'project_id'", async () => {
    const documentResultOrError = await createDocumentService.execute({
      name: document.value.name.value,
      project_id: "",
      team_id: team.value.id,
      content: document.value.content 
    });

    expect(documentResultOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new document without 'team_id'", async () => {
    const documentResultOrError = await createDocumentService.execute({
      name: document.value.name.value,
      project_id: project.value.id,
      team_id: "",
      content: document.value.content 
    });

    expect(documentResultOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new document without 'content'", async () => {
    const documentResultOrError = await createDocumentService.execute({
      name: document.value.name.value,
      project_id: project.value.id,
      team_id: team.value.id,
      content: ""
    });

    expect(documentResultOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new document with a invalid 'project_id'", async () => {
    const documentResultOrError = await createDocumentService.execute({
      name: document.value.name.value,
      project_id: project.value.id + "123Test",
      team_id: team.value.id,
      content: document.value.content 
    });

    expect(documentResultOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new document with a invalid 'team_id'", async () => {
    const documentResultOrError = await createDocumentService.execute({
      name: document.value.name.value,
      project_id: project.value.id,
      team_id: team.value.id + "123Test",
      content: document.value.content 
    });

    expect(documentResultOrError.isLeft()).toBe(true);
  });

  it("should not be able to create a new document with a invalid document instance", async () => {
    const documentResultOrError = await createDocumentService.execute({
      name: "a",
      project_id: project.value.id,
      team_id: team.value.id,
      content: document.value.content 
    });

    expect(documentResultOrError.isLeft()).toBe(true);
  });
})