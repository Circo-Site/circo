import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { IDiretor } from "../app/interfaces/IDiretor";
import { Diretores} from "../app/data/Diretores";
import { Observable, of } from "rxjs";

export function DiretorResolver(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : IDiretor[]
export function DiretorResolver(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : IDiretor


export function DiretorResolver(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  )  : IDiretor | IDiretor[] {
    const nomeDiretor = route.paramMap.get('nomeDiretor')!
    if(nomeDiretor == null){
        return Diretores
    }

    const diretor = Diretores.find(diretor => diretor.nome.toLocaleUpperCase().replace(/ /g, '') === nomeDiretor.toLocaleUpperCase())

    
    return diretor!
  };