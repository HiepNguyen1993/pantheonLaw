function initPage_Home() {
    jQuery(".count-count").countimator();

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


    //API demos Used(synchronous loading, info window,)
    var myLatlng140 = new google.maps.LatLng(10.7869, 106.693);
    var mapOptions140 = {
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

    var map140 = new google.maps.Map(document.getElementById('map-canvas140'), mapOptions140);

    //Info Window
    var contentString140 = '<div id="content">' +
        '<div id="siteNotice"></div>' +
        '<h1 id="firstHeading" class="firstHeading">LawStudio</h1>' +
        '<div id="bodyContent">' +
            '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
    '</div>';
    var infowindow140 = new google.maps.InfoWindow({
        content: contentString140,
        maxWidth: 300
    });

    //Marker
    var marker140 = new google.maps.Marker({
        position: myLatlng140,
        map: map140,
        title: 'LawStudio'
    });

    //Event for open Info Window
    google.maps.event.addListener(marker140, 'click', function () {
        infowindow140.open(map140, marker140);
    });
}