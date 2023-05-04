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
    document.getElementById("leaveMessageImg").hidden = true
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
    document.getElementById("leaveMessageImg").removeAttribute("hidden")
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

//显示隐藏列表
function hiddenUl(e){
    let parentNode = e.target.parentNode;
    let nextSibling = parentNode.nextSibling.nextSibling;
    let classname = parentNode.className;
    if(classname === "firstLi"){
        let tar = parentNode.getElementsByClassName("secondUL")[0];
        let childNodesNum = (tar.childNodes.length-1)/2;
        if(tar.getAttribute("hidden") == null){
            tar.hidden = true;
            nextSibling.style.marginTop = "0px";
        }else{
            tar.removeAttribute("hidden");
            nextSibling.style.marginTop = childNodesNum * 30 + "px";
        }
        tar.setAttribute("timestamp",Date.now());
        let tarsChildrenNodes = tar.getElementsByClassName("secondLi");
        for(let i = 0;i < tarsChildrenNodes.length;i++){
            tarsChildrenNodes[i].style.marginTop = "0px";
            let childrenChildrenNode = tarsChildrenNodes[i].getElementsByClassName("thirdUL")[0];
            childrenChildrenNode.hidden = true;
        }
    }
    if(classname === "secondLi"){
        let nextSibling1 = parentNode.parentNode.parentNode.nextSibling;
        if(nextSibling1 != null){
            nextSibling1 = nextSibling1.nextSibling;
        }

        let tar = parentNode.getElementsByClassName("thirdUL")[0];

        let currentTime = Date.now();
        let timestamp = tar.getAttribute("timestamp");
        if(timestamp == null || currentTime - timestamp > 500){
            let childNodesNum = (tar.childNodes.length-1)/2;

            console.log(tar);
            console.log(childNodesNum);
            if(tar.getAttribute("hidden") == null){
                tar.hidden = true;
                if(nextSibling != null){
                    nextSibling.style.marginTop = "0px";
                }
                if(nextSibling1 != null){
                    let marginTop = nextSibling1.style.marginTop;
                    nextSibling1.style.marginTop = parseInt(marginTop.replace("px","")) - childNodesNum * 30 + "px";
                }
            }else{
                tar.removeAttribute("hidden");
                console.log(childNodesNum);
                if(nextSibling != null){
                    nextSibling.style.marginTop = childNodesNum * 30 + "px";
                }
                if(nextSibling1 != null){
                    let marginTop = nextSibling1.style.marginTop;
                    nextSibling1.style.marginTop = parseInt(marginTop.replace("px","")) + childNodesNum * 30 + "px";
                }
            }
        }
        tar.setAttribute("timestamp",Date.now());
    }

}

