import { DocumentRepository } from "../../repositories/document-repository";
import { Either, left, right } from "../../../shared/either";

export class RemoveDocumentService {
  constructor(
    private readonly documentRepository: DocumentRepository,
  ) {}

  async execute(document_id: string): Promise<Either<Error, void>> {
    if(!document_id)
      return left(new Error("No 'document_id' was provided"));

    return right(await this.documentRepository.deleteById(document_id));
  }
}