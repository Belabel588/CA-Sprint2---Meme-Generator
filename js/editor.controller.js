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
  onBiggerTxt()
  onSmallerTxt()
  onAddLine()
  onClearLine()
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

function onBiggerTxt() {
  const elBiggerTxtBtn = document.querySelector('.increase-text-btn')

  elBiggerTxtBtn.addEventListener('click', () => {
    setBiggerTxt()
    OnRenderMeme(gMeme.selectedImgId)
  })
}


function onSmallerTxt() {
  const elSmallerTxtBtn = document.querySelector('.decrease-text-btn')

  elSmallerTxtBtn.addEventListener('click', () => {
    setSmallerTxt()
    OnRenderMeme(gMeme.selectedImgId)
  })
}


function onAddLine() {
  const elAddLineBtn = document.querySelector('.add-line-btn')

  elAddLineBtn.addEventListener('click', () => {
    addLine()
    OnRenderMeme(gMeme.selectedImgId)
  })
}

function onClearLine() {
  const elClearLineBtn = document.querySelector('.clear-line-btn')

  elClearLineBtn.addEventListener('click', () => {
    clearLine()
    OnRenderMeme(gMeme.selectedImgId)
  })
}

//************ CANVAS FUNCTIONS ************//

function OnRenderMeme(imgId) {
  renderMeme(imgId)
}




