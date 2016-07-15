var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;
var itemId;
var itemName;

chai.use(chaiHttp);


describe('Shopping List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    it('should add an item on POST', function(done){
        chai.request(app) 
            .post('/items')
            .send({ name: 'poop'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.id.should.be.a('number');
                res.body.name.should.be.a('string');
                itemId = res.body.id;
                done();
            });
   });

    it('should edit an item on PUT', function(done){
	    chai.request(app)
            .put('/items/' + itemId)
            .end(function(err, res) {
                res.body.should.be.a('object');
                should.equal(err, null);
                res.should.have.status(201);
                done();
            });
    });

    it('should delete an item on DELETE', function(done){
	    chai.request(app)
            .delete('/items/' + itemId)
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.id.should.be.a('number');
                done();
            });
    });
});