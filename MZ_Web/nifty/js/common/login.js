$(function () {
    Date.prototype.Format = function (fmt) { //author: meizz   
        var o = {
            "M+": this.getMonth() + 1,                 //月份   
            "d+": this.getDate(),                    //日   
            "h+": this.getHours(),                   //小时   
            "m+": this.getMinutes(),                 //分   
            "s+": this.getSeconds(),                 //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    $("#submit").click(function () {
        if ($("#username").val() == null || $("#username").val() == "") {
            layer.msg('请输入您的用户名');
        }
        else if ($("#password").val() == null || $("#password").val() == "") {
            layer.msg('请输入您的密码');
        }
        else {
            var btn = $(this).button('loading');
            $.ajax({
                type: "POST",
                url: "/login/dologin",
                headers: { "action": "api/account/login" },
                async: true,
                data: { Account: encodeURIComponent($("#username").val()), PWD: $("#password").val(), Remember: $("#remember").prop('checked') },
                dataType: "json",
                success: function (d, textStatus) {
                    btn.button('reset');
                    layer.msg(d.MSG, { icon: d.ICO, time: 2000 }, function () { if (d.RST == 'SUC') { eval(d.JS); } });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status != 0) {
                        layer.msg("请求失败", { icon: 0, time: 2000 });
                    }
                }
            });
            $.ajax({
                type: "GET",
                url: "/login/getinternettime",
                headers: { "action": "api/account/GetInternetTime" },
                async: true,
                success: function (d, textStatus) {
                    var result = JSON.parse(d);
                    if (result.RST == "SUC" && result.Date != undefined && result.Date != null && result.Date != "") {
                        console.log(result.Date)
                        console.log(new Date(result.Date).Format("yyyy-MM-dd"));
                        console.log(new Date());
                        console.log(new Date().Format("yyyy-MM-dd"));
                        if (new Date(result.Date).Format("yyyy-MM-dd") != new Date().Format("yyyy-MM-dd")) {
                            layer.msg("登录失败,系统时间被修改!", { icon: 0, time: 2000 });
                        }
                    }

                }
                
            });
          
        }
    });
    //回车登录
    $.P8.common().keyload(function () { $("#submit").click() });
});

function UpdatePWD() {
    top.layer.open({
        type: 2,
        title: false,
        shade: [0.3, '#393D49'],
        closeBtn: 0,
        content: '/sysuser/updatepwd',
        area: ['500px', '320px']
    });
}