const container = document.querySelector('.container');
const drawButtons = document.querySelectorAll('.draw-button-container button');

let color = '#000000';
let colorPicker = document.querySelector('#input-color');
let rainbowMode = false;
let eraserMode = false;
let drawMode = true;

function createGrid() {

    let gridSize = document.querySelector('#grid-size').value;

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
    
    for (let i = 0; i < allSquares.length; i++) {
        // split width evenly for all squares
        allSquares[i].style.width = (100/gridSize) + "%";
        // below code gets the full decimal value
        // clientWidth will round the decimal value so it is not used
        let num = window.getComputedStyle(allSquares[i]).width;
        allSquares[i].style.height = parseFloat(num) + "px";

        allSquares[i].style.backgroundColor = "white";

        // add listeners so that when a div is pressed down or dragged over
        // the background color changes to the color of the color picker
        allSquares[i].addEventListener('mousedown', addMouseDown);
        allSquares[i].addEventListener('mouseover', addMouseOver);
    }

}

function removeExistingGrid() {
    let allSquares = document.querySelectorAll('.square');
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].remove();
    }
}

function clearCanvas() {
    let allSquares = document.querySelectorAll('.square');
    
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].style.backgroundColor = "white";
    }
}

function changeColor(colorToChange) {
    let allSquares = document.querySelectorAll('.square');
    color = colorToChange;
}

function changeToDraw() {
    drawMode = true;
    eraserMode = false;
    rainbowMode = false;
}

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

// generate random rgb in hex value
function randomRGB() {
    const letters = '01234567890ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColorToRandom() {
    const randomColor = randomRGB();
    changeColor(randomColor);
    colorPicker.value = randomColor;
}

function changeColorToRainbow() {
    rainbowMode = true;
    drawMode = false;
    eraserMode = false;
}

function changeToEraser() {
    drawMode = false;
    rainbowMode = false;
    eraserMode = true;
}

function addMouseDown(e) {
    const square = e.target;
    if (drawMode) {
        square.style.backgroundColor = color;
    } else if (rainbowMode) {
        square.style.backgroundColor = randomRGB();
    } else if (eraserMode) {
        square.style.backgroundColor = "white";
    }
    // disable dragging an element
    e.preventDefault();
}

function addMouseOver(e) {
    const square = e.target;
    
    // only change color if user is left clicking while dragging
    if (e.buttons === 1) {
        if (drawMode) {
            square.style.backgroundColor = color;
        } else if (rainbowMode) {
            square.style.backgroundColor = randomRGB();
        } else if (eraserMode) {
            square.style.backgroundColor = "white";
        }
    }
}

createGrid();

// set draw button to be active when page is first loaded
activateDrawButton(document.querySelector('#draw-button'));