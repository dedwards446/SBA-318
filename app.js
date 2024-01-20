const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware 1
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

//  Middleware 2
app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

// Middleware Error Handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// In-memory data
let dataCategory = [];

// Routes
app.get('/', (req, res) => {
  // Render index view with current state of data
  res.render('index', { data: dataCategory });
});

app.get('/form', (req, res) => {
  // Render form view for interaction
  res.render('form');
});

app.post('/api/create', (req, res) => {
  //  POST request to create data
  const newData = req.body.data;
  dataCategory.push(newData);
  res.redirect('/');
});

// Set up static files (CSS, images)
app.use(express.static(__dirname + '/public'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



