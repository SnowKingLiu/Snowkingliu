/**
 * Created by xuejun on 2017/4/6.
 */

// 初始化加载customer信息
// window.onload = function() {
//     //拉伸
//     // stretch();
//     // 加载资讯
//     // acquire_news();
//     // home_news();
//     // 加载相关阅读
//     // news_correlation();
// };

//加载资讯
// 废弃
/*function get_news() {
    $.get("/news/get_news",function(data, status){
        if(status == 'success'){
            for(var i in data['news']){
                $('#all_news').append('<div id=n'+ data['news'][i]['id']+' style="width: 100%; min-height: 120; background: #FCF8E3">');
                if(data['news'][i]['img_urls'][0] != undefined)
                    $('#all_news').append('<img src="'+ data['news'][i]['img_urls'][0]+'" style="width: 40px;height: 30px">');
                $('#all_news').append('<a href="'+ "/news/n"+ data['news'][i]['id'] +'">' + data['news'][i]['title']+'</a></div> <hr />');
            }
        }
    });
}
*/

function home_news() {
    $.get("/news/home_news", function(data, status) {
        data;

        // _.each(type_list, function (data, status) {
        //     if (status == 'success') {
        //         for (var i in data['news']) {
        //             $('#all_news').append('<div id=n' + data['news'][i]['id'] + ' style="width: 100%; min-height: 120; background: #FCF8E3">');
        //             if (data['news'][i]['img_urls'][0] != undefined)
        //                 $('#all_news').append('<img src="' + data['news'][i]['img_urls'][0] + '" style="width: 40px;height: 30px">');
        //             $('#all_news').append('<a href="' + "/news/n" + data['news'][i]['id'] + '">' + data['news'][i]['title'] + '</a></div> <hr />');
        //         }
        //     }
        // });
    });
}


document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==27){ // 按 Esc
        //要做的事情
      }
    if(e && e.keyCode==113){ // 按 F2
         //要做的事情
       }
     if(e && e.keyCode==13){ // enter 键
         search_title();
    }
};

// 获取快速选择
function category(e) {
    $.get("/news/get_category_news/?type=" + e.firstChild.data,function(data, status){
        if(status == 'success'){
            for(var i in data['news']){
                $('#all_news').append('<div id=n'+ data['news'][i]['id']+' style="width: 100%; min-height: 120; background: #FCF8E3">');
                if(data['news'][i]['img_urls'][0] != undefined)
                    $('#all_news').append('<img src="'+ data['news'][i]['img_urls'][0]+'" style="width: 40px;height: 30px">');
                $('#all_news').append('<a href="'+ "/news/n"+ data['news'][i]['id'] +'">' + data['news'][i]['title']+'</a></div> <hr />');
            }
        }
    });
}

// 显示左边工具栏

// 禁用滚动

// 鼠标事件
// 导航栏
$(document).ready(function(){
  $(".snow-menu-item").mouseover(function(){
  // $(".snow-menu-item").live('mouseover',function(e){
    this.children[0].style.color = "#005689";
  });
  $(".snow-menu-item").mouseout(function(){
    this.children[0].style.color = "#FFFFFF";
  });
});
// 新闻块儿
// document.onmouseover=function(e){
//     this
//     e.style.padding = "2px";
//     e.style.background = "#F4F4F4";
//     e.style.borderStyle = "solid";
//     e.style.borderColor = "#EDEDED";
//     e.style.borderWidth = "10px";
// };
// $(document).ready(function(){
//   $(".news-piece").mouseover(function(e){
//       this.style.padding = "2px";
//       this.style.background = "#F4F4F4";
//       this.style.borderStyle = "solid";
//       this.style.borderColor = "#EDEDED";
//       this.style.borderWidth = "10px";
//
//       // .css({"border-width":"5px", "border-color":"#EDEDED",})border-style:solid; border-color: #EDEDED; border-width: 10px;
//   });
//   $(".news-piece").mouseout(function(){
//     this.style.background = "#FFFFFF";
//       this.style.padding = "10px";
//       this.style.borderWidth = "0px";
//   });
// });

//拉伸事件
$(window).resize(function(){
   stretch();
});

