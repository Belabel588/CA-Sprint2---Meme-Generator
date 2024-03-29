'use strict'

//************ PAGE LOADING FUNCTIONS ************//
function onInit() {
  _createMeme()
  _createImgs()

  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  addMoveListeners()
  resizeCanvas()


  showGallery()
  OnRenderMeme()
  onRenderImgs(gImgs)
  onSetFilterBy()
  onUploadImage()
  onChangeTxt()
  onChangeColor()
  onBiggerTxt()
  onSmallerTxt()
  onMoveTextRight()
  onMoveTextLeft()
  onMoveTextCenter()
  onChangeFont()
  onAddLine()
  onClearLine()
  onChangeLine()


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

function onMoveTextRight() {
  const elMoveTextRightBtn = document.querySelector('.move-right-btn')

  elMoveTextRightBtn.addEventListener('click', () => {
    moveTextRight()
    OnRenderMeme(gMeme.selectedImgId)

  })
}
function onMoveTextLeft() {
  const elMoveTextLeftBtn = document.querySelector('.move-left-btn')

  elMoveTextLeftBtn.addEventListener('click', () => {
    moveTextLeft()
    OnRenderMeme(gMeme.selectedImgId)

  })
}

function onMoveTextCenter() {
  const elMoveTextLeftBtn = document.querySelector('.move-center-btn')

  elMoveTextLeftBtn.addEventListener('click', () => {
    moveTextCenter()
    OnRenderMeme(gMeme.selectedImgId)

  })
}

function onChangeFont() {
  const elFontInput = document.querySelector('.change-font-input')

  elFontInput.addEventListener('change', () => {
    changeFont(elFontInput.value)
    onRenderImgs(gMeme.selectedImgId)
  })
}


function onAddLine() {
  const elAddLineBtn = document.querySelector('.add-line-btn')
  const elFontInput = document.querySelector('.change-font-input')

  elAddLineBtn.addEventListener('click', () => {
    gMeme.lines.push(addLine(`meme's text`, 40, { x: 20, y: getRandomInt(20, 350) }, 'white', elFontInput.value))
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

function onChangeLine() {
  const elChangeLineBtn = document.querySelector('.change-line-btn')

  elChangeLineBtn.addEventListener('click', () => {
    changeLine()
    OnRenderMeme(gMeme.selectedImgId)

  })
}

//************ CANVAS FUNCTIONS ************//

function OnRenderMeme(imgId) {
  renderMeme(imgId)
}


function addMoveListeners() {
  addMouseListeners()
  addTouchListeners()

  window.addEventListener('resize', () => {
    resizeCanvas()

    OnRenderMeme(gMeme.selectedImgId)
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {

  gStartPos = getEvPos(ev)


  chooseClickedLine(gStartPos)
  if (!isTextClicked(gStartPos)) return



  setTextDrag(true)
  document.body.style.cursor = 'grabbing'
}


function onMove(ev) {
  const { isDrag } = getLine()
  if (!isDrag) return

  const pos = getEvPos(ev)


  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y


  moveText(dx, dy)
  gStartPos = pos
  OnRenderMeme(gMeme.selectedImgId)
}


function onUp() {
  setTextDrag(false)
  document.body.style.cursor = 'grab'
}



function getEvPos(ev) {

  if (TOUCH_EVENTS.includes(ev.type)) {

    ev.preventDefault()
    ev = ev.changedTouches[0]



    return {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }

  } else {
    return {
      x: ev.offsetX,
      y: ev.offsetY,
    }
  }
}


function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')

  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}







