var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//this should go in a model folder?
var DeveloperInfo = mongoose.model('DeveloperInfo', {
name: String,
bio: String,
skills: String,
years: Number,
why: String
});


mongoose.connect('mongodb://localhost/hireMe');


var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	
	DeveloperInfo.find({}, function(err,prospects){

		// console.log(prospects);

		res.render('applicants',{prospects: prospects });
		});
	
	// DeveloperInfo.remove({}, function(){

	// });

});

app.get('/delete/:id',function(req, res){

	DeveloperInfo.remove({_id: req.params.id}, function(){

		res.redirect('/applicants');
	});
	// console.log(req.params.id);

});


// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body)
	// below is the step for part 1 step 3  
	// res.send('Success!');
	res.redirect('/success');

	var prospect = new DeveloperInfo({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	});
	prospect.save();

	//prospect.save(function(err)){}
	//next step if() else logic??


});

app.get('/success', function(req, res){
	res.send('Here is something a little more for you!');
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
