const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://Dankmir:PfDhGUxz8SYNXB67@nodeblog.tlkqgbu.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) =>
    {
        console.log('Connected to DB.');
        app.listen(3000);
    }).catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');
// Automatically express/ejs will look in views folder
// We can also set folder explicitly
// app.set('views', 'path');


// 3rd party middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Blog routes
app.use('/blogs', blogRoutes);

// Redirect

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page middleware (always at the end)

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});