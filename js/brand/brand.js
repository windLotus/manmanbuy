$.ajax({
    url: 'http://139.199.192.48:9090/api/getbrandtitle',
    success: function(data) {
        $('#brand').html(template('brand-tpl', data.result))
    }
});
$(document).on('click', '.brand-btn', function() {

    var id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbrand',
        data: { brandtitleid: id },
        success: function(data) {
            $('#brand').html(template('brand-good-tpl', data.result))
        }
    })
})