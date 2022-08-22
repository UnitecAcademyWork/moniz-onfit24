export interface UpdateUserRoleRepository {
  updateRole: (id: string, role: string) => Promise<void>
}
