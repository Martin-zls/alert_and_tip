(function($){
    //alert弹出框方法
    alertArr = [];
    alertzIndex = 999;

    //在页面中加入遮罩层
    $(function(){
        var $body = $('body');console.log($('body'));
        var $zhezhao = $("#nt-crm-zhezhao");
        console.log($zhezhao.length);
        if(!$zhezhao.length){
            $body.append('<div id="nt-crm-zhezhao"></div>');
        }
    });
    
    //弹出框事件
    $.fn.nt_alert = function(){
        var json1 = {};

        if (arguments.length > 1) {
            json1["htmlstr"] = arguments[0];
            json1["title"] = arguments[1];
            json1["confirm"] = arguments[2];
            json1["cancel"] = arguments[3];
            json1["confirmtxt"] = arguments[4];
            json1["canceltxt"] = arguments[5];
        }
        else {
            json1 = arguments[0];
        }

        var json = json1;
        json.id = json1.id ? json1.id : 0;
        json.zhezhao = json1.zhezhao ? json1.zhezhao : true;

        if (!json.htmlstr) {
            nt.func.showLog("弹出框内容不能为空！");
            return;
        }

        if (!json.title) {
            nt.func.showLog("弹出框标题不能为空！");
            return;
        }

        //自定义按钮字体，如果没有定义，则使用确定和取消
        var txt1 = json.confirmtxt ? json.confirmtxt : "确定";
        var txt2 = json.canceltxt ? json.canceltxt : "取消";

        var html = '', t, prmalertbox;
        var $zhezhao = $("#nt-crm-zhezhao");

        //如果传的参数中包含id说明这个弹出框是常驻类型的，点击关闭后不从文档中删掉
        if (json.id === 0) {
            t = +new Date;
        }
        else {
            t = json.id;

            prmalertbox = document.getElementById('prmAlert' + t);
            if (prmalertbox) {
                prmalertbox.style.display = "block";
                if (json.zhezhao) {
                    //zhezhao = doc.getElementById("prm-zhezhao");
                    $zhezhao.show().css('z-index',alertzIndex);
                }
                return;
            }
        }

        //生成弹出框的框架
        html += '<div class="hd">';
        html += '<h4>' + json.title + '</h4>';
        html += '<span class="close">×</span>';
        html += '</div>';
        html += '<div class="box">';
        html += '<div class="bd">';
        html += json.htmlstr;
        html += '</div>';
        if(json.confirm || json.cancel){
            html += '<div class="fd">';

            //设置确认按钮的文字
            if (json.confirm) {
                html += '<a href="javascript:;" class="btn btn-confirm">' + txt1 + '</a>';
            }
            //设置取消按钮的文字
            if (json.cancel) {
                html += '<a href="javascript:;" class="btn btn-cancel">' + txt2 + '</a>';
            }
            html += '</div>';
        }
        html += '</div>';

        //把弹出框添加到document中
        var alertbox = document.createElement('div');
        alertbox.id = 'prmAlert' + t;
        alertbox.className = "nt-crm-Alert";

        //如果有id，说明是常驻的，加上相关属性
        if (json.id === 0) {
            alertbox.setAttribute("data-stay", "no");
        } else {
            alertbox.setAttribute("data-stay", "yes");
        }
        alertbox.innerHTML = html;

        //把弹出框添加到document中
        var $body = $('body');
        $body.append(alertbox);
        //弹出层要往上移
        alertzIndex += 5;
        //如果有id只要提高一层，如果是其他弹出框则提高一百层
        if (json.id === 0) {
            var addzindex = 1;
        }
        else {
            var addzindex = 100;
        }

        //把弹出层显示出来
        $('#prmAlert' + t).show().css('z-index', alertzIndex + addzindex);


        //如果要遮罩层，就把遮罩显示出来
        if (json.zhezhao) {
            $zhezhao.show().css('z-index',alertzIndex);
        }


        //绑定"确认","取消","关闭"按钮事件
        $("#prmAlert"+t).on("click",".btn-confirm",function(){
            var result = json.confirm && json.confirm($('#prmAlert' + t));
            if (result !== false) hideAlert();
        });
        $("#prmAlert"+t).on("click",".close",function(){
            var result = json.close && json.close($('#prmAlert' + t));
            if (result !== false) hideAlert();
        });
        $("#prmAlert"+t).on("click",".btn-cancel",function(){
            var result = json.cancel && json.cancel($('#prmAlert' + t));
            if (result !== false) hideAlert();
        });

        //如果有定义ready事件，执行一下；
        json.ready && json.ready(document.getElementById('chwAlert' + t));

        //隐藏或者删除弹出框的方法
        function hideAlert() {
            if (json.id === 0) {
                $('#prmAlert' + t).remove();
            } else {
                $('#prmAlert' + t).hide();
            }
            var prmalertarr = $(".nt-crm-Alert");
            var stayNo = [];
            var topzindex =0;
            for (var i = 0, len = prmalertarr.length; i < len; i++) {

                if (prmalertarr[i].style.display == "block") {
                    if(prmalertarr[i].style.zIndex > topzindex){
                        topzindex = prmalertarr[i].style.zIndex;
                    }
                    stayNo.push(prmalertarr[i]);
                }
            }

            if (stayNo.length < 1) {
                if (json.zhezhao) {
                    document.getElementById("nt-crm-zhezhao").style.display = "none";
                }
            }
            else {
                if (json.zhezhao) {
                    alertzIndex = topzindex -1;
                    document.getElementById("nt-crm-zhezhao").style.zIndex = alertzIndex;
                }
            }

        }
    }

    // 提示框事件
    $.fn.nt_tip = function (msg, status) {
        var html = "";
        var statusname = status || "info";
        if ($("#nt-crm-Tip").length > 0) {
            $('#nt-crm-Tip .bd .msg').html('<i class="icon"></i>'+msg);
            $('#nt-crm-Tip').show();
        } else {
            html += '<div id="nt-crm-Tip" class="chw_global_tip_'+statusname+'">';
            html += '<div class="bd">';
            html += '<p class="msg"><i class="icon"></i>'+msg+'</p>';
            html += '</div>';
            html += '</div>';
            $('body').append(html);
            $('#nt-crm-Tip').show();
        }
        setTimeout(function(){
            $("#nt-crm-Tip").remove();
        },3000);
    }

})(jQuery);