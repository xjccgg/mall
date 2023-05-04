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
    window.location.hash='#aboutUs';
}

function showContact(){
    showContent();
    window.location.hash='#contactUs';
}

let firstLoad = 0;


function refreshProductList(configType) {
    $('#product-list').load("http://127.0.0.1:28089/goods/productList?" + "configType=" + configType);
}

function refreshContentProductList(configType) {
    $('#content-product-list').load("http://127.0.0.1:28089/goods/contentProductList?" + "configType=" + configType);
}

document.addEventListener("DOMContentLoaded",function(){
    var query = window.location.search.substring(1);
    var pair = query.split("=");
    console.log(query)
    console.log(pair)
    if(pair[1] === "2"){
        showProduct();
    }else{
        showContent();
    }
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

// window.onload = function (){
//
// }

