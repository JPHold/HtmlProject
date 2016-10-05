/**
 * Created by HJP on 2016/9/23.
 */

function $(id) {
    return typeof  id == "string" ? document.getElementById(id) : id;
}

window.onload = function () {
    var titleNames = $("tab-title-list").getElementsByTagName("li");

    var tabContents = $("tab-content").getElementsByTagName("div");

    //如果标签和标签的数目不对等,则不能进行标签切换
    if (titleNames.length != tabContents.length) {
        return;
    }

    for (var i = 0; i < titleNames.length; i++) {
        titleNames[i].id = i;//将position设为id
        //为标题添加鼠标停留监听
        titleNames[i].onmousemove = function () {
            //将其他标题设为不是当前select
            for (var j = 0; j < titleNames.length; j++) {
                titleNames[j].className = "";
                //标签内容切换，当前的标题内容的display设为block，其他的标签内容的display设为none
                tabContents[j].style.display="none";
            }
            this.className = "select";
            tabContents[this.id].style.display="block";
            tabContents[this.id].style.float="left";
        }
    }
}