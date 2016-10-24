const express = require('express');
const app = express();

app.get('/', (req,res) => {
	res.send('HELLO WORLD!');
});


app.listen(3000, (err) => {
	if(err) console.log()
	console.log('Connected on Port 3000');
});