//拉伸函数
function stretch() {
    // $(".snow-size-3").height($(".snow-size-6").height());
    // 是否没有超大框
    // if($(".snow-size-6").height() != null){
    //     // 屏幕过窄
    //     if($(".snow-size-6").height() - $(".snow-size-3").height() < 50){
    //         // 拉伸3
    //         $(".snow-size-3").delay(100).children("h3").height($(".snow-size-3").children("h3").height()+
    //             ($(".snow-size-6").height() -$(".snow-size-3").height()))
    //         // 隐藏3-0 显示12-0
    //         $(".snow-size-3-0").hide();
    //         $(".snow-size-12-0").show();
    //
    //     }
    //     else {
    //         // 加第一个
    //         $(".snow-size-6").children("h3").height($(".snow-size-6").children("h3").height() +
    //             ($(".snow-size-3").height() + $(".snow-size-3-0").height() - $(".snow-size-6").height() + 40))
    //         $(".snow-size-3").children("h3").height(($(".snow-size-6").children("h3").height() - 264) / 2)
    //         $(".snow-size-3-0").children("h3").height(($(".snow-size-6").children("h3").height() - 264) / 2)
    //
    //         // 隐藏12-0 显示3-0
    //         $(".snow-size-12-0").hide();
    //         $(".snow-size-3-0").show();
    //     }
    // }
    // else {
    //     if($(".snow-size-6-0").children("h3").height() < $(".snow-size-6-0").parent().parent().find(".snow-size-3-0").height()) {
    //         $(".snow-size-6-0").children("h3").height($(".snow-size-6-0").children("h3").height() + $(".snow-size-6-0").parent().parent().find(".snow-size-3-0").height()- $(".snow-size-6-0").height())
    //         $(".snow-size-6-0").children("h3").height($(".snow-size-6-0").parent().parent().find("h3").height());
    //         $(".snow-size-3-0").parent().parent().find("h3").height()
    //         //获取长度
    //         var len = $(".snow-size-3-0").parent().parent().find("h3").length;
    //         var array_h3 = new Array();
    //         while(len>0){
    //             len = len - 1;
    //             array_h3[len] = $(".snow-size-3-0").parent().parent().find("h3")[len].offsetHeight;
    //         }
    //         _.max(array_h3)
    //         len = $(".snow-size-3-0").parent().parent().find("h3").length;
    //         while(len>0){
    //             len = len - 1;
    //             $(".snow-size-3-0").parent().parent().find("h3")[len].style.height = _.max(array_h3)+"px";
    //         }
    //     }
    // }

}

