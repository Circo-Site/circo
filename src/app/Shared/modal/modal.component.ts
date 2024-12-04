import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IDiretor } from '../../interfaces/IDiretor';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {IFilmes} from "../../interfaces/IFilmes";
import {ICarousel} from "../../interfaces/ICarousel";


@Component({
  selector: 'app-modal-frame',
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive, TranslateModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{

  @Output() closeButtonEvent : EventEmitter<null> = new EventEmitter

  @Input() close : boolean = false

  @Input() diretor! : IDiretor

  @Input() selectedVideo! : IFilmes

  @Input() type : string = ''

  @Input() autoplay : boolean = false

  theme! : string

  constructor(private translate : TranslateService){

  }

  closeButton(){
    this.closeButtonEvent.emit()
  }

  switchLanguage(language : string){
    this.translate.use(language.toLocaleLowerCase());
  }

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
