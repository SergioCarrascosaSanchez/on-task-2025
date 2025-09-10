import type { ProjectListResponse } from "../types/ProjectListResponse";
import type { ProjectsListParams } from "../types/ProjectsListParams ";

export interface ProjectRepository {
  fetchProjects: (params?: ProjectsListParams) => Promise<ProjectListResponse>;
}
