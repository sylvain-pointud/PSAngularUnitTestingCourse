import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Input, Component, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

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
        HeroComponent,
        RouterLinkDirectiveStub],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
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

  it(`should call heroService.deleteHero when the Hero component's
   delete button is clicked`, () => {

      spyOn(fixture.componentInstance, 'delete');

      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      //run ngOnInit
      fixture.detectChanges();

      const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

      heroComponents[0].query(By.css('button'))
        .triggerEventHandler('click', { stopPropagation: () => { } });

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

  //we call the child component method and we check if the parent is listening 
  it(`should call heroService.deleteHero because we manually emit it`, () => {

    spyOn(fixture.componentInstance, 'delete');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })

  //we call the child component method and we check if the parent is listening 
  it('should call heroService.deleteHero because we manually trigger it', () => {

    spyOn(fixture.componentInstance, 'delete');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponents[0].triggerEventHandler('delete', undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })

  it('should add a new hero to the heroes list when the add button is clicked', () => {
    //Arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInit
    fixture.detectChanges();

    const name = "New Hero";

    mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 11 }));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButtonElement = fixture.debugElement.queryAll(By.css('button'))[0];

    // Act
    inputElement.value = name;
    addButtonElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    //Asert
    expect(heroText).toContain("New Hero");
  })

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  })

})