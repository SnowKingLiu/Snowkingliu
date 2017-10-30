var config = {
    '.chosen-select'           : {},
    '.chosen-select-deselect'  : {allow_single_deselect:true},
    '.chosen-select-no-single' : {disable_search_threshold:10},
    '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
    '.chosen-select-width'     : {width:"95%"}
    };
for (var selector in config) {
    $(selector).chosen(config[selector]);
}

$(document).ready(function(){
  $("#upgraph").click(function(){
      // 本月
      get_activity_this();
      // 上月
      get_activity_last();

  });
});

//加载用户列表
function onloadcustoms() {
    $.get("/api/activity/customs/",function(data){
        var customs = data["data"];
        for (i in customs){
            $('#last').append('<option value='+customs[i].number+'>'+customs[i].name+'</option>');
            $('#last').trigger("chosen:updated");
        }
    });
}

// 初始化加载customer信息
window.onload = function() {
    // 初始加载客户信息
    onloadcustoms();
    // 本月
    get_activity_this();
    // 上月
    get_activity_last();

};

//获取本月图表
function get_activity_this() {
    // 本月
      $.get(("/api/activity/this/?custom_number="+$("#last option:selected").val()),function(data,status){
          if(status == 'success'&& data['option'] != undefined){
                  myChart1.setOption(data['option']);
          }
          else {
              toastr.error('', data['msg']);
          }
      });
}

//获取上个月图表
function get_activity_last() {
    // 上月
      $.get(("/api/activity/last/?custom_number="+$("#last option:selected").val()),function(data,status){
          if(status == 'success'&& data['option'] != undefined){
                  myChart2.setOption(data['option']);
          }
      });
}

// 指定图表的配置项和数据
var myChart1 = echarts.init(document.getElementById('last_month'), 'macarons');
var myChart2 = echarts.init(document.getElementById('this_month'), 'macarons');
var myChart3 = echarts.init(document.getElementById('chart3'));
var myChart4 = echarts.init(document.getElementById('chart4'));

