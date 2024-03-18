'use strict'


//************ GLOBALS ************//
let gElCanvas
let gCtx




//************ PAGE LOADING FUNCTIONS ************//
function onInit() {
  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  OnRenderMeme()
  onRenderImgs()
  onChangeTxt()
  onChangeColor()
}




//************ EDITOR FUNCTIONS ************//

function onChangeTxt() {
  let memeTxt = document.querySelector('.meme-text-input')

  memeTxt.addEventListener('input', () => {
    setLineTxt(memeTxt.value)
    OnRenderMeme(gMeme.selectedImgId)
  })
}

function onDownloadMeme() {
  const elDownloadLink = document.querySelector('.donwnload-meme-link')

  const pngDataUrl = gElCanvas.toDataURL("image/png")
  // console.log(pngDataUrl)

  elDownloadLink.href = pngDataUrl
}

function onChangeColor() {
  const elColorPicker = document.querySelector('#color-picker')

  elColorPicker.addEventListener('input', () => {
    setColor(elColorPicker.value)
    OnRenderMeme(gMeme.selectedImgId)

  })
}


//************ CANVAS FUNCTIONS ************//

function OnRenderMeme(imgId) {
  renderMeme(imgId)
}




