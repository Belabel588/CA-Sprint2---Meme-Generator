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
      txt: `Meme's text`,
      color: 'white',
      size: 40,
      x: 20,
      y: 50
    }
  ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }