// t is current array
    var t;
    // time is timerID
    var time;
    // pop is current population
    var pop = 0;
    // gen is current generation
    var gen = 0;
    //popm string for population and generation
    var popm = "Population: " + pop + "; Generation: " + gen;
function createTable() {
    // rl is row length, cl is column length
    var rl = document.forms.game.row.value;
    var cl = document.forms.game.col.value;
    pop = 0;
    gen = 0;
    document.getElementById("container").innerHTML = "";
    // t is current array
    t = new Array(rl);
    for (var i = 0; i < rl; i++) {
        t[i] = new Array(cl);
    }
    for (var i = 0; i < rl; i++) {
        for (var j = 0; j < cl; j++) {
            t[i][j] = Math.floor(Math.random() * 2);
        }
    }
    var table = document.createElement('table');
    var baseRow = document.createElement('tr');
    var baseCell = document.createElement('td');
    baseCell.className = "squarecell";
    var container = document.getElementById('container');

    for (var i = 0; i < rl; i++) {
        //Create a new row
        var myRow = baseRow.cloneNode(false);
        for (var j = 0; j < cl; j++) {
            //Create a new cell, you could loop this for multiple cells
            var myCell = baseCell.cloneNode(false);
            myCell.innerHTML = t[i][j];
//            myCell.style.width="2px";
//            myCell.style.height="2px";
            //Append new cell
            myRow.appendChild(myCell);
            if (t[i][j] == 1){
                myCell.style.backgroundColor = "black";
                pop++;
            }
            else {
                myCell.style.backgroundColor = "white";
                myCell.style.color = "white";
            }


        }
        //Append new row
        table.appendChild(myRow);
    }
    gen++;
    container.appendChild(table);
    popm = "Population: " + pop + "; Generation: " + gen;
    document.forms.game.lives.value = popm;
}
function start() {
    if(time) return;
    time = setInterval(next, 1000);
    next();
}
function stop(){
    clearInterval(time);
    time=null;
}
function reset() {
    createTable();
    gen = 0;
}
function next(){

    var rl = document.forms.game.row.value;
    var cl = document.forms.game.col.value;
    pop = 0;
    gen++;
    document.getElementById("container").innerHTML = "";
    var alive_count;
    var n = new Array(rl);
    for (var i = 0; i < rl; i++) {
        n[i] = new Array(cl);
    }
    for (var i = 0; i < rl; i++) {
        for (var j = 0; j < cl; j++) {
            n[i][j] = 0;
        }
    }
    for(var i = 0; i < rl; i++){
        for(var j = 0; j < cl; j++){
            alive_count = 0;
            // left top alive
            if(i-1 >= 0 && j - 1>=0)
                if(t[i-1][j-1] == 1) alive_count++;
            // top alive
            if(i - 1 >= 0)
                if(t[i-1][j] == 1) alive_count++;
            // right top alive

            if(i-1 >= 0 && j + 1 <= (cl-1))
                if(t[i-1][j+1] == 1) alive_count++;
            // left alive
            if(j-1>=0)
                if(t[i][j-1]==1) alive_count++;
            // right alive
             if(j+1<=(cl-1))
                if(t[i][j+1]==1) alive_count++;
            // bottom left alive
            if(i+1 <= (rl-1) && j - 1>=0)
                if(t[i+1][j-1] == 1) alive_count++;
            // bottom alive
            if(i + 1 <= (rl-1))
                if(t[i+1][j] == 1) alive_count++;
            // bottom right alive
            if(i+1 <= (rl-1) && j + 1<=(cl-1))
                if(t[i+1][j+1] == 1) alive_count++;
            // set up new array
            if(t[i][j] == 1 && (alive_count < 2 || alive_count > 3))
                n[i][j] = 0;
            else if(t[i][j] == 1 && (alive_count >= 2 || alive_count <= 3))
                n[i][j] = 1;
            else if(t[i][j] == 0 && alive_count == 3)
                n[i][j] = 1;
            else
                n[i][j] = t[i][j];
            
        }
        
    }
    
    var table = document.createElement('table');
    var baseRow = document.createElement('tr');
    var baseCell = document.createElement('td');
    baseCell.className = "squarecell";
    var container = document.getElementById('container');

    for (var i = 0; i < rl; i++) {
        //Create a new row
        var myRow = baseRow.cloneNode(false);
        for (var j = 0; j < cl; j++) {
            //Create a new cell, you could loop this for multiple cells
            var myCell = baseCell.cloneNode(false);
            myCell.innerHTML = n[i][j];

            //Append new cell
            myRow.appendChild(myCell);
            if (n[i][j] == 1){
                myCell.style.backgroundColor = "black";
                pop++;
            }
            else {
                myCell.style.backgroundColor = "white";
                myCell.style.color = "white";
            }


        }
        //Append new row
        table.appendChild(myRow);
    }

    container.appendChild(table);
    for (var i = 0; i < rl; i++) {
        for (var j = 0; j < cl; j++) {
            t[i][j] = n[i][j];
        }
    }
    popm = "Population: " + pop + "; Generation: " + gen;
    document.forms.game.lives.value = popm;
}
function change(){

}