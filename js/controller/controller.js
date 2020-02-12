'use strict'

let gElCanvas;
let gCtx;

function init() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderMeme();
}

function renderMeme() {
    let bgImg = new Image();
    bgImg.src = getBgImgUrl();
    bgImg.onload = () => {
        gCtx.drawImage(bgImg, 0, 0, gElCanvas.width, gElCanvas.height);
        drawTextLines();
    }
}

function drawTextLines() {
    let txtLines = getAllTxtLines();
    txtLines.forEach((txtLine, txtLineIdx) => drawTextLine(txtLine, txtLineIdx));
}

function drawTextLine(textLine, textLineIndex) {
    let fontFamily = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
    gCtx.font = `${textLine.size}px ${fontFamily}`;
    gCtx.textAlign = textLine.align;
    gCtx.fillStyle = textLine.color;
    gCtx.strokeStyle = 'black';
    let textLineHeight;

    if (textLineIndex === 0) {
        textLineHeight = 0;
        gCtx.textBaseline = 'top';
    } else if (textLineIndex === 1) {
        textLineHeight = gElCanvas.height;
        gCtx.textBaseline = 'bottom';
    } else {
        textLineHeight = gElCanvas.height / 2;
        gCtx.textBaseline = 'middle';
    }

    gCtx.fillText(textLine.txt, gElCanvas.width / 2, textLineHeight);
    gCtx.strokeText(textLine.txt, gElCanvas.width / 2, textLineHeight);
}