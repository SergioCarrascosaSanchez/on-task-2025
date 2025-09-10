import type { Project } from "../entities/Project";

export interface ProjectListResponse {
  projects: Project[];
  total: number;
}
