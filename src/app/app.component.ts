import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Shared/header/header.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet, 
            HeaderComponent,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private translate : TranslateService){
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }
  title = 'circOs';
}
