var id = getSearch()[1];
$.ajax({
    url: 'http://139.199.192.48:9090/api/getbrand',
    data: { brandtitleid: id },
    success: function(data) {
        $('#brand-good').html(template('brand-good-tpl', data.result))

    }
});
var productid;
$.ajax({
    url: 'http://139.199.192.48:9090/api/getbrandproductlist',
    data: {
        brandtitleid: id,
        pagesize: 4
    },
    success: function(data) {
        $('#save-list').html(template('sales-tpl', data.result));
        for (var i = 0; i < data.result.length; i++) {
            productid = data.result[i].productId
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getproductcom',
                data: { productid: productid },
                success: function(data) {
                    $('#review').html(template('review-tpl', data.result));


                }
            })
        }
    }
});