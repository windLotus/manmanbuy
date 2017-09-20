  // 数据初始化
  var page = 1;
  var pageNum;
  getPage(page);

  // 选择页码跳转功能
  $('#selectId').on('change', function() {
      page = $(this).val();
      location.href = "#";
      getPage(page);
  });

  // 实现点击上一页功能
  $('.btn_prev').click(function() {
      if (page < 1) {
          return;
      }
      page--;
      getPage(page);
  });

  // 实现点击下一页功能
  $('.btn_next').click(function() {
      if (page >= pageNum) {
          return;
      }
      page++;
      getPage(page);
  });

  // 数据请求与模板喧染方法封装
  function getPage(page) {
      $.ajax({
          url: 'http://139.199.192.48:9090/api/getmoneyctrl',
          data: {
              pageid: page || 1
          },
          async: false,
          success: function(data) {
              $('#save-list').html(template('save-tpl', data.result));
              // 获取数据计算总页数
              pageNum = Math.ceil(data.totalCount / data.pagesize);
              var html = "";
              // 循环输出模板
              for (var i = 1; i <= pageNum; i++) {
                  var sel = page == i ? 'selected' : '';
                  html += "<option value='" + i + "' " + sel + ">" + i + "/" + pageNum + "</option>"
              };
              // 见模板追加至页面
              $('#selectId').html(html);
          }
      })
  }