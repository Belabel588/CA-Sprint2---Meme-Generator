'use strict'
'use strict'

//************ GLOBALS ************//
let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']



//************ DATA ************//

let gImgs = [
  { id: 1, url: 'imgs/01.jpg', keywords: ['funny', 'history'] },
  { id: 2, url: 'imgs/02.jpg', keywords: ['funny', 'yes and no'] },
  { id: 3, url: 'imgs/03.jpg', keywords: ['funny', 'sad', 'slap'] },
  { id: 4, url: 'imgs/04.jpg', keywords: ['funny', 'strengh', 'motivation'] },
  { id: 5, url: 'imgs/05.jpg', keywords: ['funny', 'yes and no'] },
  { id: 6, url: 'imgs/06.jpg', keywords: ['funny', 'cynical'] }
]


let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    addLine(`meme's text`, 40, { x: 20, y: 50 }, 'white')
  ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }






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

  elEditorSection.classList.add('hide')
  elGallerySection.classList.remove('hide')
}
function showEditor() {
  const elGallerySection = document.querySelector('.gallery')
  const elEditorSection = document.querySelector('.editor')


  elGallerySection.classList.add('hide')
  elEditorSection.classList.remove('hide')
}


//************ EDITOR MECHANICS ************//
function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setBiggerTxt() {
  gMeme.lines[gMeme.selectedLineIdx].size += 5
}

function setSmallerTxt() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 5

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
}


function changeLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0

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

}

function AddText(line, text, x, y) {
  gCtx.font = `${line.size}px Arial`
  gCtx.fillStyle = line.color
  gCtx.fillText(text, x, y)
  gCtx.lineWidth = 1

  gCtx.strokeStyle = 'black'
  gCtx.strokeText(text, x, y)



}

function frameText(line, text, x, y) {
  const textWidth = gCtx.measureText(text).width
  const textHeight = line.size


  gCtx.strokeRect(x, y - textHeight, textWidth, textHeight)
}



//****** canvas adaptability of size to choice of img ******//

function fitCanvasForImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


//************ MOVE MECHANICS  ************//
function isTextClicked(clickedPos) {
  const linePos = gMeme.lines[gMeme.selectedLineIdx]

  // Calc the distance between two dots
  const textWidth = gCtx.measureText(linePos.txt).width
  const textHeight = linePos.size

  if (clickedPos.x > linePos.pos.x &&
    clickedPos.x < linePos.pos.x + textWidth &&
    clickedPos.y < linePos.pos.y &&
    clickedPos.y > linePos.pos.y - textHeight) {
    return true
  }
}

function setTextDrag(isDrag) {

  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveText(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
  gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

//************ UTIL FUNCTION************//

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}