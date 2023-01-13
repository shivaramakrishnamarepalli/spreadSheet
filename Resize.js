/* ...............incomplete code ............*/
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
