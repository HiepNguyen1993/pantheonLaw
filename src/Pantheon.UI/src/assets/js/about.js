function initPage_About() {
    jQuery(function ($) { $(".hasTooltip").tooltip({ "html": true, "container": "body" }); });

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