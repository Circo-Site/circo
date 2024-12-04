import { IFilmes } from "./IFilmes";

export interface IDiretor {
    nome: string
    bio?: string
    srcFoto: string
    filmes: IFilmes[],
    routerLink: string
}
