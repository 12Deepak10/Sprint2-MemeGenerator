'use strict'

let gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'first text',
            size: 50,
            align: 'center',
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme;
}

function getBgImgUrl() {
    let imgUrl = `/images/square/${gMeme.selectedImgId}.jpg`;
    return imgUrl;
}

function getAllTxtLines() {
    return gMeme.lines;
}

function getSelctedTxtLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}



