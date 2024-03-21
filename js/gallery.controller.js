'use strict'

//************ GALLERY FUNCTIONS ************//


function onRenderImgs(imgs) {

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
      onRenderImgs(gImgs)
    })
    reader.readAsDataURL(event.target.files[0])
  })
}

function onDeleteImg() {
  let imgs = getImgs()
  imgs.pop()

  onRenderImgs(gImgs)

  _saveGallery()
}

//************ SEARCH FUNCTIONS ************//
function onSetFilterBy() {
  const imgs = getImgs()

  const elSearchImg = document.querySelector('.img-search')

  elSearchImg.addEventListener('input', () => {

    const filterBy = elSearchImg.value
    if (!filterBy) return

    let filteredByKeyword = imgs.filter(img => img.keywords.includes(filterBy))
    console.log(filteredByKeyword)


    onRenderImgs(filteredByKeyword)

  })
}
