import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initOwlCarousel();
  }

  initOwlCarousel() {
    jQuery('.owl-clients-2').owlCarousel({
      loop: true,
      dots: true,
      nav: false,
      margin: 30,
      responsive: {
          0: {
              items: 2
          },
          480: {
              items: 3
          },
          768: {
              items: 4
          }
      }
  });

  }

}
