var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.remove = function(id) {
	var self = this;
	var removed;

	this.items.forEach(function(item, index){
		if(item.id == id) {
			removed = self.items.splice(index, 1);
		}
	});
	return removed;
};

Storage.prototype.updateMe = function(id) {
	var self = this;
	var updated;
	this.items.forEach(function(item, index){
		if(item.id == id){
			return item;
		}
	})
}

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});


app.post('/items', jsonParser, function(req, res){
	if (!req.body) {
		return res.sendStatus(400);
	}

	var item = storage.add(req.body.name);
	res.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(req, res){
	if (!req.body) {
		return res.sendStatus(400);
	}
	var item = storage.remove(req.params.id);
	res.status(200).json(item);

});

app.put('/items/:id', jsonParser, function(req, res){
	if (!req.body) {
		return res.sendStatus(400);
	}

	//var item = storage.add(req.body.name);
	res.status(201);
});



app.listen(process.env.PORT || 8080);