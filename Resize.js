/* ...............incomplete code 
container.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("grid-item")) {
    //finding the cell object which matches event.target
    const cellTarget = cells.find((a) => a.getId() == e.target.id);
    console.log(cellTarget);
    let initialWidth = cellTarget.getWidth();
    let initialX = e.clientX;

    let mouseMoveHandler = function (e) {
      let widthDiff = e.clientX - initialX;

      cellTarget.setWidth(initialWidth + widthDiff + "px");
    };

    let mouseUpHandler = function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }
});

............*/

import { Cell } from "./Cell";

export function createDiv(height){
  var div = document.createElement('div');
  div.style.top = 0;
  div.style.right = 0;
  div.style.width = '3px';
  div.style.position = 'absolute';
  div.style.cursor = 'col-resize';
  /* remove backGroundColor later */
  div.style.backgroundColor = 'green';
  div.style.userSelect = 'none';
  /* table height */
  div.style.height = height+'px';
  return div;
} 



export function setListeners(div) {
  var pageX, curCol, curColWidth;
  div.addEventListener('mousedown', function(e) {
    curCol = e.target.parentElement;
    pageX = e.pageX;
    curColWidth = curCol.offsetWidth;
  });

  document.addEventListener('mousemove', function(e) {
    if (curCol) {
      var diffX = e.pageX - pageX;
      curCol.style.width = (curColWidth + diffX) + 'px';
    }
  });

  document.addEventListener('mouseup', function(e) {
    curCol = undefined;
    pageX = undefined;
    curColWidth = undefined;
  });

  document.addEventListener('mouseup', function (e) { 
    var finalWidth = "60px";
    
    //get the parent row
    //loop through the columns and set their width to the final width
    for (var i = 0; i < 27; i++) {
      columns[i].style.width = finalWidth + "px";
    }
    curCol = undefined;
    nxtCol = undefined;
    pageX = undefined;
    nxtColWidth = undefined;
    curColWidth = undefined;
    });  
}
