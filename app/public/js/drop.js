function imageUpload(obj) {
	$.ajax({
		type: 'PUT',
		url: '/img-to-s3'
		data: obj
	}).done(function(err) {
		console.log('success')
	})
};

var drop = function (evt) {
  console.log('drop')
  evt.preventDefault()
  let dt = evt.dataTransfer
  if (dt.items) {
  	for (var i = 0; i < dt.items.length; i++) {
  		if (dt.items[i].kind == 'file') {
  			var file = dt.items[i].getAsFile()
  			console.log('... file[' + i + '].name = ' + file.name)
			  let obj = {
  				file: file,
				  filename: file.name
			  };
			  imageUpload(obj)
      }
    }
  } else {
  	for (var i = 0; i < dt.files.length; i++) {
  		console.log('... file[' + i + '].name = ' + dt.files[i].name)
    }
  }
};

var dragover = function (evt) {
  console.log('dragOver')
  evt.preventDefault()
};

var dragend = function (evt) {
  console.log('dragEnd')
  var dt = evt.dataTransfer
  if (dt.items) {
    for (var i = 0; i < dt.items.length; i++) {
      dt.items.remove(i)
    }
  } else {
    evt.dataTransfer.clearData()
  }
};
