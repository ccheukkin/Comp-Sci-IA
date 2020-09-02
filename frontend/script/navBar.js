function navBarSwitch(color, active){
    let width = "100%"
    if (active) { width = "0%"; }
    $(color).css("width", width);
}

var prevScrollPos = window.pageYOffset;
var threshold = 80;
function navBarScroll(){
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos < currentScrollPos & currentScrollPos > threshold) {
        $("#navBar").css("top", "-80px");
        $("#login").css("top", "-80px");
    }else{
        $("#navBar").css("top", "0px");
        $("#login").css("top", "20px");
    }
    prevScrollPos = window.pageYOffset;
}