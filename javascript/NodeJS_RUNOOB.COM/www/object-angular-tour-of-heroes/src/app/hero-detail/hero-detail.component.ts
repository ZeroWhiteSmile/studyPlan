import { Component, OnInit ,Input } from '@angular/core';
import { Hero } from '../heroes/hero';  //”./hero” (必须这样写，不能带上后缀,否则会报错)

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  @Input() hero:Hero; //让 hero 属性可以在外部的 HeroesComponent 中绑定

}
