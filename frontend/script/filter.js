$(document).ready(function(){
    setupFilterY();
    setupFilterT();
    filterSelectY("#colorAllY", "#textAllY", "#filterAllY");
    filterSelectT("#colorAllT", "#textAllT", "#filterAllT");
})

// year
var listY = ["AllY", "2019", "2020"]

var prevColorY = null;
var prevTextY = null;
var prevFilterY = null;

function filterOnY(color){
    if (prevColorY!=color){
        $(color).css("width", "100%");
    }
}

function filterOffY(color){
    if (prevColorY!=color){
        $(color).css("width", "0%");
    }
}

function filterSelectY(color, text, filter){
    if (prevColorY!=null & prevTextY!=null & prevFilterY!=null){
        $(prevColorY).css("height", "5px");
        $(prevColorY).css("width", "0px");
        $(prevTextY).css("color", "black");
        $(prevFilterY).css("cursor", "pointer");
    }
    prevColorY = color;
    $(color).css("height", "100%");
    prevTextY = text;
    $(text).css("color", "white");
    prevFilterY = filter;
    $(filter).css("cursor", "auto");
}

function setupFilterY(){
    for (let i=0; i<listY.length; i++){
        let filterName = listY[i];
        let filter = "#filter"+filterName;
        let color = "#color"+filterName
        $(filter).hover(function(){
            filterOnY(color);
        }, function(){
            filterOffY(color);
        });
        $(filter).click(function(){
            filterSelectY(color, "#text"+filterName, filter);
        });
    }
}

// topic
var listT = ["AllT", "IO", "OS"]

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