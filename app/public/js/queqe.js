$(document).ready(function () {
  !(function fetchQueqe () {
    $.ajax({
      type: 'GET',
      url: '/get-queqe'
    }).done(data => {
      console.log(data);
	    getAWS(data)
    })
  }())
})

function getAWS (data) {
	$('.selectContainer').empty();
	for (var i = 0; i < data.length; i++) {
		let temp = {data: data[i]};
		$.ajax({
			type: 'POST',
			url: '/get-aws-user',
			data: temp,
			success: renderQueqe
		})
	}
}

function renderQueqe(response) {
	console.log("response", response)
	let html = `<img class='imgQueqe' src=${response.url} data-id=${response.id}>`;
	$('.selectContainer').prepend(html)
};
