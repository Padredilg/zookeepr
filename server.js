const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();//instantiating the server / Starting express


// parse incoming string or array data - dont miss any small details
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data for use
app.use(express.json());
//load assets
app.use(express.static('public'));
//if search has /api, use the router found at the index in this folder
app.use('/api', apiRoutes);
//if / is endpoint, use the router found at the index in this folder
app.use('/', htmlRoutes);//app will have the functions from this router


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//for this one, order matters. Have it last so it does not
//take precedence over the actual pages
//btw, this is just to avoid users from going to non-existing pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
    //By chaining listen() to the variable holding the instantiated server,
    //we make the instantiated server listen.
    console.log(`API server now on port ${PORT}!`);
});