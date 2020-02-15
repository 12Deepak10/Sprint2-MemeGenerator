'use strict'

let gElCanvas;
let gCtx;
let gBgImg;

function init() {
    createLineDefaults();
    loadImages();
    gBgImg = new Image();
    renderImgGallery();
}

function onGalleryNavBtnClick(elGalleryBtn) {
    onNavBtnClick(elGalleryBtn);
    hideElByClass('editor-container');
    displayElByClassAndType('gallery-container', 'flex');
    displayElByClassAndType('about-container', 'flex');
}

function onNavBtnClick(elNavBtn) {
    let elNavBtns = document.querySelectorAll('.main-nav li');
    elNavBtns.forEach(navBtn => navBtn.classList.remove('active'));
    elNavBtn.classList.add('active');
}

function displayElByClassAndType(elClass, displayType) {
    let el = document.querySelector(`.${elClass}`);
    el.style.display = displayType;
}

function hideElByClass(elClass) {
    let el = document.querySelector(`.${elClass}`);
    el.style.display = 'none';
}

// ---------- Gallery ----------

function onGalleryImageClick(elImg) {
    hideElByClass('gallery-container');
    hideElByClass('about-container');
    showEditor(elImg.dataset.imgid);
    let elGalleryNavBtn = document.querySelector('.gallery-link');
    elGalleryNavBtn.classList.remove('active');
}

function renderImgGallery() {
    let elImgGallery = document.querySelector('.images-gallery');
    let images = getImages();
    images.forEach((image) => elImgGallery.innerHTML += getImgHtml(image));
}

function getImgHtml(image) {
    let imgWidth = 250;
    let imgHeight = 250;
    let imgHTML = `<img src="${image.url}" height="${imgHeight}" width="${imgWidth}" data-imgid=${image.id} class="gallery-image" onclick="onGalleryImageClick(this)">`;
    return imgHTML;
}


// ---------- Editor ----------

function hideEditor() {
    let elGallery = document.querySelector('.editor-container');
    elGallery.style.display = 'none';
}

function showEditor(bgImgId) {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    setCanvasSizeByScreenSize(gElCanvas);
    updateCanvasWidth(gElCanvas.width);
    updateCanvasHeight(gElCanvas.height);
    initGmeme();
    setSelectedImgById(bgImgId);
    displayElByClassAndType('editor-container', 'flex');
    renderCanvas();
}

function renderCanvas() {
    gBgImg.src = getBgImg().url;
    gBgImg.onload = () => {
        gCtx.drawImage(gBgImg, 0, 0, gElCanvas.width, gElCanvas.height);
        drawTextLines();
    }
}

function setCanvasSizeByScreenSize(elCanvas) {
    let screenWidth = window.screen.width;

    if (screenWidth <= 740) {
        elCanvas.width = 280;
        elCanvas.height = 280;
    }
}

function drawTextLines() {
    let txtLines = getAllTxtLines();
    let selectedLine = getSelectedLine();
    txtLines.forEach((txtLine) => drawTextLine(txtLine, selectedLine));
}

function drawTextLine(txtLine, selectedLine) {
    if (txtLine === selectedLine) {
        drawBgRect(txtLine);
    }
    gCtx.font = `${txtLine.fontSize}px ${txtLine.font}`;
    gCtx.textAlign = txtLine.align;
    gCtx.fillStyle = txtLine.fontColor;
    gCtx.strokeStyle = txtLine.strokeColor;
    gCtx.textBaseline = txtLine.baseLine;
    gCtx.fillText(txtLine.txt, txtLine.pos.x, txtLine.pos.y);
    gCtx.strokeText(txtLine.txt, txtLine.pos.x, txtLine.pos.y);
}

function drawBgRect(txtLine) {
    gCtx.beginPath();
    gCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    let bgRectHeight = txtLine.fontSize;
    let posY = calcBgRectPosY(txtLine, bgRectHeight);
    gCtx.fillRect(0, posY, gElCanvas.width, bgRectHeight);
}

function calcBgRectPosY(txtLine, bgRectHeight) {
    let posY;

    if (txtLine.baseLine === 'top') {
        posY = 0;
    } else if (txtLine.baseLine === 'bottom') {
        posY = txtLine.pos.y - bgRectHeight;
    } else { // baseline === 'middle'
        posY = txtLine.pos.y - (bgRectHeight / 2);
    }

    return posY;
}

function onAddLine() {
    addLine();
    setNewLineAsSelected();
    renderCanvas();
}

function onRemoveSelectedLine() {
    removeSelectedLine();
    renderCanvas();
}

function onChangeLine() {
    setNextLineAsSelected();
    setInputLineTxtOfSelectedLine();
    renderCanvas();
}

function setInputLineTxtOfSelectedLine() {
    let elInputLine = document.querySelector('.text-line-input');
    let selectedLine = getSelectedLine();
    elInputLine.value = selectedLine.txt;
}

function onTextLineInputChange(txt) {
    setSelectedLineTxt(txt);
    renderCanvas();
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

function onStrokeColorClick() {
    let elStrokeColorInput = document.querySelector('.text-stroke-color-input');
    elStrokeColorInput.click();
}

function onStrokeColorChange(strokeColor) {
    setSelectedLineStrokeColor(strokeColor);
    renderCanvas();
}
function onFontColorClick() {
    let elFontColorInput = document.querySelector('.text-font-color-input');
    elFontColorInput.click();
}

function onFontColorChange(fontColor) {
    setSelectedLineFontColor(fontColor);
    renderCanvas();
}

function onTextAlignChange(textAlign) {
    alignSelectedLine(textAlign);
    renderCanvas();
}

function onDownloadMeme(elDownloadLink) {
    const data = gElCanvas.toDataURL();
    elDownloadLink.href = data;
    elDownloadLink.download = 'meme.png';
}