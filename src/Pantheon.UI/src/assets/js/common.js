
function repairLink(url, culture) {
    var query = jQuery.getQueryParameters();
    if (culture)
        query[config.CULTURE_QUERY_NAME] = culture;

    if (!url)
        url = window.location.origin + window.location.pathname;
    else if (url.indexOf('?') >= 0)
        url = url.substr(0, url.indexOf('?'));

    return url + '?' + jQuery.param(query);
}

function showMessage(containerId, result) {
    containerId = containerId ? '#' + containerId + ' ' : '';
    messageContainer = jQuery(containerId + '.message');

    if (messageContainer) {
        if (!result)
            messageContainer.html('');
        else {
            if (result.succeeded)
                messageContainer.removeClass('text-danger').addClass('text-success');
            else
                messageContainer.removeClass('text-success').addClass('text-danger');

            messageContainer.html(result.message);
        }
    }
}

function getAvatarDefault() {
    return '/images/no-avatar.png';
}

function createPaging(countRecord, recordInPage, page, funcString) {
    if (countRecord > 0 && recordInPage > 0 && page > 0) {
        if (!funcString)
            funcString = 'changePage';

        var totalPage = Math.ceil(countRecord / recordInPage);

        if (!totalPage || totalPage < 2)
            return '';

        if (page < 1)
            page = 1;
        else if (page > totalPage)
            page = totalPage;

        var startPage = page - 2;
        var endPage = page + 2;
        
        if (startPage < 1) {
            if (endPage < totalPage)
                endPage += 1 - startPage;
            startPage = 1;
        }
        if (endPage > totalPage) {
            if (startPage > 1)
                startPage -= endPage - totalPage;
            endPage = totalPage;
        }
        if (startPage < 1)
            startPage = 1;
        if (endPage > totalPage)
            endPage = totalPage;

        var str = '<ul class="pagination">' +
            '<li><a href="#">&laquo;</a></li>' +
            '{0}' +
            '<li><a href="#">&raquo;</a></li>' +
            '</ul>';

        var pageStr = '';

        for (var i = startPage; i <= endPage; i++) {
            pageStr += '<li><a' + (i === page ? ' class="active"' : '') + ' href="javascript:' + funcString + '(' + i + ')">' + i + '</a></li>';
        }

        return str.replace('{0}', pageStr);
    }
    else
        return '';                      
}

function setKeyDownEvent(element, callback) {
    jQuery(element).on('keydown', function (e) {
        if (e.which === 13) {
            if (typeof callback === 'function')
                callback();
            e.preventDefault();
        }
    });
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

jQuery.extend({

    getQueryParameters: function (str) {
        return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1], this; }.bind({}))[0];
    },

    getQueryParameterByName: function (name, url) {
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    getData: function (url, data, options) {
        var doneFunc;
        var failFunc;
        var alwaysFunc;

        var output = {
            done: function (callback) { if (callback && typeof callback === 'function') doneFunc = callback; return output; },
            fail: function (callback) { if (callback && typeof callback === 'function') failFunc = callback; return output; },
            always: function (callback) { if (callback && typeof callback === 'function') alwaysFunc = callback; return output; }
        };

        url = repairLink(url);
        
        if (!options)
            options = {};

        options.type = "GET";
        options.url = url;
        options.data = data;
        options.cache = false;
        options.success = function (result, status, xhr) { doneFunc && doneFunc(result, status, xhr); };
        options.error = function (xhr, status, error) { failFunc && failFunc(xhr, status, error); };
        options.complete = function (xhr, status) { alwaysFunc && alwaysFunc(xhr, status); };

        jQuery.ajax(options);

        return output;
    },

    postData: function (url, data, options) {
        var doneFunc;
        var failFunc;
        var alwaysFunc;

        var output = {
            done: function (callback) { if (callback && typeof callback === 'function') doneFunc = callback; return output; },
            fail: function (callback) { if (callback && typeof callback === 'function') failFunc = callback; return output; },
            always: function (callback) { if (callback && typeof callback === 'function') alwaysFunc = callback; return output; }
        };

        url = repairLink(url);
        
        if (!options)
            options = {};

        options.type = "POST";
        options.url = url;
        options.data = data;
        options.cache = false;
        options.success = function (result, status, xhr) { doneFunc && doneFunc(result, status, xhr); };
        options.error = function (xhr, status, error) { failFunc && failFunc(xhr, status, error); };
        options.complete = function (xhr, status) { alwaysFunc && alwaysFunc(xhr, status); };
        
        jQuery.ajax(options);

        return output;
    }
});

