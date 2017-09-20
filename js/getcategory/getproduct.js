  // 获取传递的参数id值
  var id = getRequest('productId');
  // 获取链接传递的参数name
  var brandName = getRequest('brandName');

  $('.list_nav').children('ul').children('li').eq(2).children('span').html(brandName);


  // 商品数据获取与渲染
  $.ajax({
      type: 'get',
      url: 'http://139.199.192.48:9090/api/getproduct',
      data: {
          productid: id || 0
      },
      success: function(data) {
          $('.product_show').append(template('product_show_tpl', data.result));
      }
  });

  // 网友评价数据获取与渲染
  $.ajax({
      type: 'get',
      url: 'http://139.199.192.48:9090/api/getproductcom',
      data: {
          productid: id || 0
      },
      success: function(data) {
          $('.com_list').html(template('com_list_tpl', data.result));
      }
  });

  //   获取链接的id值
  function getRequest(key) {
      var url = window.location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
              //就是这句的问题
              theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
              //之前用了unescape()
              //才会出现乱码
          }
      }
      return key ? theRequest[key] : theRequest;
  }