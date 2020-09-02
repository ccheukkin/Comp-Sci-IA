$(document).ready(function(){
    setupFilterT();
})

var listT = ["IO", "OS"]

var prevColorT = null;
var prevTextT = null;
var prevFilterT = null;

function filterOnT(color){
    if (prevColorT!=color){
        $(color).css("width", "100%");
    }
}

function filterOffT(color){
    if (prevColorT!=color){
        $(color).css("width", "0%");
    }
}

function filterSelectT(color, text, filter){
    if (prevColorT!=null & prevTextT!=null & prevFilterT!=null){
        $(prevColorT).css("height", "5px");
        $(prevColorT).css("width", "0px");
        $(prevTextT).css("color", "black");
        $(prevFilterT).css("cursor", "pointer");
    }
    prevColorT = color;
    $(color).css("height", "100%");
    prevTextT = text;
    $(text).css("color", "white");
    prevFilterT = filter;
    $(filter).css("cursor", "auto");
}

function setupFilterT(){
    for (let i=0; i<listT.length; i++){
        let filterName = listT[i];
        let filter = "#filter"+filterName;
        let color = "#color"+filterName
        $(filter).hover(function(){
            filterOnT(color);
        }, function(){
            filterOffT(color);
        });
        $(filter).click(function(){
            filterSelectT(color, "#text"+filterName, filter);
        });
    }
}