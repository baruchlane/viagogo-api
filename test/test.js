var assert = require('chai').assert;
var Viagogo = require('../dist/service/Viagogo');

describe('Viagogo Api', function() {
  it('should authentication', function(done) {
    Viagogo.initialize({
      clientId: 'TaRJnBcw1ZvYOXENCtj5',
      clientSecret: 'ixGDUqRA5coOHf3FQysjd704BPptwbk6zZreELW2aCYSmIT8XJ9ngvN1MuKV',
    });
    Viagogo.getAuthToken().then(function(resp) {
      assert.property(JSON.parse(resp.body), 'access_token');
      done();
    }).catch(function (e) {
      done(e);
    })
  })
});