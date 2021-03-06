const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

const database = {
	users: [
		{
			id: '1',
			name: 'Pro',
			email: 'p@p.com',
			password: '123456',
			entries: 0,
			joined: new Date()
		},
		{
			id: '2',
			name: 'Rip',
			email: 'r@r.com',
			password: '123456',
			entries: 0,
			joined: new Date()
		}
	],

	login: [
		{
			id: '123',
			hash: '',
			email: 'p@p.com'
		}
	]
}

app.use(bodyParser.json()); 

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json('Success nigga');
	} else {
		res.status(400).json('Not Found Nigga');
	}
})

app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    	console.log(hash);
	});
	database.users.push({
		id: '3',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
	});
	res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
		return res.status(400).json("Not found");
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id == id) {
			user.entries++;
			found = true;
			return res.json(user);	
		}
	})

	if (!found) {
		return res.status(400).json("Nibba not found");
	}
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
	console.log("Running on 3000");
});



// '/' --> 'Working'
// '/signin' --> POST => Success/fail
// '/register' --> POST => User
// '/profile/:uid' --> GET => User
// '/image' --> PUT => User