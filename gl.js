// t is current array
    var t;
    // time is timerID
    var time;
    // pop is current population
    var pop = 0;
    // gen is current generation
    var gen = 0;
    //popm string for population and generation
    var popm = "Population: " + pop + " Generation: " + gen;
function createTable() {
    // rl is row length, cl is column length
    var rl = document.forms.game.row.value;
    var cl = document.forms.game.col.value;
    // reset the population and generation
    pop = 0;
    gen = 0;
    // clear the form
    document.getElementById("container").innerHTML = "";
    // t is current array with random values of 1 and 0
    t = new Array(rl);
    for (var i = 0; i < rl; i++) {
        t[i] = new Array(cl);
    }
    for (var i = 0; i < rl; i++) {
        for (var j = 0; j < cl; j++) {
            t[i][j] = Math.floor(Math.random() * 2);
        }
    }
    //create html labels
    var table = document.createElement('table');
    table.style.border = "2px solid black";
    table.style.bgcolor="grey";
    var baseRow = document.createElement('tr');
    var baseCell = document.createElement('td');

    //change the size of the cells based on squarecell class in css
    baseCell.className = "squarecell";
    baseRow.className="squarecell";
    table.className="mytable";
    // container is the form
    var container = document.getElementById('container');
    // iterate through current array
    for (var i = 0; i < rl; i++) {
        //Create a new row
        var myRow = baseRow.cloneNode(false);
        for (var j = 0; j < cl; j++) {
            //Create a new cell, you could loop this for multiple cells
            var myCell = baseCell.cloneNode(false);
            //set the value of the cell to be the value of the array
            myCell.innerHTML = t[i][j];
            //add click event
            myCell.setAttribute("onclick", "toggleCellDeadOrAlive(this,"+i+","+j+")");
            //Append new cell
            myRow.appendChild(myCell);
            // if cell value is 1, background is black, else white
            if (t[i][j] == 1){
                myCell.style.backgroundColor = "blue";
                myCell.style.color="blue";
                pop++;
            }
            else {
                myCell.style.backgroundColor = "grey";
                myCell.style.color = "grey";
            }


        }
        //Append new row
        table.appendChild(myRow);
    }
    // update the generation
    gen++;
    // update the form to draw the table
    container.appendChild(table);

    // change the text in the label
    popm = "Population: " + pop + " Generation: " + gen;
    document.getElementById("lives").innerHTML = popm; 

}
// start the increment automatically by calling next() constantly
function start() {
    if(time) return;
    time = setInterval(next, 2000);
    next();
}
// stop the increments
function stop(){
    clearInterval(time);
    time=null;
}
// calls the first function and reset the generation
function reset() {
    createTable();
    gen = 0;
}
function next23(){
    // increment the generation forward 23
    gen += 23;
    // rl is row length user typed in text box
    var rl = document.forms.game.row.value;
    // cl is column length user typed in text box
    var cl = document.forms.game.col.value;
    // reset population to be zero
    pop = 0;
    // clear the form
    document.getElementById("container").innerHTML = "";
    // alive_count is for number of alive cells
    var alive_count;
    for (var y = 0; y < 23; y++) {
        //create new temp array
        var n = new Array(rl);
        for (var i = 0; i < rl; i++) {
            n[i] = new Array(cl);
        }
        for (var i = 0; i < rl; i++) {
            for (var j = 0; j < cl; j++) {
                n[i][j] = 0;
            }
        }
        //determine the contents of new array
        for (var i = 0; i < rl; i++) {
            for (var j = 0; j < cl; j++) {
                alive_count = 0;
                // left top alive
                if (i - 1 >= 0 && j - 1 >= 0)
                    if (t[i - 1][j - 1] == 1)
                        alive_count++;
                // top alive
                if (i - 1 >= 0)
                    if (t[i - 1][j] == 1)
                        alive_count++;
                // right top alive

                if (i - 1 >= 0 && j + 1 <= (cl - 1))
                    if (t[i - 1][j + 1] == 1)
                        alive_count++;
                // left alive
                if (j - 1 >= 0)
                    if (t[i][j - 1] == 1)
                        alive_count++;
                // right alive
                if (j + 1 <= (cl - 1))
                    if (t[i][j + 1] == 1)
                        alive_count++;
                // bottom left alive
                if (i + 1 <= (rl - 1) && j - 1 >= 0)
                    if (t[i + 1][j - 1] == 1)
                        alive_count++;
                // bottom alive
                if (i + 1 <= (rl - 1))
                    if (t[i + 1][j] == 1)
                        alive_count++;
                // bottom right alive
                if (i + 1 <= (rl - 1) && j + 1 <= (cl - 1))
                    if (t[i + 1][j + 1] == 1)
                        alive_count++;
                // set up new array
                if (t[i][j] == 1 && (alive_count < 2 || alive_count > 3))
                    n[i][j] = 0;
                else if (t[i][j] == 1 && (alive_count >= 2 || alive_count <= 3))
                    n[i][j] = 1;
                else if (t[i][j] == 0 && alive_count == 3)
                    n[i][j] = 1;
                else
                    n[i][j] = t[i][j];

            }

        }
        // update the current array with the new array
        for (var i = 0; i < rl; i++) {
            for (var j = 0; j < cl; j++) {
                t[i][j] = n[i][j];
            }
        }
    }
    //create html labels
    var table = document.createElement('table');
    table.style.border = "2px solid black";
    table.style.bgcolor="grey";
    var baseRow = document.createElement('tr');
    var baseCell = document.createElement('td');
    //change the size of the cells based on squarecell class in css
    baseCell.className = "squarecell";
    table.className="mytable";
    //container is the form
    var container = document.getElementById('container');
    //iterate through the new array 
    for (var i = 0; i < rl; i++) {
        //Create a new row
        var myRow = baseRow.cloneNode(false);
        for (var j = 0; j < cl; j++) {
            //Create a new cell, you could loop this for multiple cells
            var myCell = baseCell.cloneNode(false);
            myCell.innerHTML = t[i][j];
            

            //Append new cell
            myRow.appendChild(myCell);
            // if cell value is 1, background is black, else white
            if (t[i][j] == 1){
                myCell.style.backgroundColor = "blue";
                myCell.style.color="blue";
                pop++;
            }
            else {
                myCell.style.backgroundColor = "grey";
                myCell.style.color = "grey";
            }
        }
        //Append new row
        table.appendChild(myRow);
    }
    // update the form to draw the table
    container.appendChild(table);
    // change the text in the label
    popm = "Population: " + pop + " Generation: " + gen;
    document.getElementById("lives").innerHTML = popm; 
}
function next(){
    // rl is row length user typed in text box
    var rl = document.forms.game.row.value;
    // cl is column length user typed in text box
    var cl = document.forms.game.col.value;
    // reset population to be zero
    pop = 0;
    // update generation
    gen++;
    // clear the form
    document.getElementById("container").innerHTML = "";
    // alive_count is for number of alive cells
    var alive_count;
    //initialize new array
    var n = new Array(rl);
    for (var i = 0; i < rl; i++) {
        n[i] = new Array(cl);
    }
    for (var i = 0; i < rl; i++) {
        for (var j = 0; j < cl; j++) {
            n[i][j] = 0;
        }
    }
    //determine the contents of new array
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
    //create html labels
    var table = document.createElement('table');
    table.style.border = "2px solid black";
    table.style.bgcolor="grey";
    var baseRow = document.createElement('tr');
    var baseCell = document.createElement('td');
    //change the size of the cells based on squarecell class in css
    baseCell.className = "squarecell";
    table.className="mytable";
    //container is the form
    var container = document.getElementById('container');
    //iterate through the new array 
    for (var i = 0; i < rl; i++) {
        //Create a new row
        var myRow = baseRow.cloneNode(false);
        for (var j = 0; j < cl; j++) {
            //Create a new cell, you could loop this for multiple cells
            var myCell = baseCell.cloneNode(false);
            myCell.innerHTML = n[i][j];
            

            //Append new cell
            myRow.appendChild(myCell);
            // if cell value is 1, background is black, else white
            if (n[i][j] == 1){
                myCell.style.backgroundColor = "blue";
                myCell.style.color="blue";
                pop++;
            }
            else {
                myCell.style.backgroundColor = "grey";
                myCell.style.color = "grey";
            }


        }
        //Append new row
        table.appendChild(myRow);
    }
    // update the form to draw the table
    container.appendChild(table);
    // update the current array with the new array
    for (var i = 0; i < rl; i++) {
        for (var j = 0; j < cl; j++) {
            t[i][j] = n[i][j];
        }
    }
    // change the text in the label
    popm = "Population: " + pop + " Generation: " + gen;
    document.getElementById("lives").innerHTML = popm; 
}
// this is for mouse clicks
function toggleCellDeadOrAlive(td, x, y) {
    var cellvalue = t[x][ y];
    if (cellvalue == 1) {
        t[x][y] = 0; /*t is global state array */
        td.style.backgroundColor = "grey";
        td.style.color = "grey";
    }
    else {
        t[x][y] = 1;
        td.style.backgroundColor = "blue";
        td.style.color = "blue";
    }
}