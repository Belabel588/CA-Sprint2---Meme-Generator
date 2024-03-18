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
  const downloadLink = document.querySelector('.donwnload-meme-link')

  const pngDataUrl = gElCanvas.toDataURL("image/png")
  // console.log(pngDataUrl)

  downloadLink.href = pngDataUrl
}


//************ CANVAS FUNCTIONS ************//

function OnRenderMeme(imgId) {
  renderMeme(imgId)
}




