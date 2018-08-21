import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { $ } from "protractor";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('Heroes Component (deep tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES
  let mockHeroService;

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    HEROES = [
      { id: 1, name: 'SpiderDude', strengh: 8 },
      { id: 1, name: 'Wonderful woman', strengh: 24 },
      { id: 1, name: 'SuperDude', strengh: 55 }
    ]

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(HeroesComponent);
  })

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnInit
    fixture.detectChanges();
    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent))

    for (let i = 0; i < heroComponentDebugElements.length; i++) {
      expect(heroComponentDebugElements[i].componentInstance.hero).toEqual(HEROES[i])
    }
  })

})