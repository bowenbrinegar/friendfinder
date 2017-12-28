var AWS = require('aws-sdk');

AWS.config.update({accessKeyId: 'AKID', secretAccessKey: 'SECRET'});
! async function run() { AWS.config.loadFromPath('/Users/bowenbrinegar/aws/config/credentials.json'); }()

module.exports = function() {
	var s3 = new AWS.S3();
	return s3
}

/*s3.getBucketAcl({Bucket: 'friendfinder192837465'}, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
	});*/
