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


// function onImgInput(ev) {
//   loadImageFromInput(ev)
// }

// function loadImageFromInput(ev) {
//   const reader = new FileReader()

//   reader.onload = ev => {
//     let img = new Image()
//     img.src = ev.target.result
//     img.onload = () => renderImg(img)
//   }
//   reader.readAsDataURL(ev.target.files[0])
// }

// function renderImg(img) {

//   gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

//   gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
// }


function onUploadImage() {
  const elImageInput = document.querySelector('#file-input')
  let uploadedImg = ''
  let imgs = getImgs()

  elImageInput.addEventListener('change', () => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      uploadedImg = reader.result
      imgs.push({ id: makeid(4), url: uploadedImg })
      onRenderImgs()
    })
    reader.readAsDataURL(event.target.files[0])
  })
}
