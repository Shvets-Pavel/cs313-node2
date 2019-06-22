// Postal Rate Calculator node app on heroku

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function calculateRate(weight, mailtype) {
	var result = 0;
	var weights = [];
	var rates = [];
	var overweightMessage = 'Sorry, the weight is too heavy for this mail type';
	var dollarSign = '$';
	  if(mailtype == 'Letters (Stamped)') {
		  weights = [1,2,3,3.5];
		  rates = [1.15, 2.13, 3.12, 4.11];
		  for(var i=0; i<weights.length; i++){
			  if(weight<=weights[i]){
				 return rate = dollarSign + rates[i]; 
			  } else if(weight > 3.5){
				  return rate = overweightMessage;
			  }
		  }		  
	  } else if  (mailtype == 'Letters (Metered)') {
		  weights = [1,2,3,3.5];
		  rates = [1.15, 1.98, 2.81, 3.64];
		  for(var i=0; i<weights.length; i++){
			  if(weight<weights[i]){
				 return rate = dollarSign + rates[i]; 
			  } else if(weight > 3.5){
				  return rate = overweightMessage;
			  }
		  }	
	  } else if (mailtype == 'Large Envelopes (Flats)') {
		  weights = [1,2,3,4,5,6,7,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64];
		  rates = [2.29, 3.23, 4.16, 5.10,6.04,6.97,7.91,8.85,10.72,12.60,14.47,16.34,18.22,20.09,21.97,23.84,25.71,27.59,29.46,31.33,33.21,35.08];
		  for(var i=0; i<weights.length; i++){
			  if(weight<weights[i]){
				 return rate = dollarSign + rates[i]; 
			  } else if(weight > 64){
				  return rate = overweightMessage;
			  }
		  }	
	  } else {
		  weights = [8,32,48,64];
		  rates = [10.50,17.25,26.25,39.00];
		  for(var i=0; i<weights.length; i++){
			  if(weight<weights[i]){
				 return rate = dollarSign + rates[i]; 
			  } else if(weight > 64){
				  return rate = overweightMessage;
			  }
		  }	
	  }
  }

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) =>{console.log(req.query); res.render('pages/postage_results')})
  .get('/getRate', (req, res) =>{
	  console.log(req.query);
	var weight = Number(req.query.weight);
	var mailtype = req.query.mailtype;
	var postalRate = calculateRate(weight, mailtype);
		  res.render('pages/postage_results', {
        weight: weight,
        mailtype: mailtype,
		postalRate: postalRate
    })})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
