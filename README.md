##Node modeule for Redactor S3 uploads

This module creates signed URLs for use with Redactor editor S3 uploads

This is a modified fork of https://github.com/dyashkir/amazon-s3-url-signer

###To install

    npm install redactor-s3-url-signer

###Use example

    var sig = require('redactor-s3-url-signer');

    var url = sig.urlSigner('aws key', 'aws secret').getUrl('PUT', 'filename', 'mime type', 'headers', 'bucket name', 'expiry time in min');

Such as:

    var url = sig.urlSigner('aws key', 'aws secret').getUrl('PUT', 'somefile.png', 'image/png', 'x-amz-acl:public-read', 'mybucket', 10);


