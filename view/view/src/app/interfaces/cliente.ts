import { IConta } from "./conta";

export interface ICliente {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    observacoes: string;
    ativo:boolean;
    conta?: IConta;
}
export interface ClienteContaResponse {
  id: string;
}
