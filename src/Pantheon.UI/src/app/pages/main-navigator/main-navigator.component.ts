import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.css']
})
export class MainNavigatorComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToPage(namePage: string){
    this.router.navigate([namePage]);
  }

}
