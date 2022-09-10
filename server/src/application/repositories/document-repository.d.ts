import { Document } from "src/domain/entities/Document";

interface DocumentCreateData {
  name: string;
  project_id: string;
  content: string;
}

interface DocumentRepository {
  create: ( data: DocumentCreateData ) => Promise<Document>;
}