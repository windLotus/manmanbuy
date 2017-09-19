var id = getSearch()[1];
console.log(id);

$.ajax({
    url: 'http://139.199.192.48:9090/api/getcouponproduct',
    data: 'id',
    success: function(data) {
        $('#kfc_content').html(template('kfc_content_tpl', data.result))
        console.log(id);

    }
})
$('.back').on('click', function() {
    location.href = "/manmanbuy/html/discounts/discounts.html"
})