'use strict'

let gImages = [];

let gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'first text',
            size: 50,
            align: 'center',
            fillColor: 'red',
            strokeColor: 'yellow',
            height: null,
            baseLine: null
        },
        {
            txt: 'second text',
            size: 40,
            align: 'center',
            fillColor: 'green',
            strokeColor: 'black',
            height: null,
            baseLine: null
        },
        {
            txt: 'third text',
            size: 90,
            align: 'center',
            fillColor: 'cyan',
            strokeColor: 'black',
            height: null,
            baseLine: null
        }
    ]
}

function setSelectedLineHeight(lineHeightDiff) {
    if (gMeme.lines[gMeme.selectedLineIdx].height !== null) {
        gMeme.lines[gMeme.selectedLineIdx].height += lineHeightDiff;
    }
}

function setSelectedLineFontSize(fontSizeDiff) {
    gMeme.lines[gMeme.selectedLineIdx].size += fontSizeDiff;
    renderCanvas();
}

function getImagesUrls() {
    return gImages;
}

function loadImages() {
    let numOfImages = 2;
    for (let i = 1; i <= numOfImages; i++) {
        let currImgUrl = `images/square/${i}.jpg`;
        gImages.push(currImgUrl);
    }
}

function setSelectedLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getMeme() {
    return gMeme;
}

function getBgImgUrl() {
    return gImages[gMeme.selectedImgId - 1];
}

function getAllTxtLines() {
    return gMeme.lines;
}

function setSelectedImgId(imgId) {
    gMeme.selectedImgId = imgId;
}

function getSelctedTxtLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}



