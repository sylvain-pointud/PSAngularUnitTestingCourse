import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import { TestBed, ComponentFixture, fakeAsync, tick, flush } from "@angular/core/testing";
import { Location } from '@angular/common';
import { Testability } from "@angular/core/src/testability/testability";
import { of } from "rxjs/observable/of";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

describe('HeroDetailComponent', () => {

  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; } } }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);


    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation }

      ]
    })

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
  })

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  })

  it('should call update hero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    // tick(300);
    flush()
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }))
})