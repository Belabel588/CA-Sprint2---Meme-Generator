'use strict'


//************ DATA CONTROL FUNCTIONS ************//

function getImgs() {
  return gImgs
}

function getMeme() {
  return gMeme
}


//************ EDITOR MECHANICS ************//
function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
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
      AddText(line.txt, line.x, line.y)
    })
  }
}

function AddText(text, x, y) {
  gCtx.font = `${gMeme.lines[0].size}px Arial`
  gCtx.fillStyle = gMeme.lines[0].color
  gCtx.fillText(text, x, y)
  gCtx.lineWidth = 1

  gCtx.strokeStyle = 'black'
  gCtx.strokeText(text, x, y)
}


//****** canvas adaptability of size to choice of img ******//

function fitCanvasForImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}