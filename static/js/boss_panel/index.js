/**
 * Created by zhangzinan on 2017/3/27.
 */

// 欢迎信息
$(document).ready(function() {
    setTimeout(function () {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 2000
        };
        toastr.success('', 'Welcome to BOSS Panel!');

    }, 1300);
});
