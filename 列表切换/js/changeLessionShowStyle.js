/**
 * Created by HJP on 2016/9/23.
 */

$(document).ready(function () {
    //squareStyle为class属性值
    $(".squareStyle").bind("click", function () {
        $(".squareStyle").css("backgroundPosition", "0px -26px");
        $(".listStyle").css("backgroundPosition", "-30px -26px");
        //$(".contentList").children().removeClass("lessionContentList").addClass("lessionContentDefault");//第一种方法改变显示方式
        $(".lessionContentDefault").css("float","left");//第二种方法改变显示方式
    });

    $(".listStyle").bind("click", function () {
        $(".listStyle").css("backgroundPosition", "-30px 0px");
        $(".squareStyle").css("backgroundPosition", "0px 0px");
        //$(".contentList").children().removeClass("lessionContentDefault").addClass("lessionContentList");//第一种方法改变显示方式

        $(".lessionContentDefault").css("float","none");//第二种方法改变显示方式

    });
});