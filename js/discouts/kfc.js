// 获取页面id
var id = getSearch()[1];

// 数据请求
$.ajax({
    url: 'http://139.199.192.48:9090/api/getcouponproduct',
    data: {
        couponid: id || 0
    },
    success: function(data) {
        // 优惠券列表模板喧染
        $('#kfc_content').html(template('kfc_content_tpl', data.result));
        // 轮播图的模板喧染
        $('#coures-tpl').html(template('swiper-tpl', data.result));

        // 点击显示遮盖层与轮播图
        $(document).on('click', '.media', function() {
            $(".cover").show();

            // 获取当前选中的图片的id
            var imgId = $(this).attr('data-id');
            // console.log(imgId);
            // swiper轮播图
            var mySwiper = new Swiper('.swiper-container', {
                // 设置图片显示的开始索引
                initialSlide: imgId,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                // 获取索引值的变化,同步索引值
                onSlideChangeEnd: function(swiper) {
                    imgId = swiper.activeIndex;
                    // console.log(imgId);
                },
            });
            $('.close').click(function() {
                $(".cover").hide();
            })
        });

    }
});