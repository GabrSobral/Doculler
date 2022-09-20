import { DocumentRepository } from '../../src/application/repositories/document-repository';
import { Document } from "../../src/domain/entities/Document/Document";

export class InMemoryDocumentRepository implements DocumentRepository {
  public items: Document[] = [];

  async create(document: Document) {
    this.items.push(document);

    return document; 
  }

  async findById(document_id: string) {
    const document = this.items.find(item => item.id === document_id);

    return document;
  }

  async deleteById(document_id: string) {
    this.items = this.items.filter(item => item.id !== document_id);
  };

  async updateById(document: Document) {
    const newItems = this.items.map(item => {
      if(item.id === document.id)
        return document;
      
      return item;
    });

    this.items = newItems;

    return document;
  };
}