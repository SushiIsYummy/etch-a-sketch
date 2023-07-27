const container = document.querySelector('.container');
// let size = prompt('Please enter a number for grid size (min 1, max 100):');

function createGrid() {

    let gridSize = document.querySelector('#grid-size').value;
    // console.log(gridSize);

    // while (!(gridSize >= 1 && gridSize <= 100)) {
    //     gridSize = prompt('Invalid number! Please enter a number for grid size (min 1, max 100):');
    // }

    removeExistingGrid();

    for (let i = 1; i <= gridSize; i++) {
        let row = document.createElement('div');
        row.id = 'row' + i;
        row.classList.add('row');
        for (let j = 1; j <= gridSize; j++) {
            let square = document.createElement('div');
            square.classList.add('row' + i);
            square.classList.add('column' + j);
            square.classList.add('square');
            row.appendChild(square);
        }

        container.appendChild(row);
    }
    
    let allSquares = document.querySelectorAll('.square');
    let containerWidth = document.querySelector('.container').clientWidth;
    console.log(containerWidth);
    
    
    for (let i = 0; i < allSquares.length; i++) {
        // split width evenly for all squares
        allSquares[i].style.width = (100/gridSize) + "%";
        // below code gets the full decimal value
        // clientWidth will round the decimal value so it is not used
        let num = window.getComputedStyle(allSquares[i]).width;
        allSquares[i].style.height = parseFloat(num) + "px";
    }

    let inputColor = document.querySelector('#input-color').value;
    changeColor(inputColor);
}

function removeExistingGrid() {
    let allSquares = document.querySelectorAll('.square');
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].remove();
    }
}

// code used from https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
function randomRGB() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string
    return rgb;
}

function clearCanvas() {
    let allSquares = document.querySelectorAll('.square');
    
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].style.backgroundColor = "";
    }
}

// POSSIBLE FEATURE
// Have an option where user can select recently used colors
let previousColor = 'black';

function changeColor(color) {
    let allSquares = document.querySelectorAll('.square');

    allSquares[0].removeEventListener('mousedown', addMouseDownWrapper);
    
    // get current input color
    let inputColor = document.querySelector('#input-color').value;
    color = inputColor;
    previousColor = color;

    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].addEventListener('mousedown', addMouseDownWrapper);
        allSquares[i].addEventListener('mouseover', addMouseOverWrapper);
    }
    
    function addMouseDown(e, color) {
        const square = e.target;
        square.style.backgroundColor = color;
        // disable dragging an element
        e.preventDefault();
    }

    function addMouseOver(e, color) {
        const square = e.target;
        
        // only change color if user is left clicking while dragging
        if (e.which === 1) {
            square.style.backgroundColor = color;
        }
    }

    function addMouseDownWrapper(e) {
        addMouseDown(e, color);
    }

    function addMouseOverWrapper(e) {
        addMouseOver(e, color);
    }
}

const drawButtons = document.querySelectorAll('.draw-button');

// only one button has the 'active' class
function activateDrawButton(button) {
    drawButtons.forEach((btn) => {
        btn.classList.remove('active');
    })
    button.classList.add('active');
}

// add listener so that when a button is clicked, it is 'active' or in use
drawButtons.forEach((button) => {
    button.addEventListener('click', function() {
        activateDrawButton(this);
    })
})

function changeColorToRandom() {
    console.log('hi');
}

createGrid();
// console.log(container);