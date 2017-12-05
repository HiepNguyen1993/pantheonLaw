function initPage_Contact() {
    jQuery(function ($) { $(".hasPopover").popover({ "html": true, "trigger": "hover focus", "container": "body" }); });
    jQuery(function ($) { $(".hasTooltip").tooltip({ "html": true, "container": "body" }); });


    //API demos Used(synchronous loading, info window,)
    var myLatlng181 = new google.maps.LatLng(10.7869, 106.693);
    var mapOptions181 = {
        scrollwheel: false,
        zoom: 15,
        center: myLatlng181,
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

    var map181 = new google.maps.Map(document.getElementById('map-canvas181'), mapOptions181);

    //Info Window
    var contentString181 = '<div id="content">' +
        '<div id="siteNotice"></div>' +
        '<h1 id="firstHeading" class="firstHeading">Central Office</h1>' +
        '<div id="bodyContent">' +
            '<p>Aenean lacus arcu, congue et aliquet vel, iaculis ut tortor. Mauris tincidunt aliquam nisl quis interdum. Proin dapibus dictum arcu at hendrerit.</p>' +
        '</div>' +
    '</div>';
    var infowindow181 = new google.maps.InfoWindow({
        content: contentString181,
        maxWidth: 300
    });

    //Marker
    var marker181 = new google.maps.Marker({
        position: myLatlng181,
        map: map181,
        title: 'Central Office'
    });

    //Event for open Info Window
    google.maps.event.addListener(marker181, 'click', function () {
        infowindow181.open(map181, marker181);
    });

    jQuery('#contact-form').submit(function (e) {
        e.preventDefault();
        jQuery('#loading-container').show();

        var data = {
            SenderName: jQuery('#contact-name').val(),
            SenderEmail: jQuery('#contact-email').val(),
            Subject: jQuery('#contact-subject').val(),
            Content: jQuery('#contact-message').val(),
            IsCopyMail: jQuery('#jform_contact_email_copy').is(':checked')
        };

        jQuery.postData('/Message/Contact', JSON.stringify(data), {
            contentType: 'application/json; charset=utf-8'
        }).done(function (result) {
            jQuery('#loading-container').hide();
            alert(result.message);
        }).fail(function (xhr, status, error) {
            jQuery('#loading-container').hide();
            alert(error);
        });
    });
}