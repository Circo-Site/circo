import {AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { ICarousel } from '../../interfaces/ICarousel';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-caroussel',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './caroussel.component.html',
  styleUrl: './caroussel.component.css'
})
export class CarousselComponent implements OnInit, AfterViewInit{

    @Input()
    media : ICarousel[] = []
    observer: IntersectionObserver | undefined;
    videoQueue: HTMLVideoElement[] = [];


  videoLoadedValue: boolean = false

    @Output()
    selectedVideo: EventEmitter<SafeResourceUrl> = new EventEmitter()

    constructor(private sanitizer: DomSanitizer, private el: ElementRef) {}


    ngAfterViewInit() {
      const carouselElement = document.getElementById('carouselExampleIndicators');
      if (carouselElement) {
        carouselElement.addEventListener('slide.bs.carousel', (event: any) => {
          const activeIndex = event.to;
          this.updateVideoPlayback(activeIndex);
        });
      }
    }

    updateVideoPlayback(activeIndex: number) {
      this.media.forEach((item, index) => {
        const videoElement = document.getElementById(`video-${index}`) as HTMLVideoElement;
        if (videoElement) {
          if(activeIndex == 0 && index < 3){
            if (videoElement.readyState === 0) { // Verifica se o vídeo não está carregado
              videoElement.load();
            }
          }
          else if (index == activeIndex + 4) {
            if (videoElement.readyState === 0) { // Verifica se o vídeo não está carregado
              videoElement.load();
            }
          }
          if (index === activeIndex) {
            videoElement.play();
          } else {
            videoElement.pause();
            videoElement.currentTime = 0; // Reseta o vídeo para o início
          }
        }
      });
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
