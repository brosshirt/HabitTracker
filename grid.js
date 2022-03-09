var list = [true, false, true, false, true, null, true];

function loadPage(){
    var squares = document.getElementsByClassName("square");
    var counter = 0;
    for (i = 0; i<list.length; i++){
        if (list[i] === true){
            squares[i].innerHTML = "✓";
            squares[i].style =  "color:#048526";
        }
        else if (list[i] === false){
            squares[i].innerHTML = "✕";
            squares[i].style = "color:#e30707";
        }
    }
}
