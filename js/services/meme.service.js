'use strict'


//************ GLOBALS ************//
const MEME_KEY = 'meme_DB'
const GALLERY_KEY = 'gallery_DB'


let gMeme
let gImgs
let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']




//************ DATA ************//
gImgs = _createImgs()
gMeme = _createMeme()

let gKeywordSearchCountMap = { 'funny': 12, 'history': 1, 'yes and no': 10, 'slap': 2, 'motivation': 5, 'cynical': 8 }






//************ DATA CONTROL FUNCTIONS ************//

function getImgs() {
  return gImgs
}

function getMeme() {
  return gMeme
}

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}


//************ NAVIGATION MECHANICS ************//
function showGallery() {
  const elEditorSection = document.querySelector('.editor')
  const elGallerySection = document.querySelector('.gallery')
  const elAddImageBtn = document.querySelector('.add-file-container')

  const elSearchImg = document.querySelector('.img-search')



  elAddImageBtn.classList.remove('hide')



  elEditorSection.classList.add('hide')
  elGallerySection.classList.remove('hide')

  elSearchImg.classList.remove('hide')


  _saveGallery()
}


function showEditor() {
  const elGallerySection = document.querySelector('.gallery')
  const elEditorSection = document.querySelector('.editor')

  const elSearchImg = document.querySelector('.img-search')

  const elAddImageBtn = document.querySelector('.add-file-container')

  elAddImageBtn.classList.add('hide')



  elGallerySection.classList.add('hide')
  elEditorSection.classList.remove('hide')

  elSearchImg.classList.add('hide')

  _saveMeme()
  _saveGallery()

}


//************ EDITOR MECHANICS ************//
function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt

  _saveMeme()
  _saveGallery()
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color

  _saveMeme()
}

function setBiggerTxt() {
  gMeme.lines[gMeme.selectedLineIdx].size += 5

  _saveMeme()
}

function setSmallerTxt() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 5

  _saveMeme()
}

function moveTextRight() {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width / 2

  _saveMeme()
}

function moveTextLeft() {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width / -3

  _saveMeme()
}

function moveTextCenter() {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width / 4

  _saveMeme()
}

function addLine(txt, size, pos, color) {
  return {
    txt: txt,
    size: size,
    pos: pos,
    isDrag: false,
    color: color,
  }

}



function clearLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  _saveMeme()
}


function changeLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0

  _saveMeme()
}

//************ CANVAS MECHANICS ************//

//! rendering both the photo and the text on it //
function renderMeme(imgId) {
  const meme = getMeme()
  meme.selectedImgId = imgId
  const img = gImgs.find(img => img.id === imgId)
  if (!img) return


  const elImg = new Image()
  elImg.src = img.url

  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)

    //! fitting the canvas to the img
    fitCanvasForImg(elImg)

    //! where the addText is activated
    meme.lines.forEach(line => {
      AddText(line, line.txt, line.pos.x, line.pos.y)
    })

    //! frame the line that is currently being edited 

    frameText(meme.lines[meme.selectedLineIdx],
      meme.lines[meme.selectedLineIdx].txt,
      meme.lines[meme.selectedLineIdx].pos.x,
      meme.lines[meme.selectedLineIdx].pos.y)
  }

  _saveMeme()
}

function AddText(line, text, x, y) {
  gCtx.font = `${line.size}px Arial`
  gCtx.fillStyle = line.color
  gCtx.fillText(text, x, y)
  gCtx.lineWidth = 1

  gCtx.strokeStyle = 'black'
  gCtx.strokeText(text, x, y)


  _saveMeme()
}

function frameText(line, text, x, y) {
  const textWidth = gCtx.measureText(text).width
  const textHeight = line.size


  gCtx.strokeRect(x, y - textHeight, textWidth, textHeight)

  _saveMeme()
}



//****** canvas adaptability of size to choice of img ******//

function fitCanvasForImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

  _saveMeme()
}


//************ MOVE MECHANICS  ************//
function isTextClicked(clickedPos) {
  const linePos = gMeme.lines[gMeme.selectedLineIdx]


  const textWidth = gCtx.measureText(linePos.txt).width
  const textHeight = linePos.size

  if (clickedPos.x > linePos.pos.x &&
    clickedPos.x < linePos.pos.x + textWidth &&
    clickedPos.y < linePos.pos.y &&
    clickedPos.y > linePos.pos.y - textHeight) {
    return true
  }
  _saveMeme()
}

function setTextDrag(isDrag) {

  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag

  _saveMeme()
}

function moveText(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
  gMeme.lines[gMeme.selectedLineIdx].pos.y += dy

  _saveMeme()
}





//************ STORAGE FUNCTIONS ************//

function _saveMeme() {
  saveToStorage(MEME_KEY, gMeme)
}

function _saveGallery() {
  saveToStorage(GALLERY_KEY, gImgs)


}


function _createMeme() {
  gMeme = loadFromStorage('meme_DB')

  if (!gMeme) {

    return gMeme = {
      selectedImgId: 1,
      selectedLineIdx: 0,
      lines: [
        addLine(`meme's text`, 40, { x: 20, y: 50 }, 'white')
      ]
    }

  }

}

function _createImgs() {
  gImgs = loadFromStorage('gallery_DB')

  if (!gImgs || !gImgs.length) {

    return gImgs = [
      { id: 1, url: 'imgs/01.jpg', keywords: ['funny', 'history'] },
      { id: 2, url: 'imgs/02.jpg', keywords: ['funny', 'yes and no'] },
      { id: 3, url: 'imgs/03.jpg', keywords: ['funny', 'sad', 'slap'] },
      { id: 4, url: 'imgs/04.jpg', keywords: ['funny', 'strengh', 'motivation'] },
      { id: 5, url: 'imgs/05.jpg', keywords: ['funny', 'yes and no'] },
      { id: 6, url: 'imgs/06.jpg', keywords: ['funny', 'cynical'] }
    ]
  }

}





//************ UTIL FUNCTION************//


function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}


function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}