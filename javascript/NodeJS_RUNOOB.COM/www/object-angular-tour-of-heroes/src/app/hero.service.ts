import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './heroes/mock-heroes';
//import { Observable, of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable({
    providedIn:'root',  
})
export class HeroService {
  
  constructor(private messageService:MessageService) { }  //构造函数 //MessageService注入到HeroService中

  getHeroes():Observable<Hero[]>{
    //获取到hero数组时发送一条消息
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
