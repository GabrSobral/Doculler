import { Document } from "src/domain/entities/Document";

interface DocumentRepository {
  create: ( data: Document ) => Promise<Document>;
  findById: (document_id: string) => Promise<Document | null>;
  deleteById: (document_id: string) => Promise<void>
}