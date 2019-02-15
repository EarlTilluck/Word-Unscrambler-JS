var express = require('express');
var dict = require('./lib/dict');

// express
const app = express();
const dictionary = new dict(); 

// port 80 when in production or 5000 when in dev
const port = process.env.PORT || 5000; 

// static files
app.use(express.static('public'))

// routes (one api route, every other route = index.html)
app.get('/search/:input', (req, res) => { res.json( dictionary.search(req.params.input) ) });
app.get('*', (req, res) => res.sendFile(`${__dirname}/client/index.html`));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//setInterval(()=>{console.log(process.memoryUsage())}, 1000);