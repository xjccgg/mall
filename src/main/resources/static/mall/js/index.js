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
let firstLoad = 0;

function refreshProductList(configType) {
    $('#product-list').load("http://127.0.0.1:28089/goods/productList?" + "configType=" + configType);
    // $.ajax({
    //     url: "http://127.0.0.1:28089/goods/productList?" + "configType=" + configType,
    //     type: "get",
    //     success: function (data) {
    //         $("#product-list").html(data);
    //     }
    // })
}

document.addEventListener("DOMContentLoaded",function(){
    showContent();
},false);