const drop = function (evt) {
  evt.preventDefault()
  let dt = evt.dataTransfer
  let file = dt.items[ 0 ].getAsFile()
  let formData = new FormData()
  formData.append('myFile', file, file.name)
  imageUpload(formData)
}

const dragover = function (evt) {
  evt.preventDefault()
}

const dragend = function (evt) {
  const dt = evt.dataTransfer
  if (dt.items) {
    for (let i = 0; i < dt.items.length; i++) {
      dt.items.remove(i)
    }
  } else {
    evt.dataTransfer.clearData()
  }
}

function imageUpload (formData) {
  $.ajax({
    type: 'POST',
    url: '/img-to-s3',
    data: formData,
    processData: false,
    contentType: false
  }).done(function (data) {
    fetchPath()
  })
};

function fetchPath () {
  $.ajax({
    type: 'GET',
    url: '/get-path'
  }).done(data => {
    getAWS(data, function (response) {
      let html = `<img class='imgAd' src=${response}>`
      $('#addImg').prepend(html)
      submitChecker()
    })
  })
}

function getAWS (data, callback) {
  $('#addImg').empty()
  for (let i = 0; i < data.length; i++) {
    let temp = {path: data[i]}
    $.ajax({
      type: 'POST',
      url: '/get-aws',
      data: temp,
      success: callback
    })
  }
}

function submitChecker () {
  if ($('#addImg').children().length > 1) {
    $('#toPortal').show()
  } else {
    $('#toPortal').hide()
  }
}

$('#toPortal').on('click', function (req, res) {
  window.location.assign('/portal')
})
