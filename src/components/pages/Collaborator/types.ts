export interface PositionType {
    id: number;
    nomeDoCargo: string;
    nivel: string;
    salario: number;
  }
  
export interface CollaboratorType {
    id?: number;
    nome: string;
    cpf: string;
    cep: string;
    logradouro: string;
    numero: string;
    cidade: string;
    estado: string;
    idCargo: number;
  }