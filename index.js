// Author ----- Ken Cole
//
// Description ------ A Back-end web program. This server is built with Express.js, a framework for Node.js.
//			 	Includes 3 endpoints for clients:
//					1) GET /emr
//			 		2) GET /emr/id
//			  		3) POST /emr
//
// ----- Resources ------
// Express.js Docs ---- https://expressjs.com/en/api.html#app.post.method ----

// Variables
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

// - Parser
const bodyParser = require("body-parser");

// Temp JSON Storage Array
const emr = [

	{
		id: "0",
		lastName: 'Goggins',
		firstName: 'David',
		isMarried: false,
		age: "25",
		SSN: "999999999",
		dob: "12-21-2000",
		insurance: "Blue Cross Blue Shield",
	},

	{
		id: "1",
		lastName: 'Burris',
		firstName: 'John',
		isMarried: false,
		age: "25",
		SSN: "999999999",
		dob: "12-21-2000",
		insurance: "Blue Cross Blue Shield",
	}

]

express()
	// --- Parser ---
	.use(bodyParser.urlencoded({ extended: true }))

	// --- Runners ---
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')

	// --- Home Page ---
	.get('/', (req, res) => res.render('pages/index'))

	// GET request all
	.get('/emr', (req, res) => res.send(emr))


	// GET request by id
	.get('/emr/:id', (req, res) => {
		const id = req.params.id;


		// Use .find() method on array to get single object back with respective id
		// .find() is not anyones friend, so we use .filter to get our id

		let record = emr.filter(record => {
			// console.log(`record id: ${typeof record.id}, id: ${typeof id}`);
			return record.id == id
		}
		);

		if (record)  // If record != undefined
		// Truthy Falsy - Falsy if we find nothing, Truthy if we find anything  
		{
			res.send(record);
		}


		else res.status(404).send('Electronic Medical Record not found');
	}
	)


	//POST request
	.post('/emr', (req, res) => {
		const incomingRecord = req.body
		// console.log("----Inside POST Point-----")
		// console.log(incomingRecord);
		emr.push(incomingRecord);
		res.json(emr);
	})

	// Server
	.listen(PORT, () => console.log(`Listening on ${PORT}`));
