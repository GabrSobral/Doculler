export interface DocumentCreateData {
  name: string;
  project_id: string;
  content: string;
}

export interface DocumentRepository {
  create: ( data: DocumentCreateData ) => Promise<void>;
}