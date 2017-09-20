// 获取页面id
var id = getSearch()[1];

// 数据请求
$.ajax({
    url: 'http://139.199.192.48:9090/api/getcouponproduct',
    data: {
        couponid: id || 0
    },
    success: function(data) {
        // 模板喧染
        $('#kfc_content').html(template('kfc_content_tpl', data.result));
        var Arr = data.result;
        var imgArr = [],
            tempObj;
        // 将所有图片组成一个json数据 供引擎模板使用
        for (var i = 0; i <= Arr.length - 1; i++) {
            var imgPath = Arr[i].couponProductImg;
            imgArr.push({ img: imgPath });
        };
        var pathObj = { 'imgs': imgArr };

        // 轮播图的模板喧染
        $('#coures-tpl').html(template('swiper-tpl', pathObj.imgs));

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
                }
            });


            $('.close').click(function() {
                $(".cover").hide();
            })
        });

    }
});