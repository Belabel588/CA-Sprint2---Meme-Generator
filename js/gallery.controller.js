'use strict'

//************ GALLERY FUNCTIONS ************//


function onRenderImgs() {
  const imgs = getImgs()


  let strHtml = ''

  imgs.forEach(img => {
    strHtml += `
    <img src="${img.url}" alt="meme image" onclick="OnRenderMeme(${img.id})">
    `
  }
  )

  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = strHtml
}