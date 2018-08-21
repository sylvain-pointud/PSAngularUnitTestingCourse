import { MessageService } from "./message.service";
import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HeroService } from "./hero.service";
describe('Heroes Service', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {

    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    })
    httpTestingController = TestBed.get(HttpTestingController);
  })


  // TestBed.get() is better because the code is cleaner
  describe('Get Hero', () => {
    it('should call get with the correct URL',
      inject([
        HeroService,
        HttpTestingController
      ],
        (service: HeroService, controller: HttpTestingController) => {
          service.getHero(4).subscribe();

          const request = httpTestingController.expectOne('api/heroes/4');
          request.flush({ id: 4, name: 'SpiderDude', strengh: 8 });

          httpTestingController.verify();
          
        }))
  })
})
