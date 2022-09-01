export interface WeekModel {
  id: string
  goals: string[]
  exercises: ExerciseModel[]
}

export interface ExerciseModel {
  title: string
  url: string
  duration: string
  uri: string
}
