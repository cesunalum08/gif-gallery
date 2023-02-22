import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GIFGalleryComponent } from './gifgallery.component';

describe('GIFGalleryComponent', () => {
  let component: GIFGalleryComponent;
  let fixture: ComponentFixture<GIFGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GIFGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GIFGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
