//点击跳转页面  使用委托
$(document).on('click', '#list_go', function() {
    // console.log(111)
    //获取id
    var id = $(this).attr('data-id');
});

//封装动态滚动渲染加载
var page;

function loadBox(pageIndex) {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getinlanddiscount',
        type: 'get',
        success: function(data) {
            //求出返回的数组
            var result = data.result;
            //求数量
            var list = result.length;
            //声明一个空数组储存图片
            var arr = [];
            var col = 4; //显示四个
            var start = col * pageIndex - col; //开始的位置
            var end = col * pageIndex; //最后位置
            // console.log(end)
            // console.log(pageIndex)
            for (var i = start; i < end; i++) {
                //添加到数组存储 为了显示这几个数据
                arr.push(result[i]);
                //渲染
                var html = template('list_tlp', arr);
                if (end >= list) {
                    $('.loadMore').off('click');
                    $('.loadMore').html('没有更多数据');

                }
            };
            //求出有多少页
            page = list / col;
            $('#row_list').append(html);
            //设置页数
            $('.loadMore').attr('data-id', pageIndex);
        }
    })
};
loadBox(1);
$(document).on('scroll', function() {
    var boxHeight = $('body').height();
    var windowTop = $(document).scrollTop();
    var height = boxHeight - windowTop;
    var cp = $('.loadMore').attr('data-id');
    if (height < $(window).height()) {
        cp++;
        if (cp > page) {
            $(document).off('scroll');
            return;
        }
        loadBox(cp);
    }
});
$('.loadMore').on('click', function() {
    var cp = $('.loadMore').attr('data-id');
    cp++;
    loadBox(cp);
})