// 构造主页
function add_Home_Html(data) {
    var type_dic = {'推荐':'recommend', '肿瘤科': 'cancer', '胃病': 'stomach', '糖尿病科': 'diabetes', '心血管科': 'cvd',
        '肝病科': 'liver', '肾病科': 'kidney', '男科': 'man', '妇科': 'woman', '耳鼻喉科': 'ent', '眼科': 'eye',
        '口腔科': 'mouth', '神经科': 'nerve', '骨科': 'bone', '泌尿科': 'urinary', '皮肤科': 'skin',
        '营养科': 'nutrition', '肛肠科': 'anorectum', '整形外科': 'plastic', '不孕不育': 'infertility',
        '心理科': 'psychology', '育儿': 'baby', '老人': 'oldman', '保健': 'care', '养生': 'health',
        '减肥': 'weight', '科普': 'science', '体育': 'sports', '社会': 'society', '科技': 'technology',
        '时尚': 'fashion', '军事': 'military', '财经': 'economy', '美食': 'cate'}
    type = Object.keys(data)[0];
    var type_id = type_dic[type];
    var article_1 = data[type]['img'][0]
    var article_2 = data[type]['img'][1]
    var article_3 = data[type]['img'][2]
    var article_4 = data[type]['no_img'][0]
    var article_5 = data[type]['no_img'][1]
    // <h1>肿瘤科</h1>
    // $("#" + type_id).append("");
    // <div class="row"><!--大标题-->
    //     <div class="col-lg-6 col-md-6 col-sm-6 news-piece-out">
    //         <div class="news-piece snow-size-6">
    //             <!--标题-->
    //             <h3><i>头条</i>/2013级医疗器械与食品学院医学信息工程本科生</h3>
    //             <!--操作-->
    //             <div>
    //                 <span class="glyphicon glyphicon-time" style="color: #999999;">13小时以前</span>
    //                 <b style="color: #999999;">|</b>
    //                 <span class="glyphicon glyphicon-comment" style="color: #999999;">13</span>
    //                 <div class="">
    //                     <h6></h6>
    //                 </div>
    //             </div>
    //             <!--图片-->
    //             <div>
    //                 <img class="news_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494014234127&di=f0f034d6cc2dadf110efee64ed867f1f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbaike%2Fpic%2Fitem%2Ffab3ac1198dcf56dcb80c447.jpg" alt="2013级医疗器械与食品学院医学信息工程本科生">
    //             </div>
    //         </div>
    //     </div>
    //     <div class="col-lg-3 col-md-3 col-sm-3 news-piece-out">
    //         <div class="news-piece snow-size-3">
    //             <!--标题-->
    //             <h3><i>头条</i>/2013级医疗器械与食品学院医学信息工程本科生</h3>
    //             <!--操作-->
    //             <div>
    //                 <span class="glyphicon glyphicon-time" style="color: #999999;">13小时以前</span>
    //                 <b style="color: #999999;">|</b>
    //                 <span class="glyphicon glyphicon-comment" style="color: #999999;">13</span>
    //                 <div class="">
    //                     <h6></h6>
    //                 </div>
    //             </div>
    //             <!--图片-->
    //             <div>
    //                 <img class="news_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494014234127&di=f0f034d6cc2dadf110efee64ed867f1f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbaike%2Fpic%2Fitem%2Ffab3ac1198dcf56dcb80c447.jpg" alt="2013级医疗器械与食品学院医学信息工程本科生">
    //             </div>
    //         </div>
    //         <div class="news-piece snow-size-3-0">
    //             <!--标题-->
    //             <h3><i>头条</i>/2013级医疗器械与食品学院医学信息工程本科生</h3>
    //             <!--操作-->
    //             <div>
    //                 <span class="glyphicon glyphicon-time" style="color: #999999;">13小时以前</span>
    //                 <b style="color: #999999;">|</b>
    //                 <span class="glyphicon glyphicon-comment" style="color: #999999;">13</span>
    //                 <div class="">
    //                     <h6></h6>
    //                 </div>
    //             </div>
    //             <!--无图片-->
    //         </div>
    //     </div>
    //     <div class="col-lg-3 col-md-3 col-sm-3 news-piece-out">
    //         <div class="news-piece snow-size-3">
    //             <!--标题-->
    //             <h3><i>头条</i>/2013级医疗器械与食品学院医学信息工程本科生</h3>
    //             <!--操作-->
    //             <div>
    //                 <span class="glyphicon glyphicon-time" style="color: #999999;">13小时以前</span>
    //                 <b style="color: #999999;">|</b>
    //                 <span class="glyphicon glyphicon-comment" style="color: #999999;">13</span>
    //                 <div class="">
    //                     <h6></h6>
    //                 </div>
    //             </div>
    //             <!--图片-->
    //             <div>
    //                 <img class="news_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494014234127&di=f0f034d6cc2dadf110efee64ed867f1f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbaike%2Fpic%2Fitem%2Ffab3ac1198dcf56dcb80c447.jpg" alt="2013级医疗器械与食品学院医学信息工程本科生">
    //             </div>
    //         </div>
    //         <div class="news-piece snow-size-3-0">
    //             <!--标题-->
    //             <h3><i>头条</i>/2013级医疗器械与食品学院医学信息工程本科生</h3>
    //             <!--操作-->
    //             <div>
    //                 <span class="glyphicon glyphicon-time" style="color: #999999;">13小时以前</span>
    //                 <b style="color: #999999;">|</b>
    //                 <span class="glyphicon glyphicon-comment" style="color: #999999;">13</span>
    //                 <div class="">
    //                     <h6></h6>
    //                 </div>
    //             </div>
    //             <!--无图片-->
    //         </div>
    //     </div>
    // </div>
    var insertText = '<h1>' + type + '</h1>' +
        '<div class="row"><!--大标题-->' +
        '    <div class="col-lg-6 col-md-6 col-sm-6 news-piece-out">' +
        '        <a style="color: inherit" href="n' + article_1['id'] +'">'+
        '            <div class="news-piece snow-size-6">' +
        '                <!--标题-->' +
        '                <h3><i>' + article_1['type'] +'</i>/' + article_1['title'] +'</h3>' +
        '                <!--操作-->' +
        '                <div>' +
        '                    <span class="glyphicon glyphicon-time" style="color: #999999;">' + article_1['createtime'] + '</span>' +
        '                    <b style="color: #999999;">|</b>' +
        '                    <span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_1['read'] + '</span>' +
        '                    <b class="pull-right"; style="color: #999999;">' + article_1['web'] + '</b>' +
        '                </div>' +
        '                <!--图片-->' +
        '                <div class="news-img-lg">' +
        '                    <img class="news_img" src="' + article_1['img_urls'][0] + '" alt="' + article_1['title'] + '">' +
        '                </div>' +
        '            </div>' +
        '        </a>' +
        '    </div>' +
        '    <div class="col-lg-3 col-md-3 col-sm-3 news-piece-out">' +
        '        <a style="color: inherit" href="n' + article_2['id'] +'">'+
        '            <div class="news-piece snow-size-3">' +
        '                <!--标题-->' +
        '                <h3><i>' + article_2['type'] +'</i>/' + article_2['title'] +'</h3>' +
        '                <!--操作-->' +
        '                <div>' +
        '                    <span class="glyphicon glyphicon-time" style="color: #999999;">' + article_2['createtime'] + '</span>' +
        '                    <b style="color: #999999;">|</b>' +
        '                    <span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_2['read'] + '</span>' +
        '                    <b class="pull-right"; style="color: #999999;">' + article_2['web'] + '</b>' +
        '                </div>' +
        '                <!--图片-->' +
        '                <div class="news-img-sm">' +
        '                    <img class="news_img" src="' + article_2['img_urls'][0] + '" alt="' + article_2['title'] + '">' +
        '                </div>' +
        '            </div>' +
        '        </a>'+
        '        <a style="color: inherit" href="n' + article_4['id'] +'">'+
        '            <div class="news-piece snow-size-3-0">' +
        '                <!--标题-->' +
        '                <h3><i>' + article_4['type'] +'</i>/' + article_4['title'] +'</h3>' +
        '                <!--操作-->' +
        '                <div>' +
        '                    <span class="glyphicon glyphicon-time" style="color: #999999;">' + article_4['createtime'] + '</span>' +
        '                    <b style="color: #999999;">|</b>' +
        '                    <span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_4['read'] + '</span>' +
        '                    <b class="pull-right"; style="color: #999999;">' + article_4['web'] + '</b>' +
        '            </div>' +
        '            <!--无图片-->' +
        '        </div>' +
        '        </a>'+
        '    </div>' +
        '    <div class="col-lg-3 col-md-3 col-sm-3 news-piece-out">' +
        '        <a style="color: inherit" href="n' + article_3['id'] +'">'+
        '            <div class="news-piece snow-size-3">' +
        '                <!--标题-->' +
        '                <h3><i>' + article_3['type'] +'</i>/' + article_3['title'] +'</h3>' +
        '                <!--操作-->' +
        '                <div>' +
        '                    <span class="glyphicon glyphicon-time" style="color: #999999;">' + article_3['createtime'] + '</span>' +
        '                    <b style="color: #999999;">|</b>' +
        '                    <span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_3['read'] + '</span>' +
        '                    <b class="pull-right"; style="color: #999999;">' + article_3['web'] + '</b>' +
        '                </div>' +
        '                <!--图片-->' +
        '                <div class="news-img-sm">' +
        '                    <img class="news_img" src="' + article_3['img_urls'][0] + '" alt="' + article_3['title'] + '">' +
        '                </div>' +
        '            </div>' +
        '        </a>'+
        '        <a style="color: inherit" href="n' + article_5['id'] +'">'+
        '            <div class="news-piece snow-size-3-0">' +
        '                <!--标题-->' +
        '                <h3><i>' + article_5['type'] +'</i>/' + article_5['title'] +'</h3>' +
        '                <!--操作-->' +
        '                <div>' +
        '                    <span class="glyphicon glyphicon-time" style="color: #999999;">' + article_5['createtime'] + '</span>' +
        '                    <b style="color: #999999;">|</b>' +
        '                    <span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_5['read'] + '</span>' +
        '                    <b class="pull-right"; style="color: #999999;">' + article_5['web'] + '</b>' +
        '                </div>' +
        '                <!--无图片-->' +
        '            </div>' +
        '        </a>'+
        '    </div>' +
        '</div>' +
        // '<div class="row snow-size-12-0">' +
        // '    <div class="col-lg-6 col-md-6 col-sm-6 news-piece-out">' +
        // '        <div class="news-piece snow-size-3-0">' +
        // '            <!--标题-->' +
        // '            <h3><i>' + article_4['type'] +'</i>/' + article_4['title'] +'</h3>' +
        // '            <!--操作-->' +
        // '            <div>' +
        // '                <span class="glyphicon glyphicon-time" style="color: #999999;">' + article_4['createtime'] + '</span>' +
        // '                <b style="color: #999999;">|</b>' +
        // '                <span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_4['read'] + '</span>' +
        // '            </div>' +
        // '            <!--无图片-->' +
        // '        </div>' +
        // '    </div>' +
        // '</div>'+
        // '<div class="row snow-size-12-0">' +
        // '    <div class="col-lg-6 col-md-6 col-sm-6 news-piece-out">' +
        // '        <div class="news-piece snow-size-3-0">' +
        // '            <!--标题-->' +
        // '            <h3><i>' + article_5['type'] +'</i>/' + article_5['title'] +'</h3>' +
        // '            <!--操作-->' +
        // '            <div>' +
        // '                <span class="glyphicon glyphicon-time" style="color: #999999;">' + article_5['createtime'] + '</span>' +
        // '                <b style="color: #999999;">|</b>' +
        // '                <span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_5['read'] + '</span>' +
        // '            </div>' +
        // '            <!--无图片-->' +
        // '        </div>' +
        // '    </div>' +
        // '</div>' +
        '<!--更多-->' +
        '<div class="pull-right">' +
        '    <a href="/news/class/'+ type_dic[type] +'" class="news-read-more">' +
        '        <h4>阅读更多<span class="glyphicon glyphicon-arrow-right";></span></h4>' +
        '    </a>' +
        '</div>'
    // document.getElementById(type_id).innerHTML = insertText;

    $("#" + type_id).append(insertText)
    // $("#" + type_id).append(
    //     // '<div class="row">' +
    //     //     '<div class="col-lg-6 col-md-6 col-sm-6 news-piece-out">' +
    //     //         // article_1
    //     //         '<div class="news-piece snow-size-6">' +
    //     //             // <!--标题-->
    //     //             '<h3><i>' + type + '</i>/' + article_1['title'] + '</h3>' +
    //     // //             <!--操作-->
    //     //             '<div>' +
    //     //                 '<span class="glyphicon glyphicon-time" style="color: #999999;">'+ article_1['createtime'] +'</span>' +
    //     //                 '<b style="color: #999999;">|</b>' +
    //     //                 '<span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_1['read'] + '</span>' +
    //     //                 '<div class="">' +
    //     //                     '<h6></h6>' +
    //     //                  '</div>' +
    //     //             '</div>' +
    //     // //             <!--图片-->
    //     //             '<div>' +
    //     //                 '<img class="news_img" src="' + article_1['img_urls'][0] + '" alt="' + article_1['title'] + '">' +
    //     //             '</div>'+
    //     //         '</div>'+
    //     //     '</div>' +
    //     //     // article_2
    //     //     '<div class="col-lg-3 col-md-3 col-sm-3 news-piece-out">' +
    //     //         '<div class="news-piece snow-size-3">' +
    //     //             // <!--标题-->
    //     //             '<h3><i>' + type + '</i>/' + article_2['title'] + '</h3>' +
    //     //             // <!--操作-->
    //     //             '<div>' +
    //     //                 '<span class="glyphicon glyphicon-time" style="color: #999999;">'+ article_2['createtime'] +'</span>' +
    //     //                 '<b style="color: #999999;">|</b>' +
    //     //                 '<span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_2['read'] + '</span>' +
    //     //                 '<div class="">' +
    //     //                     '<h6></h6>' +
    //     //                  '</div>' +
    //     //             '</div>' +
    //     //         '</div>' +
    //     //         <!--图片-->
    //     //         '<div>' +
    //     //             '<img class="news_img" src="' + article_2['img_urls'][0] + '" alt="' + article_2['title'] + '">' +
    //     //         '</div>'+
    //     //     '</div>'+
    //     //     // article_3
    //     //     '<div class="col-lg-3 col-md-3 col-sm-3 news-piece-out">' +
    //     //         '<div class="news-piece snow-size-3">' +
    //     //             // <!--标题-->
    //     //             '<h3><i>' + type + '</i>/' + article_3['title'] + '</h3>' +
    //     //             // <!--操作-->
    //     //             '<div>' +
    //     //                 '<span class="glyphicon glyphicon-time" style="color: #999999;">'+ article_3['createtime'] +'</span>' +
    //     //                 '<b style="color: #999999;">|</b>' +
    //     //                 '<span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_3['read'] + '</span>' +
    //     //                 '<div class="">' +
    //     //                     '<h6></h6>' +
    //     //                  '</div>' +
    //     //             '</div>' +
    //     //         '</div>' +
    //     //         <!--图片-->
    //     //         '<div>' +
    //     //             '<img class="news_img" src="' + article_3['img_urls'][0] + '" alt="' + article_3['title'] + '">' +
    //     //         '</div>'+
    //     //     '</div>' +
    //     // '</div>' +
    //     // '<div class="col-lg-3 col-md-3 col-sm-3 news-piece-out">' +
    //     //     // article_4
    //     //     '<div class="news-piece snow-size-3">' +
    //     //         // <!--标题-->
    //     //         '<h3><i>' + type + '</i>/' + article_4['title'] + '</h3>' +
    //     //         // <!--操作-->
    //     //         '<div>' +
    //     //             '<span class="glyphicon glyphicon-time" style="color: #999999;">'+ article_4['createtime'] +'</span>' +
    //     //             '<b style="color: #999999;">|</b>' +
    //     //             '<span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_4['read'] + '</span>' +
    //     //             '<div class="">' +
    //     //                 '<h6></h6>' +
    //     //             '</div>' +
    //     //         '</div>' +
    //     //     '</div>' +
    //     //     // article_5
    //     //     '<div class="news-piece snow-size-3">' +
    //     //         // <!--标题-->
    //     //         '<h3><i>' + type + '</i>/' + article_5['title'] + '</h3>' +
    //     //         // <!--操作-->
    //     //         '<div>' +
    //     //             '<span class="glyphicon glyphicon-time" style="color: #999999;">'+ article_5['createtime'] +'</span>' +
    //     //             '<b style="color: #999999;">|</b>' +
    //     //             '<span class="glyphicon glyphicon-comment" style="color: #999999;">' + article_5['read'] + '</span>' +
    //     //             '<div class="">' +
    //     //                 '<h6></h6>' +
    //     //             '</div>' +
    //     //         '</div>' +
    //     //     '</div>' +
    //     // '</div>'
    //     );
    //拉伸
    stretch();

}

