var config = {
    CULTURE_QUERY_NAME: 'lang',
    DATE_FORMAT: null // Set value in _Layout.cshtml
};

var CKEDITOR_BASEPATH = '/lib/ckeditor/';

function changeLanguage(culture) {
    jQuery.postData("/Home/ChangeLanguage", {
        culture: culture
    }).done(function (result) {
        location.href = repairLink(null, culture);
    });
}