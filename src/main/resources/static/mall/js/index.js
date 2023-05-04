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

function showIntroduction(){
    showContent();
    // setTimeout("test()","1000")
    window.location.hash='#aboutUs';
    // document.getElementById('#aboutUs' ).scrollIntoView(true);
}

function showContact(){
    showContent();
    // setTimeout("test()","1000")
    window.location.hash='#contactUs';
    // document.getElementById('#contactUs' ).scrollIntoView(true);
}

let firstLoad = 0;

function refreshProductList(configType) {
    $('#product-list').load("http://127.0.0.1:28089/goods/productList?" + "configType=" + configType);
}

function refreshContentProductList(configType) {
    $('#content-product-list').load("http://127.0.0.1:28089/goods/contentProductList?" + "configType=" + configType);
}

document.addEventListener("DOMContentLoaded",function(){
    showContent();
},false);

//悬浮窗控制显隐
function openDialog(){
    document.getElementById('light').style.display='block';
}
function closeDialog(){
    document.getElementById('light').style.display='none';
}

//保存留言
function saveMessage(){
    var message = $("#message").val();
    var contactInformation = $("#contactInformation").val();
    var data = {
        "message": message,
        "contactInformation": contactInformation,
    };
    var url = '/tbMessage/set';

    $.ajax({
        type: 'POST',//方法类型
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode == 200) {
                Swal.fire({
                    text: "success",
                    icon: "success",iconColor:"#1d953f",
                });
                reload();
            } else {
                Swal.fire({
                    text: result.message,
                    icon: "error",iconColor:"#f05b72",
                });
            };
        },
        error: function () {
            Swal.fire({
                text: "error",
                icon: "error",iconColor:"#f05b72",
            });
        }
    });

    $('#message').val('');
    $('#contactInformation').val('');

    closeDialog();
}

