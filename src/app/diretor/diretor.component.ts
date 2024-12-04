import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IDiretor } from '../interfaces/IDiretor';
import { ModalComponent } from "../Shared/modal/modal.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from "../Shared/header/header.component";
import { TranslateModule } from '@ngx-translate/core';
import { IFilmes } from '../interfaces/IFilmes';

@Component({
  selector: 'app-diretor',
  standalone: true,
  imports: [ModalComponent, HeaderComponent, TranslateModule],
  templateUrl: './diretor.component.html',
  styleUrl: './diretor.component.css'
})
export class DiretorComponent implements OnInit{

  constructor(private route : ActivatedRoute, private sanitizer : DomSanitizer) { }

  diretor! : IDiretor
  selectedVideo : IFilmes = {
    linkVideo: "", marca: "", nome: "", srcImagem: "", srcVideo: "", videoId: 0
  }
  linkSanitizer! : SafeResourceUrl
  headerOpen : boolean = false
  theme! : string
  modal = {
    visible: false,
    type: ''
  }

  ngOnInit(): void {
    this.route.data.subscribe(({diretor}) => {
      diretor.filmes.forEach((filme : IFilmes) => {
        if(filme.srcImagem == ''){
          filme.srcImagem = 'assets/videos/Thumbnails/' + filme.nome + '.png'
        }
      })
      this.diretor = diretor
      console.log(this.diretor)
    })
  }

  chooseVideo(src : string){
    this.selectedVideo = this.diretor.filmes.find(a => a.srcVideo == src)!

    this.modal.visible = true
    this.modal.type = 'video'
  }

  translateThumbSrc(name : string) {
    return name.replace(/\s/g, '%20');
  }

  openBio(){
    this.modal.type = 'bio'
    this.modal.visible = true
  }

}
