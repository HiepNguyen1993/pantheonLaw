function initPage_Account() {
    initControl_Account(materialadmin, jQuery); // pass in (namespace, jQuery):
}

function initPage_AccountChangePassword() {
    $('#form-changepassword').submit(function (e) {
        e.preventDefault();
        
        var data = {
            Password: this.Password.value,
            NewPassword: this.NewPassword.value,
            ConfirmNewPassword: this.ConfirmNewPassword.value
            //__RequestVerificationToken: this.__RequestVerificationToken.value
        };

        $.postData(this.action, JSON.stringify(data), { contentType: 'application/json; charset=utf-8' }).done(function (result) {
            alert(result.message);

            if (result.succeeded)
                location.href = '/management/';
        });
    });
}

function initControl_Account(namespace, $) {
    "use strict";

    var Account = function () {
        // Create reference to this instance
        var o = this;
        // Initialize app when document is ready
        $(document).ready(function () {
            o.initialize();
        });

    };
    var p = Account.prototype;

    // =========================================================================
    // MEMBERS
    // =========================================================================

    p.map = null;

    // =========================================================================
    // INIT
    // =========================================================================

    p.initialize = function () {
        this._initDuplicateSource();
        this._initSummernote();
        this._initDatetime();
        this._initMultiselect();
        this._initGMaps();
        this._initInputMask();
    };

    // =========================================================================
    // DUPLICATE
    // =========================================================================

    p._initDuplicateSource = function (e) {
        var o = this;

        // Add event lsitener for duplication
        $('[data-duplicate]').on('click', function (e) {
            var item = $(this);
            var templateId = item.data('duplicate');
            var target = $(item.data('target'));
            o._duplicateTemplate(templateId, target);
        });

        // Init dulicate function
        $('[data-duplicate]').each(function () {
            var item = $(this);
            var templateId = item.data('duplicate');
            var target = $(item.data('target'));
            o._duplicateTemplate(templateId, target);
        });
    };

    p._duplicateTemplate = function (templateId, target) {
        if (typeof tmpl === 'undefined') {
            return;
        }
        var o = this;

        var index = (target.data('index') > 0) ? target.data('index') : target.children().length + 1;
        target.data('index', index + 1);
        var clonedContent = tmpl(templateId, { index: index });

        // Add cloned source to parent
        var newContent = $(clonedContent).appendTo(target).hide().slideDown('fast');

        // Init date component
        this._initDatetime(newContent, index);

        // Add delete event
        newContent.on('click', '.btn-delete', function (e) {
            newContent.slideUp('fast', function () {
                newContent.remove();
            });
        });
    };

    // =========================================================================
    // GMaps
    // =========================================================================

    p._initGMaps = function () {
        if (typeof GMaps === 'undefined') {
            return;
        }
        if ($('#map-canvas').length === 0) {
            return;
        }

        this.map = new GMaps({
            div: '#map-canvas',
            lat: 52.376950,
            lng: 4.898365,
            zoom: 11,
            disableDefaultUI: true
        });

        this.map.addMarker({
            lat: 52.37050,
            lng: 4.90454,
            title: 'Amsterdam',
            click: function (e) {
                alert('You clicked in this marker');
            }
        });

        this._initGMapsEvents();
    };

    p._initGMapsEvents = function () {
        var o = this;
        $('#street, #streetnumber, #city, #zip').on('change', function (e) {
            o._startGeocoding();
        });
    };

    p._startGeocoding = function () {
        var o = this;
        GMaps.geocode({
            address: o._formatAddress(),
            callback: function (results, status) {
                if (status === 'OK') {
                    o._addMarker(results, status);
                }
            }
        });
    };
    p._addMarker = function (results, status) {
        this.map.removeMarkers();
        var latlng = results[0].geometry.location;
        this.map.setCenter(latlng.lat(), latlng.lng());
        this.map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng()
        });
    };

    p._formatAddress = function (results, status) {
        var address = [];
        var street = $('#street').val() + " " + $('#streetnumber').val();
        var city = $('#city').val();
        var zip = $('#zip').val();

        // Add values to array if not empty
        if ($.trim(street) !== '') {
            address.push(street);
        }
        if ($.trim(city) !== '') {
            address.push(city);
        }
        if ($.trim(zip) !== '') {
            address.push(zip);
        }

        // Format address to search string
        return address.join(',');
    };


    // =========================================================================
    // SUMMERNOTE EDITOR
    // =========================================================================

    p._initSummernote = function () {
        if (!$.isFunction($.fn.summernote)) {
            return;
        }
        if ($('#summernote').length === 0) {
            return;
        }

        $('#summernote').summernote({
            height: $('#summernote').height(),
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ]
        });
    };

    // =========================================================================
    // MULTISELECT
    // =========================================================================

    p._initMultiselect = function () {
        if (!$.isFunction($.fn.multiselect)) {
            return;
        }

        $('select[name="category"]').multiselect({
            buttonClass: 'form-control',
            buttonContainer: '<div class="btn-group btn-group-justified" />'
        });
    };

    // =========================================================================
    // DATETIME
    // =========================================================================

    p._initDatetime = function () {
        if (!$.isFunction($.fn.datepicker)) {
            return;
        }

        $('.input-daterange').datepicker({ todayHighlight: true });
    };

    // =========================================================================
    // InputMask
    // =========================================================================

    p._initInputMask = function () {
        if (!$.isFunction($.fn.inputmask)) {
            return;
        }
        $(":input").inputmask();
    };

    // =========================================================================
    namespace.Account = new Account;
}