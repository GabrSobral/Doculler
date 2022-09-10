interface DocumentData {
  name: string;
  team_id: string;
  content: string;
  project_id: string;
  updated_at?: Date;
  readonly created_at?: Date;
}