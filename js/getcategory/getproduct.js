  // 获取传递的参数id值
  var id = getRequest('productId');
  // 获取链接传递的参数name
  var brandName = getRequest('brandName');
  var categoryId = getRequest('categoryId');

  // 导航栏的数据编辑
  var href = './getcategory_Prolist.html?categoryId=' + categoryId;
  $('.list_nav').children('ul').children('li').eq(1).children('a').attr('href', href);
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

  /* // 获取页面链接的返回参数方法封装
  function getSearch(key) {
      var searchStr = location.search.slice(1); //获取链接传递的参数并且剪切掉?连接符
      var searchArr = searchStr.split('&'); //以&连接符未为切割点来切割参数字符串组成数组
      var searchObj = {},
          teampArr;

      for (var i = 0; i < searchArr.length; i++) {
          teampArr = searchArr[i].split('=');
          searchObj[teampArr[0]] = teampArr[1];
      }
      return key ? searchObj[key] : searchObj;

  } */

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