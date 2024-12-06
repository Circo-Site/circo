
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { DiretoresComponent } from './diretores/diretores.component';
import { DiretorComponent } from './diretor/diretor.component';
import { DiretorResolver } from '../resolver/DiretorResolver';
import {ContatoComponent} from "./contato/contato.component";
import {ConteudoComponent} from "./conteudo/conteudo.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        resolve: {
            diretores: DiretorResolver
        }
    },
    {
        path: 'sobre',
        loadComponent: () => import('./sobre/sobre.component').then(c => c.SobreComponent)
    },
    {
      path: 'contato',
      loadComponent: () => import('./contato/contato.component').then(c => c.ContatoComponent)
    },
    {
        path: 'diretor/:nomeDiretor',
        component: DiretorComponent,
        resolve: {
            diretor: DiretorResolver
        }
    },
    {
        path: 'diretores',
        loadComponent: () => import('./diretores/diretores.component').then(c => c.DiretoresComponent),
        resolve: {
            diretores: DiretorResolver
        }
    },
    {
      path: 'conteudo',
      loadComponent: () => import('./conteudo/conteudo.component').then(c => c.ConteudoComponent)
    }
];
