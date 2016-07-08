# alert_and_tip

##弹出框的调用方法
$.fn.nt_alert({
    title:"1231",
    htmlstr:"123123",
    confirm:function(){
        alert(1);
    },
    cancel: function(){
        alert(2);
    }
});

##提示框的调用方法
$.fn.nt_tip("123","success");
