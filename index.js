const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let brushSize = 0;
let brushColor = "#000";
let isDrawing = false;
let isErasing = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("mousedown", () => {
    beginLine();
});

window.addEventListener("touchstart", () => {
    beginLine();
});

window.addEventListener("mouseup", () => {
    endLine();
});

window.addEventListener("touchend", () => {
    endLine();
});

window.addEventListener("mousemove", (event) => {
    if (!isDrawing) {
        return;
    }
    const { x, y } = event;
    ctx.lineTo(x, y);
    ctx.stroke();
});

window.addEventListener("touchmove", (event) => {
    if (!isDrawing) {
        return;
    }
    for (let i = 0; i < event.touches.length; i++) {
        const { clientX: x, clientY: y } = event.touches[i];
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});

function beginLine() {
    ctx.beginPath();
    ctx.lineWidth = brushSize;
    isDrawing = true;
}

function endLine() {
    ctx.closePath();
    isDrawing = false;
}


function increaseBrushSize() {
    updateBrushSizeBy(1);
}

function decreaseBrushSize() {
    updateBrushSizeBy(-1);
}

function onBrushColorChange(event) {
    updateBrushColor(event.target.value);
}

const eraserButton = document.querySelector("#eraser-button");

function toggleErase() {
    if (isErasing) {
        isErasing = false;
        restoreBrushColor();
        eraserButton.innerHTML = "Erase";
    } else {
        isErasing = true;
        setTemporaryBrushColor("#fff");
        eraserButton.innerHTML = "Draw";
    }
}

const brushPreview = document.querySelector(".toolbar__brush-preview");

function updateBrushSizeBy(diff) {
    updateBrushSizeTo(Math.max(1, brushSize + diff));
}

function updateBrushSizeTo(size) {
    brushSize = size;
    brushPreview.style.setProperty("--size", `${brushSize}px`);
}

function updateBrushColor(color) {
    brushColor = color;
    ctx.strokeStyle = brushColor;
    brushPreview.style.setProperty("--color", brushColor);
}

function setTemporaryBrushColor(color) {
    ctx.strokeStyle = color;
}

function restoreBrushColor() {
    ctx.strokeStyle = brushColor;
}

function init() {
    updateBrushSizeTo(3);
    updateBrushColor(brushColor);
}

init();
