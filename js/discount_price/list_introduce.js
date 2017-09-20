//获取id 
var id = getSearch()[1];

//渲染数据
if (id >= 20) {
    // 省钱控数据渲染
    var url1 = 'http://139.199.192.48:9090/api/getmoneyctrlproduct'
    initPlus(url1);
} else {
    // 国内折扣价数据渲染
    var url2 = 'http://139.199.192.48:9090/api/getdiscountproduct';
    initPlus(url2);
}

// ajax请求数据并渲染方法封装
function initPlus(url) {
    $.ajax({
        url: url,
        type: 'get',
        data: { productid: id },
        success: function(data) {
            // 获取数据渲染模板
            var html = template('comment_tlp', data.result);
            $('#comment_Form').html(html);
            //点击评论追加
            $('input[type=submit]').on('click', function() {
                var html = $('textarea').val();
                // console.log(html);
                $('ul').append(html);
            });
        }
    });
}

// 获取链接的参数id值
function getSearch() {
    var searchStr = location.search.slice(1);
    var searchArr = searchStr.split('=');
    return searchArr
}