// $("outerSelector").on('eventType','selector',function(){})；
// $("tbody").on('click',"[name='submitbutton']",function(){....});
// $(document).on("click", ".waiting-save", function () {
//     $('news-piece').html('@T("Saving...")')
//         $(this).attr("disabled", "");
//         SaveAction(this);
// });
// $(".news-piece").on('click', "", function(){
//     alert(this);
// });


// 侵删 tort
$(document).ready(function(){
    $("#tort").click(function(){
        $.post("/news/tort",{
			url: window.location.pathname
		},
		function(data,status){
            if(data['success'])
			    alert("举报成功，管理员核实后会进行删除。");
            else {
			    alert("举报失败，请重试。");
            }
		});
    });
});


$(document).ready(function(){
  $("#news_search").click(function(){
      search_title();
  });
});


// 查找
function search_title() {
    var url = '/news/search_news/';
    var content = $("#news_input").val();
    if(content!=''){
        location.href=url+"?content="+content;
    }


    //   $.get("/news/query_title/?content="+$("#news_input").val(),function(data, status){
    //     if(status == 'success'){
    //         for(var i in data['news']){
    //             $('#all_news').append('<div id=n'+ data['news'][i]['id']+' style="width: 100%; min-height: 120; background: #FCF8E3">');
    //             if(data['news'][i]['img_urls'][0] != undefined)
    //                 $('#all_news').append('<img src="'+ data['news'][i]['img_urls'][0]+'" style="width: 40px;height: 30px">');
    //             $('#all_news').append('<a href="'+ "/news/n"+ data['news'][i]['id'] +'">' + data['news'][i]['title']+'</a></div> <hr />');
    //         }
    //     }
    // });
}