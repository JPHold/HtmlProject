/**
 * Created by HJP on 2016/10/5.
 */

var tipClassName = "tipRect";

window.onload = function () {
    var as = document.getElementsByClassName("tooltip");
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        a.onmousemove = function () {
            var currA=this;
            //延时显示，免得突兀出现
                //不同链接不同提示内容
                var linkText = currA.innerHTML;
                var tipContent = "还未添加";
                var element = "div";
                var width=null;
                var height=null;
                switch (linkText) {
                    case "老祖宗":
                        tipContent = "异常的老祖宗";
                        element = "div";
                        width=100;
                        height=30;
                        break;
                    case "程序":
                        //附加class，css并不能应用
                        tipContent = "<img class='sourcePic'src='../source/img/source.jpg' style='width: 200px; height: 300px; margin: 0 0'>";
                        element = "div";
                        width=200;
                        break;
                    case "程序":
                        tipContent = "程序是代码组成的";
                        element = "div";
                        break;
                    case "数据库":
                        tipContent = "数据库：Mysql\oracle";
                        tipContent="<iframe src='http://www.baidu.com' style='width: 500px; height: 500px;'>";
                        element = "div";
                        break;
                }
                showTip(currA, "tip", element, tipContent, width,height);
        };
        a.onmouseout = function () {
            var currA=this;
            setTimeout(function () {
                var tip = document.getElementById("tip");
                if (tip != null) {
                    currA.removeChild(tip);
                }
            },1000);
        }
    }

};

function showTip(parent, id, element, content, width, height) {
    var tip = document.getElementById(id);
    if (tip == null) {
        tip = document.createElement(element);
        //共同的属性
        //个性化内容
        tip.innerHTML = content;
        commonTip(parent, tip, id, width, height);
    }
}

function commonTip(parent, tip, id, width, height) {
    tip.id = id;//设置id
    tip.className = tipClassName;
    tip.style.width = width ? width + 30 + "px" : "auto";//宽度和高度，如没有定义则自适应
    var tipHeight = height ? height : 30;
    tip.style.height = tipHeight == 30 ? "auto" : tipHeight + "px";

    var pTop = parent.offsetTop;//获取parent的top-left,position()是jquery的
    var pLeft = parent.offsetLeft;
    var tTop = pTop - tipHeight - 5;//计算提示框的top-left，不能遮住parent
    var tLeft = pLeft;
    tip.style.top = tTop + "px";//必须加px，不然没效果
    tip.style.left = tLeft + "px";

    parent.appendChild(tip);//添加到parent
}