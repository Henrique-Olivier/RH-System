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
  complemento: string;
}

export interface UserPermission {
  id: number;
  created_at: string;
  userId: string;
  permissao: number;
}

export interface Permission {
  created_at: string;
  id: number;
  permissao: string;
}


export interface IUser {
  id: string;
  email: string | undefined;
  name: string | undefined;
}

