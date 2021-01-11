//set keys here
//check payment goes thorugh
//update user information
//update payment information



const keys = require('../../../keys');
const stripe = require('stripe')(keys.STRIPE_SECRET_KEY);



module.exports = app => { 

	app.post("/api/stripe/payments/charge", async (req, res) => {

		/*
		Documentation
		source is either a token for 1 time payments
		or customer for charging a customer
		*/

		try {

			const body = req.body;

			const amount = body.amount;
			const description = body.description;
			const source = body.tokenId;


			let payment = await stripe.charges.create({
				amount,
				description,
				source,
				currency: "usd",
			});

			let status = payment.status


			if (status === 'succeeded') {

				res.send(JSON.stringify({
					success: true,
					message: '',
					payment
				}));

				return false;

			} else {

				res.send(JSON.stringify({
					success: false,
					message: 'Card Failed.',
					payment
				}));

				return false;

			}

		} catch (err) {

			res.send(JSON.stringify({
				success: false,
				message: err.message,
			}));
			return false;

		}

	});

	app.post("/api/stripe/customer/charge", async (req, res) => {

		/*
		Documentation
		source is either a token for 1 time payments
		or customer for charging a customer
		*/


			const body = req.body;

			const amount = body.amount;
			const description = body.description;
			const customer = body.customer;

			if (!amount) {
				res.status(422).send({
					error: 'No amount was passed along with request.'
				});
	
				return false;
			}

			if (!description) {
				res.status(422).send({
					error: 'No description was passed along with request.'
				});
	
				return false;
			}

			if (!customer) {
				res.status(422).send({
					error: 'No customerId was passed along with request.'
				});
	
				return false;
			}

			stripe.charges.create({
				amount,
				description,
				source: customer.default_source,
				customer: customer.id,
				currency: "usd",
			  }, function(err, charge) {
				
				if (err) {

					console.log(err)
					res.status(422).send({
						error: err
					});
	
				} else {
	
					res.send({
						charge: charge
					});
	
	
				}

			  });

		

			



	});

	app.post("/api/stripe/customer/create", async (req, res) => {

		/*
		Documentation
		source is token generated through stripe elements
		creates a new customer
		*/


		const body = req.body;

		const family_name = body.family_name;
		const givenName = body.givenName;
		const phone = body.phone;
		const email = body.email;
		const id = body.id;

		const source = body.sourceId


		//make sure we have atleast a token

		if (!source) {
			res.status(422).send({
				error: 'No source was passed along with request.'
			});

			return false;
		}

		stripe.customers.create({
			description: 'Customer ' + givenName + ' ' + family_name,
			email,
			source,
			metadata: {
				'id': id,
				'phone': phone
			}
		}, function (err, customer) {

			if (err) {

				console.log(err)
				res.status(422).send({
					error: err
				});

			} else {

				res.send({
					customer: customer
				});


			}


		});



		

	});

	app.post("/api/stripe/customer/retrieve", async (req, res) => {

		/*
		Documentation
		source is token generated through stripe elements
		creates a new customer
		*/


		const body = req.body;
		const customerId = body.customerId;


		//make sure we have atleast a token

		if (!customerId) {
			res.status(422).send({
				error: 'No customerId was passed along with request.'
			});

			return false;
		}

		stripe.customers.retrieve(
			customerId,
			function (err, customer) {

				if (err) {

					console.log(err)
					res.status(422).send({
						error: err
					});

				} else {

					res.send({
						customer: customer
					});


				}

			}
		);

	});


	app.post("/api/stripe/source/create", async (req, res) => {

		/*
		Documentation
		Add a source by a stripe elements token
		just pass the token in as tokenId in the body parameter

		return source on success or error message on failure
		*/

		const body = req.body;
		const source = body.tokenId


		//make sure we have the token to create a new source with
		if (!source) {
			res.status(422).send({
				error: 'No token was passed along with request.'
			});

			return false;
		}

		//create the source in stripe
		stripe.sources.create({
			type: 'card',
			currency: 'usd',
			token: source
		}, function (err, source) {

			//if we have an error send back an error
			if (err) {

				console.log(err)
				res.status(422).send({
					error: err
				});

			} else {

				res.send({
					source: source
				});
			}


		});

	});

	app.post("/api/stripe/customer/remove_source", async (req, res) => {

		/*
			Documentation
			Add a source by a stripe elements token
			just pass the token in as tokenId in the body parameter
	
			return source on success or error message on failure
			*/



		const body = req.body;
		const sourceId = body.sourceId;
		const customerId = body.customerId;

		//make sure we have the token to create a new source with
		if (!customerId) {
			res.status(422).send({
				error: 'No customerId was passed with request.'
			});

			return false;
		}

		if (!sourceId) {
			res.status(422).send({
				error: 'No sourceId was passed with request.'
			});

			return false;
		}

		stripe.customers.deleteSource(
			customerId,
			sourceId,
			function (err, confirmation) {

				//if we have an error send back an error
				if (err) {

					console.log(err)
					res.status(422).send({
						error: err
					});

				} else {

					res.send({
						confirmation: confirmation
					});


				}

			}
		);

	});

	app.post("/api/stripe/customer/add_source", async (req, res) => {

		/*
		Documentation
		Add a source by a stripe elements token
		just pass the token in as tokenId in the body parameter

		return source on success or error message on failure
		*/

		const body = req.body;
		const sourceId = body.sourceId;
		const customerId = body.customerId;


		//make sure we have the token to create a new source with
		if (!customerId) {
			res.status(422).send({
				error: 'No customerId was passed with request.'
			});

			return false;
		}

		if (!sourceId) {
			res.status(422).send({
				error: 'No sourceId was passed with request.'
			});

			return false;
		}

		stripe.customers.createSource(
			customerId, {
				source: sourceId
			},
			function (err, source) {

				//if we have an error send back an error
				if (err) {

					console.log(err)
					res.status(422).send({
						error: err
					});

				} else {

					res.send({
						source: source
					});


				}

			}
		);

	});

	app.post("/api/stripe/customer/set_default_source", async (req, res) => {

		/*
			Documentation
			Add a source by a stripe elements token
			just pass the token in as tokenId in the body parameter
	
			return source on success or error message on failure
			*/

		const body = req.body;
		const sourceId = body.sourceId;
		const customerId = body.customerId;


		//make sure we have the token to create a new source with
		if (!customerId) {
			res.status(422).send({
				error: 'No customerId was passed with request.'
			});

			return false;
		}

		if (!sourceId) {
			res.status(422).send({
				error: 'No sourceId was passed with request.'
			});

			return false;
		}

		stripe.customers.update(
			customerId, {
				default_source: sourceId
			},
			function (err, customer) {

				//if we have an error send back an error
				if (err) {

					console.log(err)
					res.status(422).send({
						error: err
					});

				} else {


					res.send({
						customer: customer
					});

				}

			}
		);

	});

	app.post("/api/stripe/source/retrieve", async (req, res) => {

		/*
		Documentation
		Retrieves a source from stripe
		requires sourceId
		*/

		const body = req.body;
		const sourceId = body.sourceId;

		if (!sourceId) {
			res.status(422).send({
				error: 'No sourceId was passed with request.'
			});

			return false;
		}

		stripe.sources.retrieve(
			sourceId,
			function (err, source) {

				//if we have an error send back an error
				if (err) {

					console.log(err)
					res.status(422).send({
						error: err
					});

				} else {


					res.send({
						source: source
					});

				}

			}
		);

	});


};