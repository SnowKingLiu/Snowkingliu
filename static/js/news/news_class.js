// 初始化加载customer信息
window.onload = function() {
    //拉伸
    // stretch();
    // 加载资讯
    get_class_news();
    // home_news();
};


// 滚动加载
$(document).ready(function() {
    $(window).scroll(function() {
        //$(document).scrollTop() 获取垂直滚动的距离
        //$(document).scrollLeft() 这是获取水平滚动条的距离
        if ($(document).scrollTop() <= 0) {
            // alert("滚动条已经到达顶部为0");
        }
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            // alert("滚动条已经到达底部为" + $(document).scrollTop());
            // document.cookie="time="+;
            if(getCookie('snow-news-load') == '0'){
                document.cookie="snow-news-load=1";
                var last_time = getCookie('snow-news-class');
                document.cookie="snow-news-class=" + (parseInt(last_time) + 1);
                last_time = getCookie('snow-news-class');
                add_class_news(last_time);
            }
            // $.cookie('snow-news-class', last_time + 1);
            // var last = getCookie('snow-news-class');

        }
    });
});

function get_class_news() {
    // $.cookie('snow-news-class', 0);
    document.cookie="snow-news-class=0";
    document.cookie="snow-news-row_1=0";
    document.cookie="snow-news-row_2=0";
    document.cookie="snow-news-row_3=0";
    document.cookie="snow-news-row_4=0";
    add_class_news(0);
}
function add_class_news(last_time) {
    $.get("/news/get_class_news?pathname="+window.location.pathname + "&last_time=" + last_time , function(data, status) {
        data
        $.each(data, function(name, value) {
            name
            value
            var i = 0;
            var html = '';
            if(value['image_url'] != ''){
                i = 2;
                html =
                    '<div class="news-piece-out">'+
                        '<a style="color: inherit" href="/news/n' + value['id'] + '">'+
                            '<div class="news-piece snow-size-3">'+
                                '<!--标题-->'+
                                '<h3>' + value['title'] + '</h3>'+
                                '<!--操作-->'+
                                '<div>'+
                                    '<span class="glyphicon glyphicon-time" style="color: #999999;">' + value['createtime'] + '</span>'+
                                    '<b style="color: #999999;">|</b>'+
                                    '<span class="glyphicon glyphicon-comment" style="color: #999999;">' + value['read'] + '</span>'+
                                '</div>'+
                                '<!--图片-->'+
                                '<div class="news-img-sm">'+
                                    '<img class="news_img" src="' + value['image_url'] + '" alt="' + value['title'] + '">'+
                                '</div>'+
                            '</div>'+
                        '</a>'+
                    '</div>';
            }
            else {
                i = 1;
                var html =
                    '<div class="news-piece-out">'+
                        '<a style="color: inherit" href="/news/n' + value['id'] + '">'+
                            '<div class="news-piece snow-size-3-0">'+
                                '<!--标题-->'+
                                '<h3>' + value['title'] + '</h3>'+
                                '<!--操作-->'+
                                '<div>'+
                                    '<span class="glyphicon glyphicon-time" style="color: #999999;">' + value['createtime'] + '</span>'+
                                    '<b style="color: #999999;">|</b>'+
                                    '<span class="glyphicon glyphicon-comment" style="color: #999999;">' + value['read'] + '</span>'+
                                '</div>'+
                            '</div>'+
                        '</a>'+
                    '</div>';
            }
            var row_1 = parseInt(getCookie('snow-news-row_1'));
            var row_2 = parseInt(getCookie('snow-news-row_2'));
            var row_3 = parseInt(getCookie('snow-news-row_3'));
            var row_4 = parseInt(getCookie('snow-news-row_4'));
            var row = min_row(row_1,row_2,row_3,row_4);
            $("#" + row).append(html);
            cook_val = parseInt(getCookie('snow-news-' + row)) + 1;
            document.cookie="snow-news-" + row + "= " + cook_val;
            document.cookie="snow-news-load=0";
        });
        var i = 0;

        while (i<5){
            if (data[i]['url'] != ''){
                var correlation_html =
                    '<div style="width: 100%;padding: 10px;">'+
                        '<a href="/news/n' + data[i]['id'] + '">'+
                            '<img class=" news-correlation-img" style="float: left" src="' + data[i]['url'] + '" alt="' + data[i]['title'] + '">'+
                            '<div class="news-correlation-title">'+
                                data[i]['title'] +
                            '</div>'+
                        '</a>'+
                    '</div>'+
                    '<hr>'
            }
            else {
                var correlation_html =
                    '<div style="width: 100%;padding: 10px;">'+
                        '<a href="/news/n' + data[i]['id'] + '">'+
                            '<div class="news-correlation-title">'+
                                data[i]['title'] +
                            '</div>'+
                        '</a>'+
                    '</div>'+
                    '<hr>'
            }

            $("#news_correlation").append(correlation_html);
            i +=1;
        }

        // var correlation_html =
        //     '<li class="media">'+
        //         '<a class="pull-left" href="/news/n' + data['0']['id'] + '">'+
        //             '<img class="media-object news-correlation-img" src="' + data['0']['url'] + '"'+
        //                  'alt="' + data['0']['title'] + '">'+
        //         '</a>'+
        //         '<div class="media-body">'+
        //             '<h4 class="media-heading news-correlation-title">' + data['0']['title'] + '</h4>'+
        //             '<p class=" news-correlation-body">'+
        //                  + data['0']['content']  +
        //             '</p>'+
        //         '</div>'+
        //     '</li>'+
        //     '<li class="media">'+
        //         '<a class="pull-left" href="/news/n' + data['1']['id'] + '">'+
        //             '<img class="media-object news-correlation-img" src="' + data['1']['url'] + '"'+
        //                  'alt="' + data['1']['title'] + '">'+
        //         '</a>'+
        //         '<div class="media-body">'+
        //             '<h4 class="media-heading news-correlation-title">' + data['1']['title'] + '</h4>'+
        //             '<p class=" news-correlation-body">'+
        //                  + data['1']['content']  +
        //             '</p>'+
        //         '</div>'+
        //     '</li>'+
        //     '<li class="media">'+
        //         '<a class="pull-left" href="/news/n' + data['2']['id'] + '">'+
        //             '<img class="media-object news-correlation-img" src="' + data['2']['url'] + '"'+
        //                  'alt="' + data['2']['title'] + '">'+
        //         '</a>'+
        //         '<div class="media-body">'+
        //             '<h4 class="media-heading news-correlation-title">' + data['2']['title'] + '</h4>'+
        //             '<p class=" news-correlation-body">'+
        //                  + data['2']['content']  +
        //             '</p>'+
        //         '</div>'+
        //     '</li>'+
        //     '<li class="media">'+
        //         '<a class="pull-left" href="/news/n' + data['3']['id'] + '">'+
        //             '<img class="media-object news-correlation-img" src="' + data['3']['url'] + '"'+
        //                  'alt="' + data['3']['title'] + '">'+
        //         '</a>'+
        //         '<div class="media-body">'+
        //             '<h4 class="media-heading news-correlation-title"' + data['3']['title'] + '</h4>'+
        //             '<p class=" news-correlation-body">'+
        //                  + data['3']['content']  +
        //             '</p>'+
        //         '</div>'+
        //     '</li>'+
        //     '<li class="media">'+
        //         '<a class="pull-left" href="/news/n' + data['4']['id'] + '">'+
        //             '<img class="media-object news-correlation-img" src="' + data['4']['url'] + '"'+
        //                  'alt="' + data['4']['title'] + '">'+
        //         '</a>'+
        //         '<div class="media-body">'+
        //             '<h4 class="media-heading news-correlation-title">' + data['4']['title'] + '</h4>'+
        //             '<p class=" news-correlation-body">'+
        //                  + data['4']['content']  +
        //             '</p>'+
        //         '</div>'+
        //     '</li>';

        // $("#news_correlation").append(correlation_html);
    });
}

function min_row(row_1,row_2,row_3,row_4) {
    if(row_1 <= row_2 && row_1 <= row_3 && row_1 <= row_4 ){
        return 'row_1';
    }
    else if(row_2 < row_1 && row_2 <= row_3 && row_2 <= row_4){
        return 'row_2';
    }
    else if(row_3 < row_1 && row_3 <= row_2 && row_3 <= row_4){
        return 'row_3';
    }
    else if(row_4 < row_1 && row_4 <= row_2 && row_4 < row_3){
        return 'row_4';
    }
    
}

function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}



