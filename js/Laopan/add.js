// 商店列表
$.ajax({
    url: 'http://139.199.192.48:9090/api/getgsshop',
    type: 'get',
    async: false,
    success: function(data) {
        $('#shop').html(template('shop-tpl', data.result));
        $('#shop li').on('click', function() {
            $(this).children().children('i').addClass('glyphicon');
            $(this).children().children('i').addClass('glyphicon-ok');
            $(this).siblings().children().children('i').removeClass('glyphicon');
            $(this).siblings().children().children('i').removeClass('glyphicon-ok');
            var thisshop = $(this).children().text();
            var shopId = $(this).children().attr('shopId');
            $('.shopname').html(thisshop).attr('data-id', shopId);
            var areaId = $('.areaname').attr('data-id');
            pro(shopId, areaId);
            $('#shop').css('display', 'none');
        });
    }

});

$('#pull-shop').on('click', function() {
        $(this).parent().siblings().children("ul").hide();
        $('#shop').toggle();

    })
    // 区域列表
$.ajax({
    url: 'http://139.199.192.48:9090/api/getgsshoparea',
    type: 'get',
    async: false,
    success: function(data) {
        $('#area').html(template('area-tpl', data.result));
        $('#area li').on('click', function() {
            $(this).children().children('i').addClass('glyphicon');
            $(this).children().children('i').addClass('glyphicon-ok');
            $(this).siblings().children().children('i').removeClass('glyphicon');
            $(this).siblings().children().children('i').removeClass('glyphicon-ok');
            var thisarea = $.trim($(this).children("a").text()).substring(0, 2);
            var areaId = $(this).children().attr('areaId');
            $('.areaname').html(thisarea).attr('data-id', areaId);
            var shopId = $('.shopname').attr('data-id');
            pro(shopId, areaId);
            $('#area').css('display', 'none');
        });
    }
});
$('#pull-area').on('click', function() {
    $(this).parent().siblings().children("ul").hide();
    $('#area').toggle();
})

// 价格范围列表
$('#pull-price').on('click', function() {
    $('#price').toggle();
});
// 商品列表
var indexshop = 0;
var indexarea = 0;
pro(indexshop, indexarea);

function pro(shopId, areaId) {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getgsproduct',
        type: 'get',
        data: {
            shopid: shopId,
            areaid: areaId
        },
        success: function(data) {
            $('#commodity-list').html(template('commodity-tpl', data.result));
        }
    });
}