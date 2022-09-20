import { Document } from "../../../domain/entities/Document/Document";
import { DocumentRepository } from "../../repositories/document-repository";

import { Either, left, right } from "../../../shared/either";

interface UpdateDocumentServiceRequest {
  content: string;
  document_id: string;
}

export class UpdateDocumentContentService {
  constructor (
    private readonly documentRepository: DocumentRepository
  ) {}

  async execute(request: UpdateDocumentServiceRequest): Promise<Either<Error, Document>> {
    const { content, document_id } = request;

    if(!document_id)
      return left(new Error("No 'document_id' was provided"));

    const document = await this.documentRepository.findById(document_id);

    if(!document)
      return left(new Error("No document was found with this 'document_id'"));

    document.content = content;
    document.updated_at = new Date();

    await this.documentRepository.updateById(document);

    return right(document);
  }
}