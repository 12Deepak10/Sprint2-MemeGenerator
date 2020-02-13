'use strict'

let gElCanvas;
let gCtx;
let gBgImg;

function init() {
    loadImages();
    renderImgGallery();
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
    let defaultFontFamily = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
    let fontFamily = textLine.font ? textLine.font : defaultFontFamily;

    let defaultFontSize = 50;
    let fontSize = textLine.size ? textLine.size : defaultFontSize;

    let defaultTextAlign = 'center';
    let textAlign = textLine.align ? textLine.align : defaultTextAlign;

    let defaultFillStyle = 'white';
    let fillStyle = textLine.fontColor ? textLine.fontColor : defaultFillStyle;

    let defaultStrokeStyle = 'black';
    let strokeStyle = textLine.strokeColor ? textLine.strokeColor : defaultStrokeStyle;

    gCtx.font = `${fontSize}px ${fontFamily}`;
    gCtx.textAlign = textAlign;
    gCtx.fillStyle = fillStyle;
    gCtx.strokeStyle = strokeStyle;

    let defaultPosX = gElCanvas.width / 2;
    let posX = textLine.pos.x ? textLine.pos.x : defaultPosX;
    let posY;
    let baseLine;

    if (textLineIndex === 0) {
        posY = textLine.pos.y ? textLine.pos.y : 0;
        baseLine = 'top';
    } else if (textLineIndex === 1) {
        posY = textLine.pos.y ? textLine.pos.y : gElCanvas.height;
        baseLine = 'bottom';
    } else {
        posY = textLine.pos.y ? textLine.pos.y : gElCanvas.height / 2;
        baseLine = 'middle';
    }

    gCtx.textBaseline = baseLine;
    gCtx.fillText(textLine.txt, posX, posY);
    gCtx.strokeText(textLine.txt, posX, posY);
}