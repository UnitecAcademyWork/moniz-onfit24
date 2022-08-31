export interface WeekModel {
  id: string
  programId: string
  goals: string[]
  exercises: ExerciseModel[]
}

export interface ExerciseModel {
  title: string
  url: string
  duration: string
  uri: string
}
