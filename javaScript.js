function createGrid(n) {
    let container = document.createElement('div');
    container.classList.add('grid-container');
    for (let i = 0; i < 10*n; i++) {
        let grid = document.createElement('input');
        grid.type = 'text'
        grid.classList.add("grid-item")   
        container.appendChild(grid);
        grid.setAttribute("row", Math.ceil(i/10));
        grid.setAttribute("colomn",i%10);
    }
    document.body.appendChild(container);
}
createGrid(20);
