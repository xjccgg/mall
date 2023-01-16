var newbeeSwiper = new Swiper('.swiper-container', {
    //设置自动播放
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    //设置无限循环播放
    loop: true,
    //设置圆点指示器
    pagination: {
        el: '.swiper-pagination',
    },
    //设置上下页按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})

//控制显隐
function showProduct(){
    var content = document.getElementsByClassName('content');
    Array.prototype.forEach.call(content, function(el) {
        el.hidden = true;
    });
    var product = document.getElementsByClassName('product');
    Array.prototype.forEach.call(product, function(el) {
        el.hidden = false;
    });
}

function showContent(){
    var content = document.getElementsByClassName('content');
    Array.prototype.forEach.call(content, function(el) {
        el.hidden = false;
    });
    var product = document.getElementsByClassName('product');
    Array.prototype.forEach.call(product, function(el) {
        el.hidden = true;
    });
}
//
// $(document).ready(function () {
//     var menuYloc = $("#header").offset().top; //此ID为随着屏幕滚动div的ID
//     $(window).scroll(function () {
//         var offsetTop = menuYloc + $(window).scrollTop() + "px";
//         $("#header").animate({ top: offsetTop }, { duration: 600, queue: false }); //此ID为随着屏幕滚动div的ID
//     });
// });

// document.addEventListener("DOMContentLoaded",function(){
//     showContent();
// },false);