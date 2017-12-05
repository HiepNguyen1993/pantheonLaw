function initPage_Blog() {
    $('.blog-delete').click(function () {
        if (confirm($(this).attr('message'))) {
            var data = { id: $(this).attr('id') };
            $.postData("/management/blog/delete", data).done(function (result) {
                if (!result.succeeded)
                    alert(result.message);
                else
                    location.reload();
            }).fail(function (xhr, status, error) {
                alert(error);
            });
        }
    });
}

function initPage_BlogDetail() {
    if ($('#contain-img').attr('value'))
        $('#contain-img').css({ 'background-image': 'url(' + $('#contain-img').attr('value') + ')' });
    var publishedDate = $('#PublishedDate').val();

    $('#published-date').datepicker({ autoclose: true, todayHighlight: true, format: config.DATE_FORMAT, value: publishedDate });
    $('.summernote').summernote({ minHeight: 300 });

    $('#contain-img').mouseover(function () {
        $('#lbl-select-image').show();
    }).mouseout(function () {
        $('#lbl-select-image').hide();
    });

    openFile = function () {
        $('#ImageData').trigger('click');
    };

    $('#ImageData').change(function () {
        var file = this.files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            $('#contain-img').css({ 'background-image': 'url(' + reader.result + ')' });
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    $('#form-blog').submit(function (e) {
        e.preventDefault();

        var data = new FormData();
        data.append('ImageData', this.ImageData.files.length > 0 ? this.ImageData.files[0] : null);
        data.append('Title_VI', this.Title_VI.value);
        data.append('Title_EN', this.Title_EN.value);
        data.append('PublishedDate', $("#published-date").datepicker('getDate') ? $("#published-date").datepicker('getDate').toISOString() : null);
        data.append('Content_VI', this.Content_VI.value);
        data.append('Content_EN', this.Content_EN.value);
        data.append('__RequestVerificationToken', this.__RequestVerificationToken.value);

        $.postData(this.action, data, {
            processData: false,
            contentType: false
        }).done(function (result) {
            if (!result.succeeded)
                alert(result.message);
            else
                document.location.href = repairLink('/management/blog');
        }).fail(function (xhr, status, error) {
            alert(error);
        });
    });
}