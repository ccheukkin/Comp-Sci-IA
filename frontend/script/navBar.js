function setupNavBar(){
    $("#homeButton").hover(function(){
        $("#homeColor").css("width", "100%");
    }, function(){
        $("#homeColor").css("width", "0%");
    })
    $("#questionsButton").hover(function(){
        $("#questionsColor").css("width", "100%");
    }, function(){
        $("#questionsColor").css("width", "0%");
    })
    $("#resultButton").hover(function(){
        $("#resultColor").css("width", "100%");
    }, function(){
        $("#resultColor").css("width", "0%");
    })
    $("#quizButton").hover(function(){
        $("#quizColor").css("width", "100%");
    }, function(){
        $("#quizColor").css("width", "0%");
    })
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