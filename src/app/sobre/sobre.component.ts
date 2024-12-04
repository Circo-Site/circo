import {Component, HostListener, OnInit} from '@angular/core';
import { HeaderComponent } from "../Shared/header/header.component";
import { ModalComponent } from "../Shared/modal/modal.component";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [HeaderComponent, ModalComponent, TranslateModule, RouterLink],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent implements OnInit{

  theme! : string

  ngOnInit(): void {
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
