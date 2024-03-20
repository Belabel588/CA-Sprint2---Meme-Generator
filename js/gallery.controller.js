'use strict'

//************ GALLERY FUNCTIONS ************//


function onRenderImgs() {
  const imgs = getImgs()


  let strHtml = ''

  imgs.forEach(img => {
    strHtml += `
    <img src="${img.url}" alt="meme image" onclick="OnRenderMeme(${img.id});showEditor()">
    `
  }
  )

  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = strHtml
}


function moreImgsId() {
  let imgs = getImgs()
  let moreImgsId = imgs.length
  moreImgsId++
  return moreImgsId
}


function onUploadImage() {
  const elImageInput = document.querySelector('#file-input')
  let uploadedImg = ''
  let imgs = getImgs()

  elImageInput.addEventListener('change', () => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      uploadedImg = reader.result
      imgs.push({ id: moreImgsId(), url: uploadedImg })
      _saveGallery()
      onRenderImgs()
    })
    reader.readAsDataURL(event.target.files[0])
  })
}

function onDeleteImg() {
  let imgs = getImgs()
  imgs.pop()

  onRenderImgs()

  _saveGallery()
}
