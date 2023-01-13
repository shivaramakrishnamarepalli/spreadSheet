function createGrid(n) {
    let m = 20;// number of columns declared in grid container of css 
    let container = document.createElement('div');
    container.classList.add('grid-container');
    container.style.width=`${156*m}px`;
    container.style.height=`${n*30}px`;
    container.style.backgroundColor="rgb(135, 190, 237)";

    for (let i = 1; i <= m*n; i++) {
        let grid;
        if(i%m==1)
        {
            grid = document.createElement('div');
            grid.style.width="30px";
            grid.textContent=`${Math.ceil(i/m)-1}`
        }
        else {
            if(i<=m)
            {
                grid = document.createElement('div');
                grid.textContent=`${Math.ceil(i%m)-1}`
            }
            else {
                grid = document.createElement('input');
            }
            grid.style.width="150px";
        }
        if(i==1)
        {
            grid.textContent=""
        }
        grid.type = 'text'
        grid.classList.add("grid-item")  
        container.appendChild(grid);
        grid.setAttribute("row", Math.ceil(i/m)-1);
        grid.setAttribute("colomn",(i%m)-1);

    }

    document.body.appendChild(container);
}


createGrid(200);//creating a grid with 200 rows
