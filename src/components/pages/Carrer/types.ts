export interface dataType{
  id: number
  created_at: string
  nomeDoCargo: string
  nivel: string
  salario: number
}

export type typeModal = "edit" | "create" | "delete";