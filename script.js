const colorPicker = document.getElementById("color-picker");
const canvasColor = document.getElementById("canvas-color");
const canvas = document.getElementById("my-canvas");
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");
const fontPicker = document.getElementById("font-picker");
const retrieveButton = document.getElementById('retrieve-button');
const errorMessage = document.getElementById('error');
var isDrawing;
var lastX;
var lastY;
let canvasContents;

const ctx = canvas.getContext('2d');
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY
})
canvas.addEventListener('mousemove', (e) => {
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        
        lastX = e.offsetX;
        lastY = e.offsetY
    }
})
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    
})
canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 400);
})
fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
})
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
})
retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem(canvasContents);
    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
    }
    else{
        alert("No Image Saved");
        // const message = document.createElement('p');
        // message.textContent = 'No Image Saved';
        // message.style.color = 'red';
        // errorMessage.appendChild(message);
        // document.getElementById('error').innerHTML = 'No Image Found!'
        // errorMessage.textContent = "Please enter a valid number"
        //     errorMessage.style.color = "red"
    }
})