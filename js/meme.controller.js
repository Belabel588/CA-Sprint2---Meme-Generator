'use strict'


//************ GLOBALS ************//
let gElCanvas
let gCtx


//************ PAGE LOADING FUNCTIONS ************//
function onInit() {
  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  OnRenderMeme()
}



//************ CANVAS FUNCTIONS ************//

function OnRenderMeme() {
  renderImg(1)


}


