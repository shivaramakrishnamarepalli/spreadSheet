# spreadSheet

How to use -
User must press Enter key to enter some value in a cell (switch into editing mode)
User can't navigate using keys unless they leave editing mode by pressing enter again
the arrow keys will only work for the text inside the cell while it is in editing mode

- latest improved input functionality :-

  when a cell is highlited :-

        if it is focused:

            if user types formula it will automatically switch to "editing" mode and when user leaves the cell, the formula  will disappear and value will appear

            if user types normal text, normal text will be saved as value

        if it is not focused:

            user press enter to switch into editing mode and modify the existing formula or value

            user will type normal text and it will overwrite the previous value or formula

- formulas are supported now!

- negative numbers are also supported

- functions implemented : sum

-Currently working on:
Error handling for formula and more improvement

current works : (shiva)

--resizing the column

--will like to work on displaying the formula bar better
--giving an area near the formula to enter and choose a grid by typing its id

--neat finish(rough scroll after click)  
 --- will always try to solve this not getting any solution currently

mistakes to be rectified -

postponed works -

1. resizing the cell sizes with double click or like so
2. copying cell
3. when cell's formula is copied it is either Absolute or relative (use of '$' sign )

Specialities -
1)can navigate throughout the sheet with arrow keys
2)current row and column gets highlighted
