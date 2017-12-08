jQuery(document).ready(function () {
    initialize();
    
    var init = jQuery('[init]');
    if (init && init.length > 0) {
        initPage = eval(init.attr('init'));
            
        if (typeof initPage == 'function')
            initPage();
    }
});

function initialize() {

    jQuery(window).on('load', function () {
        new JCaption('img.caption');
    });

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    }

    jQuery('#back-to-top').on('click', function () {
        jQuery("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });

    // Configure/customize these variables.
    var showChar = 200;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";


    jQuery('.more').each(function () {
        var content = jQuery(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            jQuery(this).html(html);
        }

    });

    jQuery(".morelink").click(function () {
        if (jQuery(this).hasClass("less")) {
            jQuery(this).removeClass("less");
            jQuery(this).html(moretext);
        } else {
            jQuery(this).addClass("less");
            jQuery(this).html(lesstext);
        }
        jQuery(this).parent().prev().toggle();
        jQuery(this).prev().toggle();
        return false;
    });
    console.log('init xyz');
    
}