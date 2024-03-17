'use strict'



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
    {
      txt: 'Aliens',
      color: 'white',
      size: 40,
      x: 190,
      y: 50
    }
  ]
}


let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }




//************ DATA CONTROL FUNCTIONS ************//

function getMeme() {
  return gMeme
}


//************ CANVAS MECHANICS ************//

//! rendering both the photo and the text on it //
function renderImg(imgId) {
  const meme = getMeme()
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