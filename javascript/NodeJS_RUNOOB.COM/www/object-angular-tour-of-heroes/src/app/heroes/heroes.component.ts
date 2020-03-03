import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
//第二种方法
//import { HEROES } from './mock-heroes';
//第三种方法
//导入服务
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {

//constructor() { }
  constructor(private heroService:HeroService) { }  //构造函数 //HeroService注入到HeroComponent中

  ngOnInit() {
    this.getHeroes();
  }
   
  //第一种方法
  //hero: hero = {
  //  id: 1,
  //  name:'Widstorm'
  //};
  
  //第二种方法
  //heroes=HEROES;
  //第三种方法
  //把heroes属性定义为一句简单的声明
  heroes:Hero[];
  getHeroes(): void {
      //this.heroes = this.heroService.getHeroes();
      this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  
  //第二种方法
  selectedHero:Hero; //暂时不赋值，Hero无值域
  onSelect(hero:Hero): void{ //参数hero可以随意命名
    this.selectedHero=hero;  //此时selectedHero的值等于hero对象
  }
  
}
