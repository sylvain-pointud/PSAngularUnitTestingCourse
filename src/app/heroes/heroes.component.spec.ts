import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";

describe('Heroes Component', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strengh: 8 },
      { id: 1, name: 'Wonderful woman', strengh: 24 },
      { id: 1, name: 'SuperDude', strengh: 55 }
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    component = new HeroesComponent(mockHeroService);
  })

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      //arrange
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;
      //act
      component.delete(HEROES[2]);
      //assert
      expect(component.heroes.length).toBe(2);
    })

    it('should call deleteHero', () => {
      //arrange
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;
      //act
      component.delete(HEROES[2]);
      //assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })
  })
})