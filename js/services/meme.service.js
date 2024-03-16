'use strict'










//************ CANVAS MECHANICS ************//

//! rendering both the photo and the text on it //
function renderImg(text, x, y) {
  const elImg = new Image()
  elImg.src = 'imgs/01.jpg'

  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)

    //! fitting the canvas to the img
    fitCanvasForImg(elImg)

    //! where the addText is activated
    AddText(text, x, y)
  }
}

function AddText(text, x, y) {
  gCtx.fillStyle = 'white'
  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 2

  gCtx.font = '55px Arial'
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}


//****** canvas adaptability to choice of img ******// 

function fitCanvasForImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}