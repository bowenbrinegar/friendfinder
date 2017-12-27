
var s3 = new AWS.S3({
	accessKeyId: 'AKIAJJ6S2PRILXD6FXIQ',
	secretAccessKey: '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'
});



function run() {
	$.ajax({
		type: 'GET',
		url: '/user-img'
	}).done(function(path) {
		imgFetch(path, function(response) {
			console.log(response)
			let img = $('<img>').attr('src', response)
			$('surveryContainer').append(img)
		})
	})
}


function imgFetch(path, callback) {
	console.log(path)
	var downloadPreSignedUrl = s3.getSignedUrl('getObject', {
		Bucket: 'friendfinder192837465',
		Key: `${path}`,
		/* set a fixed type, or calculate your mime type from the file extension */
		ResponseContentType: 'image/jpeg'
		/* and all the rest of your parameters to AWS getObect here */
	});

	$.ajax({
		type: 'GET',
		url: downloadPreSignedUrl,
		success: callback
	})
}







// $.ajax({
// 	type: 'GET',
// 	url:
// })