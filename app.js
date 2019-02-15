var express = require('express');
var dict = require('./lib/dict');

// express
const app = express();
const dictionary = new dict(); 

// port 80 when in production or 5000 when in dev
const port = process.env.PORT || 5000; 


// routes (only one page will be served)
app.get('/test', (req, res) => { res.json(dictionary.search('sandwich')) });
app.get('*', (req, res) => res.send('This is the main page'));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//setInterval(()=>{console.log(process.memoryUsage())}, 1000);