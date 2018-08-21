import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";

describe('Heroes Component (shallow tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES;

  let mockHeroService;

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    HEROES = [
      { id: 1, name: 'SpiderDude', strengh: 8 },
      { id: 1, name: 'Wonderful woman', strengh: 24 },
      { id: 1, name: 'SuperDude', strengh: 55 }
    ]
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(HeroesComponent);

  })

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  })
})