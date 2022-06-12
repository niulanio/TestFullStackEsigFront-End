import { Responsavel } from "../responsaveis/responsavel";

export class Tarefa{
    id: number;
    titulo: string;
    descricao: string;
    prioridade: number;
    status: number;
    responsavel: Responsavel;
    dataFinal: string;
}