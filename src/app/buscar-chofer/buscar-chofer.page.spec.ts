import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarChoferPage } from './buscar-chofer.page';

describe('BuscarChoferPage', () => {
  let component: BuscarChoferPage;
  let fixture: ComponentFixture<BuscarChoferPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuscarChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
