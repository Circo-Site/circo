import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements  OnInit{

  language! : string;

  @Input()
  opened : boolean = false

  startOpened : boolean = false

  @Input()
  headerType: number = 0

  @Output()
  headerOpen : EventEmitter<boolean> = new EventEmitter()

  theme! : string

  constructor(private translate : TranslateService){
    this.language = translate.currentLang.toLocaleUpperCase();
  }

  ngOnInit() {
    this.startOpened = this.opened
  }

  switchLanguage(){
    this.translate.use(this.language.toLocaleLowerCase());
  }

  OpenHeader(){
    if(this.opened){
      this.opened = false
      this.startOpened = true
      this.headerOpen.emit(false)
    }
    else {
      this.opened = true
      this.headerOpen.emit(true)
    }
  }
}
