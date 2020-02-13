'use strict'

let gImages = [];

let gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'first text',
            font: null,
            size: 50,
            align: null,
            fillColor: null,
            strokeColor: null,
            pos: {
                x: null,
                y: null
            },
            baseLine: null
        },
        {
            txt: 'second text',
            font: null,
            size: 40,
            align: null,
            fillColor: null,
            strokeColor: null,
            pos: {
                x: null,
                y: null
            },
            baseLine: null
        },
        {
            txt: 'third text',
            font: null,
            size: 90,
            align: null,
            fillColor: null,
            strokeColor: null,
            pos: {
                x: null,
                y: null
            },
            baseLine: null
        }
    ]
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