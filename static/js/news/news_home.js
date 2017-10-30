/**
 * Created by xuejun on 2017/5/8.
 */


// 初始化加载customer信息
window.onload = function() {
    //拉伸
    // stretch();
    // 加载资讯
    acquire_news();
    // home_news();
};

function acquire_news() {
    var type_list = {'推荐':0, '肿瘤科': 0, '胃病': 0, '糖尿病科': 0, '心血管科': 0, '肝病科': 0, '肾病科': 0,
        '男科': 0, '妇科': 0, '耳鼻喉科': 0, '眼科': 0, '口腔科': 0, '神经科': 0, '骨科': 0, '泌尿科': 0,
        '皮肤科': 0, '营养科': 0, '肛肠科': 0, '整形外科': 0, '不孕不育': 0, '心理科': 0, '育儿': 0,
        '老人': 0, '保健': 0, '养生': 0, '减肥': 0, '科普': 0, '体育': 0, '社会': 0, '科技': 0, '时尚': 0,
        '军事': 0, '财经': 0, '美食': 0}
        _.forEach(type_list, function(n, key) {
            $.get("/news/acquire_news?type="+key+"&amount="+n, function(data, status) {
                if(key == '推荐'){
                    var a =1;
                }
                add_Home_Html(data['data'])
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
        });

}
