import { Component, HostListener, OnInit } from '@angular/core';
import { CarousselComponent } from "../Shared/caroussel/caroussel.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IDiretor } from '../interfaces/IDiretor';
import { HeaderComponent } from "../Shared/header/header.component";
import { ModalComponent } from "../Shared/modal/modal.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-diretores',
  standalone: true,
  imports: [CarousselComponent, RouterLink, HeaderComponent, ModalComponent, TranslateModule],
  templateUrl: './diretores.component.html',
  styleUrl: './diretores.component.css'
})
export class DiretoresComponent implements OnInit{

  constructor(private route : ActivatedRoute){}

  diretores : IDiretor[] = []

  hoverDirector : IDiretor = {
    nome: 'Marcus Becker',
    bio: 'string',
    srcFoto: 'string',
    filmes: [],
    routerLink: 'string',
  }

  headerOpen : boolean = false

  theme! : string

  ngOnInit(): void {
    this.route.data.subscribe(({diretores}) => {
      this.diretores = diretores.filter((a : IDiretor) => !a.nome.includes('Alberto'))
      this.hoverDirector = diretores.filter((a : IDiretor) => a.nome == this.hoverDirector.nome)[0]
      console.log(this.headerOpen)
    })

    this.ajustarVideos();
  }

  @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
      this.ajustarVideos(); // Ajusta os vídeos ao redimensionar a tela
    }

    ajustarVideos(): void {
      const videos = document.querySelectorAll('video');

      videos.forEach((video: HTMLVideoElement) => {
        const alturaReal = window.innerHeight;
        const larguraReal = window.innerWidth;

        if (larguraReal > alturaReal) {
          // Modo horizontal (landscape)
          video.style.width = `${larguraReal}px`;
          video.style.height = `${alturaReal}px`;
        } else {
          // Modo vertical (portrait)
          video.style.width = '100%';
          video.style.height = '100%';
        }
      });
    }

}
