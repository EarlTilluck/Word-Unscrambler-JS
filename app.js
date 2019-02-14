var express = require('express');

// express
const app = express();
const port = process.env.PORT || 5000;


// routes (only one page will be served)
app.get('*', (req, res) => res.send('This is the main page'));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
