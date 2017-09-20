// 标签数据



$.ajax({
    url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
    type: 'get',
    success: function(data) {
        $('#bel-list-tpl').html(template('bel-tpl', data.result));
        var index = 0;
        setList(index);
        $('#bel-list-tpl a').on('click', function() {
            index = $(this).attr("data-id");
            setList(index);
        });

        function setList(index) {
            $.ajax({
                url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
                type: 'get',
                data: {
                    titleid: index
                },
                success: function(data) {
                    $('#commodity-list-tpl').html(template('commodity', data.result));
                    // console.log(data);
                }
            })
        }
    }

});