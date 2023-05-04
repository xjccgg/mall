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