/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function createTable() {
    document.getElementById("container").innerHTML = "";
    var t = new Array(10);
    for (var i = 0; i < 10; i++) {
        t[i] = new Array(10);
    }
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            t[i][j] = Math.floor(Math.random() * 2);
        }
    }
    var table = document.createElement('table');
    var baseRow = document.createElement('tr');
    var baseCell = document.createElement('td');
    var container = document.getElementById('container');

    for (var i = 0; i < 10; i++) {
        //Create a new row
        var myRow = baseRow.cloneNode(false);
        for (var j = 0; j < 10; j++) {
            //Create a new cell, you could loop this for multiple cells
            var myCell = baseCell.cloneNode(false);
            myCell.innerHTML = t[i][j];
//            myCell.style.width="2px";
//            myCell.style.height="2px";
            //Append new cell
            myRow.appendChild(myCell);
            if (t[i][j] == 1)
                myCell.style.backgroundColor = "black";
            else {
                myCell.style.backgroundColor = "white";
                myCell.style.color = "white";
            }


        }
        //Append new row
        table.appendChild(myRow);
    }

    container.appendChild(table);
    var tds = document.getElementsByTagName('td');

    for (var i = 0; i < tds.length; i++)
        tds[i].style.width = '2px';

}
function clear() {
    document.getElementById("container").innerHTML = "";
}
function randomize() {
    createTable();
}
