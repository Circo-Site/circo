import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoComponent } from './conteudo.component';

describe('DiretoresComponent', () => {
  let component: ConteudoComponent;
  let fixture: ComponentFixture<ConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteudoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
