var join = require('path').join,
  crypto = require('crypto'),
  moment = require('moment')
  ;

exports.urlSigner = function(key, secret, options){

  var endpoint = options.host || 's3.amazonaws.com';
  var port = options.port || '80';
  var protocol = options.protocol || 'http';

  var hmacSha1 = function (message) {
    return crypto.createHmac('sha1', secret)
                  .update(message)
                  .digest('base64');
  };

  var url = function (fname, bucket) {
    return protocol + '://'+ endpoint + (port != 80 ? ':' + port : '') + '/' + bucket + (fname[0] === '/'?'':'/') + fname;
  };

  return {
    getUrl : function(verb, fname, mime, headers, bucket, expiresInMinutes){

      var epo = moment().add('minute', expiresInMinutes).format('X');

      var str = verb + "\n\n" + mime + "\n" + epo+ "\n" + headers +  "\n/" + bucket + (fname[0] === '/'?'':'/') + fname;

      var hashed = hmacSha1(str);

      var urlRet = url(fname, bucket) +
        '?AWSAccessKeyId=' + key +
        '&Expires=' + epo +
        '&Signature=' + encodeURIComponent(hashed);

      return encodeURIComponent(urlRet);

    }
  };

};
