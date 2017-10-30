/**
 * Created by xuejun on 2017/5/8.
 */

// 初始化加载customer信息
window.onload = function() {
    //拉伸
    // stretch();
    // 加载资讯
    news_correlation();
    // home_news();
};

// 加载相关阅读
// function news_correlation() {
//     $.get("/news/news_correlation?pathname="+window.location.pathname, function(data, status) {
//         data
//         var i = 0;
//         while (i<5){
//             if (data[i]['url'] != ''){
//                 var correlation_html =
//                     '<div style="height:78px; width: 100%;padding: 10px;">'+
//                         '<a href="/news/n' + data[i]['id'] + '">'+
//                             '<img class=" news-correlation-img" style="float: left" src="' + data[i]['url'] + '" alt="' + data[i]['title'] + '">'+
//                             '<div class="news-correlation-title">'+
//                                 data[i]['title'] +
//                             '</div>'+
//                         '</a>'+
//                     '</div>'+
//                     '<hr />'
//             }
//             else {
//                 var correlation_html =
//                     '<div style="height: 78px; width: 100%;padding: 10px;">'+
//                         '<a href="/news/n' + data[i]['id'] + '">'+
//                             '<div class="news-correlation-title">'+
//                                 data[i]['title'] +
//                             '</div>'+
//                         '</a>'+
//                     '</div>'+
//                     '<hr />'
//             }
//
//             $("#news_correlation").append(correlation_html);
//             i +=1;
//         }
//
//         // var correlation_html =
//         //     '<li class="media">'+
//         //         '<a class="pull-left" href="/news/n' + data['0']['id'] + '">'+
//         //             '<img class="media-object news-correlation-img" src="' + data['0']['url'] + '"'+
//         //                  'alt="' + data['0']['title'] + '">'+
//         //         '</a>'+
//         //         '<div class="media-body">'+
//         //             '<h4 class="media-heading news-correlation-title">' + data['0']['title'] + '</h4>'+
//         //             '<p class=" news-correlation-body">'+
//         //                  + data['0']['content']  +
//         //             '</p>'+
//         //         '</div>'+
//         //     '</li>'+
//         //     '<li class="media">'+
//         //         '<a class="pull-left" href="/news/n' + data['1']['id'] + '">'+
//         //             '<img class="media-object news-correlation-img" src="' + data['1']['url'] + '"'+
//         //                  'alt="' + data['1']['title'] + '">'+
//         //         '</a>'+
//         //         '<div class="media-body">'+
//         //             '<h4 class="media-heading news-correlation-title">' + data['1']['title'] + '</h4>'+
//         //             '<p class=" news-correlation-body">'+
//         //                  + data['1']['content']  +
//         //             '</p>'+
//         //         '</div>'+
//         //     '</li>'+
//         //     '<li class="media">'+
//         //         '<a class="pull-left" href="/news/n' + data['2']['id'] + '">'+
//         //             '<img class="media-object news-correlation-img" src="' + data['2']['url'] + '"'+
//         //                  'alt="' + data['2']['title'] + '">'+
//         //         '</a>'+
//         //         '<div class="media-body">'+
//         //             '<h4 class="media-heading news-correlation-title">' + data['2']['title'] + '</h4>'+
//         //             '<p class=" news-correlation-body">'+
//         //                  + data['2']['content']  +
//         //             '</p>'+
//         //         '</div>'+
//         //     '</li>'+
//         //     '<li class="media">'+
//         //         '<a class="pull-left" href="/news/n' + data['3']['id'] + '">'+
//         //             '<img class="media-object news-correlation-img" src="' + data['3']['url'] + '"'+
//         //                  'alt="' + data['3']['title'] + '">'+
//         //         '</a>'+
//         //         '<div class="media-body">'+
//         //             '<h4 class="media-heading news-correlation-title"' + data['3']['title'] + '</h4>'+
//         //             '<p class=" news-correlation-body">'+
//         //                  + data['3']['content']  +
//         //             '</p>'+
//         //         '</div>'+
//         //     '</li>'+
//         //     '<li class="media">'+
//         //         '<a class="pull-left" href="/news/n' + data['4']['id'] + '">'+
//         //             '<img class="media-object news-correlation-img" src="' + data['4']['url'] + '"'+
//         //                  'alt="' + data['4']['title'] + '">'+
//         //         '</a>'+
//         //         '<div class="media-body">'+
//         //             '<h4 class="media-heading news-correlation-title">' + data['4']['title'] + '</h4>'+
//         //             '<p class=" news-correlation-body">'+
//         //                  + data['4']['content']  +
//         //             '</p>'+
//         //         '</div>'+
//         //     '</li>';
//
//         // $("#news_correlation").append(correlation_html);
//     });
// }

// 加载相关阅读
function news_correlation() {
    $.get("/news/news_correlation?pathname="+window.location.pathname, function(data, status) {
        data
        var i = 0;
        while (i<9){
            if (data[i]['url'] != ''){
                var correlation_html =
                    '<div style="height:78px;width: 100%;padding: 10px;margin-bottom: 10px;">'+
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
                    '<div style=";width: 100%;padding: 10px;margin-bottom: 10px;">'+
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

