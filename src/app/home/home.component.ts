import { Component, OnInit } from '@angular/core';
import { CarousselComponent } from "../Shared/caroussel/caroussel.component";
import { ICarousel } from '../interfaces/ICarousel';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IDiretor } from '../interfaces/IDiretor';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from "../Shared/header/header.component";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { ModalComponent } from "../Shared/modal/modal.component";
import {NgClass} from "@angular/common";
import { IFilmes } from '../interfaces/IFilmes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarousselComponent, HeaderComponent, TranslateModule ,ModalComponent, RouterLink, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  constructor(private route : ActivatedRoute, private sanitizer: DomSanitizer, private translateService : TranslateService  ){
    const theme = JSON.stringify(localStorage.getItem('theme'))
    this.route.data.subscribe(({diretores}) => {

      const ordemDesejada = ['CAIO VALVERDE', 'DANIEL FERREIRA', 'LUZ BARBOSA', 'RAFAELA FERRARI',
        'BIA FLECHA', 'CARLA BARROS', 'DARREN STATMAN', 'JOÃO AVANCI', 'MARCUS BECKER', 'CARO DE LA VEGA', 'RODERICK FENSKE'];

      // Função de comparação personalizada
      const compararDiretores = (a: IDiretor, b: IDiretor) => {
        const indexA = ordemDesejada.indexOf(a.nome.toUpperCase());
        const indexB = ordemDesejada.indexOf(b.nome.toUpperCase());
        return indexA - indexB;
      };

      diretores.sort(compararDiretores);

      console.log(diretores)
      diretores = diretores.filter((a : IDiretor) => !a.nome.includes('Alberto'))
      diretores.forEach((diretor : IDiretor, index : number) => {
        if(diretor.filmes.length > 0){
          translateService.get(diretor.filmes[0].nome).subscribe((nomeTraduzido : string) => {
            this.media.push({
              src: diretor.filmes[0].srcVideo,
              title: diretor.filmes[0].marca + ' - ' + nomeTraduzido,
              routerLink: diretor.routerLink
            })
          })
        }
      });
    })
  }

  modal = {
    visible: false,
    type: 'video'
  }

  selectedVideo : IFilmes = {linkVideo: "", marca: "", nome: "", srcImagem: "", videoId: 0, srcVideo: ''}

  theme! : string

  media : ICarousel[] = [
    {
      src: 'assets/videos/HOME.mp4'
    },
    {
      title: 'Hyundai - New Accent',
      src: 'assets/videos/hyundai_new_accent (1080p).mp4'
    },
    {
      title: 'Hyundai - Poker',
      src: 'assets/videos/hyundai_poker (1080p).mp4'
    },
    {
      title: 'Hyundai - Button',
      src: 'assets/videos/hyundai-button (1080p).mp4'
    },
    {
      title: 'Hyundai - School',
      src: 'assets/videos/hyundai_school (1080p).mp4'
    },
    {
      title: 'HYUNDAI_ORGULHO',
      src: 'assets/videos/hyundai_10_anos_directors_cut_-__orgulho_.mp4'
    },
    {
      title: 'DIGIO_JUNTOS',
      src: 'assets/videos/banco_digio__juntos_ (1080p).mp4'
    },
    {
      title: 'Digio - Escolhas',
      src: 'assets/videos/digio_escolhas (1080p).mp4'
    },
    {
      title: 'DEEZER_FOLGADO',
      src: 'assets/videos/deezer_folgado_30s (1080p).mp4'
    },
    {
      title: 'DEEZER_TITIA',
      src: 'assets/videos/deezer_titia_30s_(16x9) (1080p).mp4'
    },
    {
      title: 'Digio - FGTS',
      src: 'assets/videos/digio_-__fgts_ (1080p).mp4'
    },
    {
      title: 'DIGIO_TRANSFORMA',
      src: 'assets/videos/digio_30 (1080p).mp4'
    }
  ]

  headerOpen : boolean = true

  loaded: boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.delayedFunction();
    }, 1500);
  }

  openModal(srcVideo : string){
    this.modal.visible = true;

    this.selectedVideo.srcVideo = srcVideo
  }

  delayedFunction(): void {
    this.loaded = true
    // Adicione aqui o código que você deseja executar após 1.5 segundos
  }

}
