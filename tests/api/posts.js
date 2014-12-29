var request = require('superagent');
var should = require('should');

describe('Posts::getAll', function() {
    it('retrive all posts', function() {
        request.get('localhost:9000/posts')
            .query({
                query: 'isReact'
            })
            .end(function(res) {
            console.log(res.text);
            res.should.exist;
            res.status.should.be(200);
        });
    });
});
