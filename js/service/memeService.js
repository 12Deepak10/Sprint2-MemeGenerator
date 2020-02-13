'use strict'

let gImages = [];

let gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: _createInitialLines()
}

function setNextLineAsSelected() {
    gMeme.selectedLineIdx++;

    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
    }
}

function setSelectedLineYPos(yPosDiff) {
    if (gMeme.lines[gMeme.selectedLineIdx].pos.y !== null) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y += yPosDiff;
    }
}

function setSelectedLineFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily;
}

function setSelectedLineFontSize(fontSizeDiff) {
    gMeme.lines[gMeme.selectedLineIdx].size += fontSizeDiff;
}

function setSelectedLineFontColor(fontColor) {
    let selectedLine = _getSelectedLine();
    selectedLine.fontColor = fontColor;
}

function setSelectedLineStrokeColor(strokeColor) {
    let selectedLine = _getSelectedLine();
    selectedLine.strokeColor = strokeColor;
}

function getImages() {
    return gImages;
}

function loadImages() {
    let numOfImages = 9;
    for (let i = 1; i <= numOfImages; i++) {
        let currImg = { url: `images/square/${i}.jpg`, id: i };
        gImages.push(currImg);
    }
}

function setSelectedLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getBgImg() {
    return gImages[gMeme.selectedImgId - 1];
}

function getAllTxtLines() {
    return gMeme.lines;
}

function setSelectedImgId(imgId) {
    gMeme.selectedImgId = imgId;
}

function _getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function _createInitialLines() {
    let lines = [];

    for (let i = 0; i < 2; i++) {
        lines.push(_createLine(`Line number ${i + 1}`));
    }

    return lines;
}

function _createLine(lineTxt) {
    let line = {
        id: Math.random() * 1000,
        txt: 'first text',
        font: null,
        size: null,
        fontColor: null,
        strokeColor: null,
        align: null,
        pos: {
            x: null,
            y: null
        },
        baseLine: null
    }

    return line;
}