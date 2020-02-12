'use strict'

let gElCanvas;
let gCtx;
let gBgImg;

function init() {
    loadImages();
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    gBgImg = new Image();
    renderCanvas();
    renderImgGallery();
}

function onLineHeightChange(lineHeightDiff) {
    setSelectedLineHeight(lineHeightDiff);
    renderCanvas();
}

function onFontSizeChange(fontDiff) {
    setSelectedLineFontSize(fontDiff);
}

function onImageClick(elImg) {
    setSelectedImgId(elImg.dataset.imgid);
    renderCanvas();
}

function renderImgGallery() {
    let elImgGallery = document.querySelector('.image-gallery');
    let imagesUrls = getImagesUrls();
    imagesUrls.forEach((imageUrl, imgIndex) => elImgGallery.innerHTML += getImgHtml(imageUrl, imgIndex + 1));
}

function getImgHtml(imgUrl, imgId) {
    let imgHTML = `<img src="${imgUrl}" data-imgid=${imgId} onclick="onImageClick(this)">`;
    return imgHTML;
}

function renderCanvas() {
    gBgImg.src = getBgImgUrl();
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