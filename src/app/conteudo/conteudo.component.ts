import { Component, OnInit } from '@angular/core';
import { CarousselComponent } from "../Shared/caroussel/caroussel.component";
import { ICarousel } from '../interfaces/ICarousel';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from "../Shared/header/header.component";
import { ModalComponent } from "../Shared/modal/modal.component";
import { TranslateModule } from '@ngx-translate/core';
import {IFilmes} from "../interfaces/IFilmes";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-diretores',
  standalone: true,
  imports: [CarousselComponent, RouterLink, HeaderComponent, ModalComponent, TranslateModule, NgClass],
  templateUrl: './conteudo.component.html',
  styleUrl: './conteudo.component.css'
})
export class ConteudoComponent implements OnInit{

  loaded : boolean = false

  modal = {
    visible: false,
    type: 'video'
  }

  selectedVideo : IFilmes = {linkVideo: "", marca: "", nome: "", srcImagem: "", videoId: 0, srcVideo: ''}

  constructor(private route : ActivatedRoute){}

  contentMovies : ICarousel[] =
      [
        {
          title: 'Briedgestone - Rumba a La Final - Teaser',
          src: 'assets/videos/bridgestone__rumbo_a_la_final__teaser.mp4'
        },
        {
          title: 'Briedgestone - Rumba a La Final',
          src: 'assets/videos/video-cortado-briedgestone.mp4'
        },
        {
          title: 'Briedgestone - Mães',
          src: 'assets/videos/bridgestone__mÃes_caminhoneiras.mp4'
        }
      ]

  headerOpen : boolean = false

  theme! : string

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
