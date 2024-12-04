import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../Shared/header/header.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    HeaderComponent,
    TranslateModule
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {

  constructor(protected translate : TranslateService) {
  }

  headerOpen: boolean = true;
  language : string = '';

  ngOnInit() {

  }

}
