function initPage_Service() {
    jQuery(function ($) { $(".hasTooltip").tooltip({ "html": true, "container": "body" }); });

    jQuery('#circle-147-0').circliful();
    jQuery('#circle-147-1').circliful();
    jQuery('#circle-147-2').circliful();
    jQuery('#circle-147-3').circliful();

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

    jQuery('#ctc-form').submit(function (e) {
        e.preventDefault();
        jQuery('#loading-container').show();

        var data = {
            SenderName: jQuery('#contact-name').val(),
            SenderEmail: jQuery('#contact-email').val(),
            Subject: jQuery('#contact-subject').val(),
            Content: jQuery('#contact-message').val(),
            IsCopyMail: jQuery('#jform_contact_email_copy').is(':checked')
            //__RequestVerificationToken: this.__RequestVerificationToken.value
        };
        
        jQuery.postData('/Message/Consult', JSON.stringify(data), {
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