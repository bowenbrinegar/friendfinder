var AWS = require('aws-sdk');


var s3 = new AWS.S3({
	accessKeyId: 'AKIAJJ6S2PRILXD6FXIQ',
	secretAccessKey: '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'
});

var uploadPreSignedUrl = s3.getSignedUrl('putObject', {
	Bucket: 'friendfinder192837465',
	Key: '*',
	// This must match with your ajax contentType parameter
	ContentType: 'binary/octet-stream'


	/* then add all the rest of your parameters to AWS puttObect here */
});


var downloadPreSignedUrl = s3.getSignedUrl('getObject', {
	Bucket: 'friendfinder192837465',
	Key: '*',
	/* set a fixed type, or calculate your mime type from the file extension */
	ResponseContentType: 'image/jpeg'
	/* and all the rest of your parameters to AWS getObect here */
});

console.log(uploadPreSignedUrl, downloadPreSignedUrl)