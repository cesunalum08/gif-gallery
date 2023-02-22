import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGIFComponent } from './search-gif.component';

describe('SearchGIFComponent', () => {
  let component: SearchGIFComponent;
  let fixture: ComponentFixture<SearchGIFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchGIFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchGIFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
