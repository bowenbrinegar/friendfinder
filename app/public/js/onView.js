$(document).ready(() => {

$('.profileOnView').on('click', 'img', function() {
  let id = $(this).attr('data-id')
  fetchProfile(id)
});

const fetchProfile = (id) => {
  $.ajax({
    type: 'GET',
    url: '/get-onView-profile/' + id,
    success: distribute
  })
}

const distribute = (res) => {
  $('#onImgs').empty()
  $('#onBio').empty()
  $('#onInterestContainer').empty()
  for (let i=0; i < res.Interests.length; i++) {
    let html = `<div id='onInterestItem'>
                    <h4>${res.Interests[i].interest}</h4>
                </div>`
    $('#onInterestContainer').prepend(html)
  }
  let html = `<h6>College: ${res.Bio.college}</h6>
              <h6>Sex: ${res.Bio.sex}</h6>
              <h6>Looking For: ${res.Bio.lookingFor}</h6>
              <h6>Work: ${res.Bio.work}</h6>
              <h6>Bio: ${res.Bio.bio}</h6>`

  $('#onBio').append(html)
  for (let i=0; i < res.Images.length; i++) {
    awsImg(res.Images[i].path)
  }
}

const awsImg = (path) => {
  $.ajax({
    type: 'GET',
    url: '/img-to-aws/' + path,
    success: renderOnImgs
  })
}

const renderOnImgs = (res) => {
  let html = `<img id='onImgsItem' src=${res}>`
  $('#onImgs').append(html)
}


})