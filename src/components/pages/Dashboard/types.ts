export type selectType = "region" | "salary";

export interface payload{
    qtd: number,
    name: string,
    value: number
}

export interface collaborator {
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

export interface carrers {
    id: number,
    nomeDoCargo: string,
    nivel: string,
    salario: number
}

export interface propsGraph{
    cx: number,
    cy: number,
    midAngle: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    fill: string,
    payload: payload,
    percent: number,
    value: number,
}