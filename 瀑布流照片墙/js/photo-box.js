/**
 * Created by HJP on 2016/10/1.
 */

var firstPhotoW;
var deviceW;
var bestPhotoNumInRow;
var photos;
var heightInColumns;
var indexMinHeightInColumns;

var minHeightInColumns;
var minHeightBottomPhoto;
var minHeightBottomPhotoLeft;
$(document).ready(function () {
    $(window).load(function () {
        measurePhotoShow();

        //模仿请求服务器，返回图片json
        var requestPhotoJson = {"newPhoto": [{"src": "../img/3.jpg"}, {"src": "../img/2.jpg"}]};

        window.onscroll = function () {//有bug
            if (scrollBottomAddPhoto()) {
                $.each(requestPhotoJson.newPhoto, function (index, value) {
                    var photoBox = $("<div>").addClass("photo-box").appendTo($("#container"));
                    var content = $("<div>").addClass("content").appendTo(photoBox);
                    $("<img>").attr("src", $(value).attr("src")).appendTo(content);
                });
                measurePhotoShow();
            }
        }
    });
});

function measurePhotoShow() {
    //获得图片组
    photos = $(".photo-box");
    //获取第一个图片的宽度和设备宽度
    firstPhotoW = photos.eq(0).width();
    deviceW = $(window).width();
    //设备宽度 除以 图片宽度，算出一行显示图片的最大个数
    bestPhotoNumInRow = Math.floor(deviceW / firstPhotoW);//将小数转为整数
    //遍历图片组，对第一行的图片进行处理，将他们的高度都存到数组中，再提取出它们的最小高度
    heightInColumns = [];
    var marginTop = parseInt(photos.eq(0).css("margin-top").replace("px", ""));//将"5"转为整数，这是js提供的方法
    var contentPadding = parseInt($(".content").css("padding-top").replace("px", "") * 2);//"16",不转换会拼接成字符串"516"

    photos.each(function (index, photo) {
        if (index < bestPhotoNumInRow) {//第一行
            heightInColumns[index] = $(photo).height() + marginTop + contentPadding;
        } else {//其他行
            minHeightInColumns = Math.min.apply(null, heightInColumns);//每列的最小高度
            //根据这个最小高度，在数组中拿到index,再从图片组中获取这张图片
            indexMinHeightInColumns = $.inArray(minHeightInColumns, heightInColumns);
            //根据这张图片的height和left，将第二行的第一张图片的left设为前面left，以及top设为前面的height
            minHeightBottomPhoto = photos.eq(indexMinHeightInColumns);
            minHeightBottomPhotoLeft = minHeightBottomPhoto.position().left;
            //为当前图片添加left和top
            $(photo).css({
                position: "absolute",
                left: minHeightBottomPhotoLeft,
                top: minHeightInColumns + marginTop
            });
            //注意：是将index对应的新图片的高度加到indexMinHeightInColumns对应的最小高度上，而不是加到新的index上
            //不然之后的最小高度都是第一行的最小高度，造成了之后的新图片都堆在一起
            heightInColumns[indexMinHeightInColumns] += $(photo).height() + marginTop + contentPadding;
        }
    });
}

function scrollBottomAddPhoto() {

    var photos = $(".photo-box");

    var lastBoxTop = photos.last().get(0).offsetTop + Math.floor(photos.last().height() / 2);
    //var documentH = $(document).height();//当前网页的高度
    var documentH = document.documentElement.clientHeight;//当前网页的高度
    var scrollTop = $(window).scrollTop();//鼠标滚动的高度;

    return lastBoxTop<(documentH+scrollTop) ? true : false;
}