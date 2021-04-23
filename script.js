var canvas = document.getElementById('paint');
var cContext = canvas.getContext('2d');
/***************************************************** */
var rectBtn = document.getElementById('rect');
var lineBtn = document.getElementById('line');
var circleBtn = document.getElementById('circle');
var freeHandBtn = document.getElementById('free');
var stroke = document.getElementById('stroke');
var fill = document.getElementById('fill');
var eraseBtn = document.getElementById('erase');
/****************************************************** */
let newx, newy, width, height;
let cx, cy, rad;

let freeHandFlag = 0;
let circleFlag = 0;
let rectFlag = 0;
let lineFlag = 0;
let eraseFlag = 0;

var startPoint = { x: 0, y: 0 };
var coords = { x: 0, y: 0 };

canvas.addEventListener('mousemove', function (e) {
    coords.x = e.offsetX;
    coords.y = e.offsetY;
}, false);

canvas.addEventListener("mousedown", () => {
    cContext.strokeStyle = stroke.value;
    cContext.fillStyle = fill.value;
    canvas.addEventListener('mousemove', onPaint, false);

    if (freeHandFlag == 1) {
        eraseFlag = 0;
        cContext.beginPath();
        cContext.moveTo(coords.x, coords.y);
    }
    if (lineFlag == 1) {
        eraseFlag = 0;
        cContext.beginPath();
        cContext.moveTo(coords.x, coords.y);
    }
    if (rectFlag == 1) {
        eraseFlag = 0;
        startPoint.x = coords.x;
        startPoint.y = coords.y;

    }
    if (circleFlag == 1) {
        eraseFlag = 0;
        startPoint.x = coords.x;
        startPoint.y = coords.y;


    }
    if (eraseFlag == 1) {
        cContext.beginPath();
        cContext.moveTo(coords.x, coords.y);
    }
})

canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener("mousemove", onPaint, false)
    if (freeHandFlag == 1) {
        freeHandFlag = 0;

    }
    if (lineFlag == 1) {
        lineFlag = 0;
        cContext.lineTo(coords.x, coords.y);
        cContext.stroke();

    }
    if (rectFlag == 1) {
        rectFlag = 0;
        newx = Math.min(startPoint.x, coords.x)
        newy = Math.min(startPoint.y, coords.y)
        width = Math.abs(startPoint.x - coords.x)
        height = Math.abs(startPoint.y - coords.y)

        cContext.fillRect(newx, newy, width, height)
        cContext.strokeRect(newx, newy, width, height);

    }
    if (circleFlag == 1) {
        circleFlag = 0;
        newx = Math.min(startPoint.x, coords.x)
        newy = Math.min(startPoint.y, coords.y)
        width = Math.abs(startPoint.x - coords.x)
        height = Math.abs(startPoint.y - coords.y)
        cx = newx + width / 2;
        cy = newy + height / 2;
        rad = Math.sqrt(width * width + height * height) / 2;
        cContext.beginPath();
        cContext.arc(cx, cy, rad, 0, 2 * Math.PI);
        cContext.stroke();


    }

})

var onPaint = function () {
    if (freeHandFlag == 1) {
        cContext.lineTo(coords.x, coords.y);
        cContext.stroke();
        cContext.fillStyle = fill.value;
        cContext.strokeStyle = stroke.value;
    }
    if (eraseFlag == 1) {
        cContext.lineTo(coords.x, coords.y);
        cContext.lineWidth = 20;
        cContext.lineJoin = "round";
        cContext.lineCap = "round";
        cContext.strokeStyle = "#FFFFFF";
        cContext.stroke();
    }
}

freeHandBtn.addEventListener('click', () => {
    freeHandFlag = 1;

})

lineBtn.addEventListener('click', () => {
    lineFlag = 1;

})

rectBtn.addEventListener('click', () => {
    rectFlag = 1;

})


circleBtn.addEventListener('click', () => {
    circleFlag = 1;

})

eraseBtn.addEventListener('click', () => {
    eraseFlag = 1;

})
