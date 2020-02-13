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

function onLineHeightChange(lineHeightDiff) {
    setSelectedLineHeight(lineHeightDiff);
    renderCanvas();
}

function onFontSizeChange(fontDiff) {
    setSelectedLineFontSize(fontDiff);
}

function onGalleryImageClick(elImg) {
    console.log('in galery image click');
    hideGallery();
    showEditor();

    setSelectedImgId(elImg.dataset.imgid);
    renderCanvas();
}

function hideGallery() {
    console.log('in hide gallery');
    let elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = 'none';
}

function showEditor() {
    console.log('in show canvas');
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
    gCtx.textAlign = textLine.align;
    gCtx.fillStyle = textLine.fillColor;
    gCtx.strokeStyle = textLine.strokeColor;

    if (textLineIndex === 0) {
        textLine.height = textLine.height ? textLine.height : 0;
        textLine.baseLine = 'top';
    } else if (textLineIndex === 1) {
        textLine.height = textLine.height ? textLine.height : gElCanvas.height;
        textLine.baseLine = 'bottom';
    } else {
        textLine.height = textLine.height ? textLine.height : gElCanvas.height / 2;
        textLine.baseLine = 'middle';
    }

    gCtx.textBaseline = textLine.baseLine;
    gCtx.fillText(textLine.txt, gElCanvas.width / 2, textLine.height);
    gCtx.strokeText(textLine.txt, gElCanvas.width / 2, textLine.height);
}