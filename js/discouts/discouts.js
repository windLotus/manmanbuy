$.ajax({
    url: 'http://139.199.192.48:9090/api/getcoupon',
    success: function(data) {
        $('#count_kfc').html(template('count_kfc_tpl', data.result));
    }
})