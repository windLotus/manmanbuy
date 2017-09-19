  // 获取当前页面链接的参数id
  var id = getSearch()[1];
  // 导航栏数据获取与渲染
  var page = 1;
  var pageNum = 1;

  $.ajax({
      type: 'get',
      url: 'http://139.199.192.48:9090/api/getcategorybyid',
      data: {
          categoryid: id || 0
      },
      success: function(data) {
          $('.list_nav_ul').append(template('list_nav_ul_tpl', data.result));
      }
  });

  // 商品列表数据获取与渲染
  setPage(1);

  //   实现选页功能
  $('#selectId').on('change', function() {
      page = $(this).val();
      setPage(page);
      //   实现页面刷新
      location.href = "#";
  })


  // console.log($('.btn_next'));
  //   实现点击下一页功能
  $(document).on('click', '.btn_next', function() {
      if (page >= pageNum) {
          return;
      }
      page++;
      setPage(page);
  });

  // 实现点击上一页功能
  $(document).on('click', '.btn_prev', function() {
      console.log(123);
      if (page <= 1) {
          return;
      }
      page--;
      setPage(page);

  })

  //   ajax请求数据渲染模板方法封装
  function setPage(page) {
      $.ajax({
          type: 'get',
          url: 'http://139.199.192.48:9090/api/getproductlist',
          data: {
              categoryid: id || 0,
              pageid: page || 1
          },
          success: function(data) {
              var html;
              $('.list_show').html(template('list_show_tpl', data));
              pageNum = Math.ceil(data.totalCount / data.pagesize);
              for (var i = 1; i <= pageNum; i++) {
                  var selected = page == i ? 'selected' : '';
                  html += "<option value='" + i + "' " + selected + ">" + i + "/" + pageNum + "</option>";
              }

              $('#selectId').html(html);
              $('img').addClass('media-object prd_img');
          }
      });
  }