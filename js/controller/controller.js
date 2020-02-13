'use strict'

let gElCanvas;
let gCtx;
let gBgImg;

function init() {
    loadImages();
    renderImgGallery();
}

function onAddLine() {
    addLine();
    renderCanvas();
}

function onRemoveSelectedLine() {
    removeSelectedLine();
    renderCanvas();
}

function onChangeLine() {
    setNextLineAsSelected();
}

function onLineHeightChange(yPosDiff) {
    setSelectedLineYPos(yPosDiff);
    renderCanvas();
}

function onFontFamilyChange(fontFamily) {
    setSelectedLineFontFamily(fontFamily);
    renderCanvas();
}

function onFontSizeChange(fontDiff) {
    setSelectedLineFontSize(fontDiff);
    renderCanvas();
}

function onFontColorChange(fontColor) {
    setSelectedLineFontColor(fontColor);
    renderCanvas();
}

function onStrokeColorChange(strokeColor) {
    setSelectedLineStrokeColor(strokeColor);
    renderCanvas();
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
    updateCanvasWidth(gElCanvas.width);
    updateCanvasHeight(gElCanvas.height);
    initGmeme();
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
    txtLines.forEach((txtLine) => drawTextLine(txtLine));
}

function drawTextLine(textLine) {
    gCtx.font = `${textLine.fontSize}px ${textLine.font}`;
    gCtx.textAlign = textLine.align;
    gCtx.fillStyle = textLine.fontColor;
    gCtx.strokeStyle = textLine.strokeColor;
    gCtx.textBaseline = textLine.baseLine;
    gCtx.fillText(textLine.txt, textLine.pos.x, textLine.pos.y);
    gCtx.strokeText(textLine.txt, textLine.pos.x, textLine.pos.y);
}