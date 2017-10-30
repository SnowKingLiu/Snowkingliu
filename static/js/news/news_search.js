/**
 * Created by xuejun on 2017/5/21.
 */

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
            if(getCookie('snow-news-search-load') == '0'){
                document.cookie="snow-news-search-load=1";
                var last_time = getCookie('snow-news-search');
                document.cookie="snow-news-search=" + (parseInt(last_time) + 1);
                last_time = getCookie('snow-news-search');
                add_class_news(last_time);
            }
            // $.cookie('snow-news-class', last_time + 1);
            // var last = getCookie('snow-news-class');

        }
    });
});