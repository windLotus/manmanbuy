  // 获取后台数据喧嚷模板
  $.ajax({
      type: 'get',
      url: 'http://139.199.192.48:9090/api/getcategorytitle',
      success: function(data) {
          // 获取数据渲染标题模板
          $('.listBox').html(template('listBox_tpl', data.result));
          // 点击标题显示隐藏菜单 
          $('.listTitle').on('click', function() {
              //   储存当前被点击的元素
              var _this = $(this);

              //   console.log($(this).parent().siblings('li').children('.listTitle').children('span'));
              //   console.log($(this).siblings('.list_nav').parent().siblings().children('.list_nav').hide());

              //   console.log($(this));
              //   获取当前点击的标题的id
              var id = $(this).attr('data-id');
              //   请求子菜单数据进行模板渲染
              $.ajax({
                  type: 'get',
                  url: 'http://139.199.192.48:9090/api/getcategory',
                  data: {
                      titleid: id
                  },
                  success: function(data) {
                      //   模板喧染
                      _this.siblings('.list_nav').html(template('list_nav_tpl', data.result));
                      // 设置箭头的方向
                      _this.children('span').toggleClass('glyphicon-menu-up').toggleClass('glyphicon-menu-down');
                      // 实现点击标题子菜单栏显示与隐藏功能
                      _this.siblings('.list_nav').slideToggle().parent().siblings().children('.list_nav').hide();
                      //   修改箭头的方向
                      _this.parent().siblings('li').children('.listTitle').children('span').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
                  }
              });
          });
      }
  });