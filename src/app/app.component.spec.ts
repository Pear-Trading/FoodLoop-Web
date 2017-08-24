import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Items under test
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let de: DebugElement;
  let appDocument: any;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent
        ],
        imports: [
          RouterTestingModule.withRoutes(
            [{path: '', component: AppComponent}]
          )
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    de = fixture.debugElement;
    appDocument = de.nativeElement;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should have a router-outlet', async(() => {
    expect(appDocument.querySelector('router-outlet')).toBeTruthy();
  }));
});
