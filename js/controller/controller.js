'use strict'

let gElCanvas;
let gCtx;
let gBgImg;

function init() {
    loadImages();
    renderImgGallery();
}

function onChangeLine() {
    setNextLineAsSelected();
}

function onLineHeightChange(yPosDiff) {
    setSelectedLineYPos(yPosDiff);
    renderCanvas();
}

function onFontSizeChange(fontDiff) {
    setSelectedLineFontSize(fontDiff);
}

function onGalleryImageClick(elImg) {
    hideGallery();
    showEditor();
    setSelectedImgId(elImg.dataset.imgid);
    renderCanvas();
}

function hideGallery() {
    let elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = 'none';
}

function showEditor() {
    let elGallery = document.querySelector('.editor-container');
    elGallery.style.display = 'flex';
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    gBgImg = new Image();
    renderCanvas();
}

function renderImgGallery() {
    let elImgGallery = document.querySelector('.images-gallery');
    let images = getImages();
    images.forEach((image) => elImgGallery.innerHTML += getImgHtml(image));
}

function getImgHtml(image) {
    let imgWidth = 250;
    let imgHeight = 250;
    let imgHTML = `<img src="${image.url}" height="${imgHeight}" width="${imgWidth}" data-imgid=${image.id} onclick="onGalleryImageClick(this)">`;
    return imgHTML;
}

function renderCanvas() {
    gBgImg.src = getBgImg().url;
    gBgImg.onload = () => {
        gCtx.drawImage(gBgImg, 0, 0, gElCanvas.width, gElCanvas.height);
        drawTextLines();
    }
}

function onTextLineInputChange(txt) {
    setSelectedLineTxt(txt);
    renderCanvas();
}

function drawTextLines() {
    let txtLines = getAllTxtLines();
    txtLines.forEach((txtLine, txtLineIdx) => drawTextLine(txtLine, txtLineIdx));
}

function drawTextLine(textLine, textLineIndex) {
    let fontFamily = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
    gCtx.font = `${textLine.size}px ${fontFamily}`;
    gCtx.textAlign = textLine.align ? textLine.align : 'center';
    gCtx.fillStyle = textLine.fillColor ? textLine.fillColor : 'white';
    gCtx.strokeStyle = textLine.strokeColor ? textLine.strokeColor : 'black';

    if (textLineIndex === 0) {
        textLine.pos.y = textLine.pos.y ? textLine.pos.y : 0;
        textLine.baseLine = 'top';
    } else if (textLineIndex === 1) {
        textLine.pos.y = textLine.pos.y ? textLine.pos.y : gElCanvas.height;
        textLine.baseLine = 'bottom';
    } else {
        textLine.pos.y = textLine.pos.y ? textLine.pos.y : gElCanvas.height / 2;
        textLine.baseLine = 'middle';
    }

    textLine.pos.x = textLine.pos.x ? textLine.pos.x : gElCanvas.width / 2;
    gCtx.textBaseline = textLine.baseLine;
    gCtx.fillText(textLine.txt, textLine.pos.x, textLine.pos.y);
    gCtx.strokeText(textLine.txt, textLine.pos.x, textLine.pos.y);
}