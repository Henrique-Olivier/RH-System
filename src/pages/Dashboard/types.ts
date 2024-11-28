export type selectType = "region" | "salary";

export interface payload{
    qtd: number,
    name: string,
    value: number
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