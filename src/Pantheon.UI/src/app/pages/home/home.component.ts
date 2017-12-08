import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initPage_Home();
  }
  initPage_Home() {
    jQuery('.count-count').countimator();

    jQuery('.owl-testimonial-4').owlCarousel({
        loop: true,
        dots: false,
        nav: true,
        margin: 15,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                loop: true
            }
        }
    });

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

    const myLatlng140 = new google.maps.LatLng(10.7869, 106.693);
    const mapOptions140 = {
        scrollwheel: false,
        zoom: 15,
        center: myLatlng140,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_TOP
        },
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        }
    };

    const map140 = new google.maps.Map(document.getElementById('map-canvas140'), mapOptions140);

    // Info Window
    const contentString140 = '<div id="content">' +
        '<div id="siteNotice"></div>' +
        '<h1 id="firstHeading" class="firstHeading">Pantheon</h1>' +
        '</div>';
    const infowindow140 = new google.maps.InfoWindow({
        content: contentString140,
        maxWidth: 300
    });

    // Marker
    const marker140 = new google.maps.Marker({
        position: myLatlng140,
        map: map140,
        title: 'Pantheon'
    });

    // Event for open Info Window
    google.maps.event.addListener(marker140, 'click', function () {
        infowindow140.open(map140, marker140);
    });
}

}
