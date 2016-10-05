/**
 * Created by HJP on 2016/9/26.
 */
$(document).ready(function () {
    $(".button").hover(function () {
        var tip = $(this).attr("data-title");
        $(".tip em").text(tip);
        /*获取幽灵按钮的宽度和.tip em的宽度，两者相减再除以2，算出.tip的left位置*/
        var btnLeft = $(this).offset().left;
        var btnW = $(this).offsetWidth;
        var tipTextW = $(".tip").offsetWidth;

        var distance = (btnW - tipTextW) / 2;
        var tipTextLeft = btnLeft + distance;


        /*将提示文本显示在幽灵按钮之上(紧贴)*/
        //获取幽灵按钮的top
        var btnTop = $(".button").offsetTop;
        /*获取提示文本的高度*/
        var tipTextH = $(".tip em").offsetHeight;
        //幽灵按钮的top-(提示文本的高度+三角形的高度)，作为提示文本的Top
        var tipTextTop = btnTop - tipTextH - 14;

        $(".tip em").css({"left": tipTextLeft + "px", "top": tipTextTop + "px", "opacity": 1});

    });
});

