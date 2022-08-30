export interface DeleteProgram {
  delete: (programId: string) => Promise<void>
}
